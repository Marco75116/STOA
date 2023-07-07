import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useContext, useEffect, useMemo, useState } from "react";
import { ReactComponent as Cross } from "../../../assets/icons/Cross.svg";
import ListboxComponent from "../../../components/ListboxComponent/ListboxComponent";
import { CoinsString, Coins, Token } from "../../../utils/types/swap.types";
import { getReceiveAmount } from "../../../utils/helpers/swap.helpers";
import { WalletContext } from "../../../context/Wallet.context";
import { ethers } from "ethers";
import { ReactComponent as DoubleArrowWithBar } from "../../../assets/icons/ArrowSwitch.svg";
import { ReactComponent as USDFI } from "../../../assets/logos/USDCFILogo.svg";
import { ReactComponent as BTCFILogo } from "../../../assets/logos/tokens/BTCFILogo.svg";
import { ReactComponent as ETHFILogo } from "../../../assets/logos/tokens/ETHFILogo.svg";
import { ReactComponent as USDC } from "../../../assets/logos/tokens/USDC.svg";
import { ReactComponent as BTCLogo } from "../../../assets/logos/tokens/BTCLogo.svg";
import { ReactComponent as ETHLogo } from "../../../assets/logos/tokens/ETHLogo.svg";
import { SwapContext } from "../../../context/Swap.context";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { DiamondContract } from "../../../utils/constants/wagmiConfig/wagmiConfig";
import { abiDiamond } from "../../../utils/constants/abi/Diamond";
import { addressDiamond } from "../../../utils/constants/address/Diamond";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  bigIntToDecimal,
  displayBalance,
  getMinAmountOut,
  stringToBigInt,
} from "../../../utils/helpers/global.helper";

const listStableCoinsFrom: Token[] = [
  { name: "USDC", svgLogo: USDC },
  { name: "ETH", svgLogo: ETHLogo },
  { name: "BTC", svgLogo: BTCLogo },
];
const listStableCoinsTo: Token[] = [
  { name: "USDFI", svgLogo: USDFI },
  { name: "ETHFI", svgLogo: ETHFILogo },
  { name: "BTCFI", svgLogo: BTCFILogo },
];

type ModalSwapProps = {
  isOpen: boolean;
  setIsOpen: Function;
  action: 0 | 1;
  setAction: Function;
};

const ModalSwap: FC<ModalSwapProps> = ({
  isOpen,
  setIsOpen,
  action,
  setAction,
}) => {
  const [depositAmount, setDepositAmount] = useState<bigint>(BigInt(0));
  const [toastId, setToastId] = useState<any>(null);

  const { constants, kycDone } = useContext(WalletContext);

  const { address } = useAccount();

  const {
    tokenSelected,
    addressesTokens,
    decimalsTokens,
    pricesCoins,
    balanceCoins,
    convertTokenList,
  } = useContext(SwapContext);

  const [addressReferral, setAddressReferral] = useState<string>("");

  const estimatedReceiving = useMemo(() => {
    const fee = action === 0 ? constants.mintFee : constants.redeemFee;
    return getReceiveAmount(
      depositAmount,
      fee,
      decimalsTokens[tokenSelected as keyof Coins],
      decimalsTokens[
        convertTokenList[tokenSelected as keyof Coins] as keyof Coins
      ]
    );
  }, [depositAmount, constants, action, tokenSelected]);

  const estimadedSendingUSD = useMemo(() => {
    if (estimatedReceiving !== undefined) {
      const estimatedSendingFormatted = bigIntToDecimal(
        depositAmount,
        decimalsTokens[tokenSelected as keyof Coins]
      );

      if (estimatedSendingFormatted !== undefined) {
        return (
          estimatedSendingFormatted * pricesCoins[tokenSelected as keyof Coins]
        );
      }
    }
    return 0;
  }, [estimatedReceiving, action, pricesCoins, tokenSelected]);

  const estimadedReceivingUSD = useMemo(() => {
    if (estimatedReceiving !== undefined) {
      const estimatedReceivingFormatted = bigIntToDecimal(
        estimatedReceiving,
        decimalsTokens[
          convertTokenList[tokenSelected as keyof Coins] as keyof Coins
        ]
      );

      if (estimatedReceivingFormatted !== undefined) {
        return (
          estimatedReceivingFormatted *
          pricesCoins[tokenSelected as keyof Coins]
        );
      }
    }
  }, [estimatedReceiving, action, pricesCoins, tokenSelected]);

  const minAmountOut = useMemo(() => {
    if (estimatedReceiving !== undefined) {
      return getMinAmountOut(estimatedReceiving);
    } else {
      return BigInt(0);
    }
  }, [estimatedReceiving]);

  const navigate = useNavigate();

  useEffect(() => {
    setDepositAmount(BigInt(0));
  }, [action]);

  function closeModal() {
    setIsOpen(false);
  }

  const { config: configApprove } = usePrepareContractWrite({
    address: addressesTokens[
      tokenSelected as keyof CoinsString
    ] as `0x${string}`,
    abi: abiDiamond,
    functionName: "approve",
    args: [addressDiamond, depositAmount],
    enabled: depositAmount !== BigInt(0),
    onError(error) {
      console.log("Error approve", error);
    },
  });

  const { config: configUnderlyingToFi, refetch: refetchMint } =
    usePrepareContractWrite({
      ...DiamondContract,
      functionName: "underlyingToFi",
      args: [
        depositAmount,
        minAmountOut,
        addressesTokens[
          convertTokenList[tokenSelected as keyof Coins] as keyof CoinsString
        ],
        address,
        address,
        addressReferral === "" ? ethers.constants.AddressZero : addressReferral,
      ],
      enabled:
        depositAmount !== BigInt(0) &&
        address !== undefined &&
        balanceCoins[tokenSelected as keyof Coins] <= depositAmount &&
        action === 0,
      onError(error) {
        console.log("Error PrepareContractWrite underlyingToFi : ", error);
      },
    });

  const { config: configFiToUnderlying } = usePrepareContractWrite({
    ...DiamondContract,
    functionName: "fiToUnderlying",
    args: [
      depositAmount,
      minAmountOut,
      addressesTokens[tokenSelected as keyof CoinsString],
      address,
      address,
    ],
    enabled:
      depositAmount !== BigInt(0) && address !== undefined && action === 1,
    onError(error) {
      console.log("Error PrepareContractWrite fiToUnderlying : ", error);
    },
  });

  const { data: dataApprove, write: writeApprove } =
    useContractWrite(configApprove);

  const {
    isSuccess: ApproveSuccess,
    isLoading: isLoadingApprove,
    isSuccess: isSuccessApprove,
    isError: isErrorApprove,
  } = useWaitForTransaction({
    hash: dataApprove?.hash,
  });

  const { data: dataMint, write: writeUnderlyingToFi } = useContractWrite({
    ...configUnderlyingToFi,
  });

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: dataMintWait,
    isLoading: isLoadingMint,
    isSuccess: isSuccessMint,
    isError: isErrorMint,
  } = useWaitForTransaction({
    hash: dataMint?.hash,
    onSuccess() {
      navigate("/Earnings");
    },
  });

  const { data: dataRedeem, write: writeFiToUnderlying } = useContractWrite({
    ...configFiToUnderlying,
  });

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: dataRedeemWait,
    isLoading: isLoadingRedeem,
    isSuccess: isSuccessRedeem,
    isError: isErrorRedeem,
  } = useWaitForTransaction({
    hash: dataRedeem?.hash,
    onSuccess() {
      navigate("/Earnings");
    },
  });

  useEffect(() => {
    if (isLoadingMint) {
      let toastvalue = toast.loading("MINTING...");
      setToastId(toastvalue);
    }
    if (isSuccessMint) {
      toast.update(toastId, {
        render: "MINT SUCCESS",
        type: "success",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
    if (isErrorMint) {
      toast.update(toastId, {
        render: "MINT ERROR",
        type: "error",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
  }, [isSuccessMint, isLoadingMint, isErrorMint]);

  useEffect(() => {
    if (isLoadingApprove) {
      let toastvalue = toast.loading("APPROVE...");
      setToastId(toastvalue);
    }
    if (isSuccessApprove) {
      refetchMint();
      toast.update(toastId, {
        render: "APPROVE SUCCESS",
        type: "success",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
    if (isErrorApprove) {
      toast.update(toastId, {
        render: "APPROVE ERROR",
        type: "error",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
  }, [isSuccessApprove, isLoadingApprove, isErrorApprove]);

  useEffect(() => {
    if (isLoadingRedeem) {
      let toastvalue = toast.loading("REDEEM...");
      setToastId(toastvalue);
    }
    if (isSuccessRedeem) {
      refetchMint();
      toast.update(toastId, {
        render: "REDEEM SUCCESS",
        type: "success",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
    if (isErrorRedeem) {
      toast.update(toastId, {
        render: "REDEEM ERROR",
        type: "error",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
  }, [isLoadingRedeem, isSuccessRedeem, isErrorRedeem]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto bg-gray800 bg-opacity-30">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="card max-h-[600px] w-[500px]  transform overflow-hidden text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex flex-row items-center justify-between border-b-[0.5px] border-solid border-borderCardAbout p-6  text-lg font-medium leading-6 text-gray-900"
                >
                  {action === 0 ? "Deposit with Wallet" : "Redeem"}
                  <Cross
                    stroke="black"
                    className="hover:cursor-pointer"
                    onClick={() => closeModal()}
                  />
                </Dialog.Title>
                <div className="borderBottom m-auto flex flex-col  gap-5 p-5">
                  <div className="flex flex-row items-center gap-3 ">
                    <div className="flex flex-col gap-2">
                      <div className="text-base font-medium">From Wallet</div>
                      <ListboxComponent
                        width={224}
                        list={
                          action === 0 ? listStableCoinsFrom : listStableCoinsTo
                        }
                        fromListBox={true}
                      />
                      <div className="text-xs font-medium text-textGray">
                        {` Balances :  ${
                          displayBalance(
                            balanceCoins[tokenSelected as keyof Coins],
                            decimalsTokens[tokenSelected as keyof CoinsString]
                          ) +
                          " " +
                          tokenSelected
                        }`}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className=" text-base font-medium">Amount</div>
                      <div className="flex h-[40px] w-[224px]  items-center justify-between rounded-xl border-[0.5px] border-solid border-borderCardAbout p-2">
                        <input
                          type="number"
                          placeholder="0,00"
                          className="w-[224px"
                          value={displayBalance(
                            depositAmount,
                            decimalsTokens[tokenSelected as keyof CoinsString]
                          )}
                          onChange={(event) => {
                            const newAmount = stringToBigInt(
                              event.target.value,
                              decimalsTokens[tokenSelected as keyof CoinsString]
                            );

                            if (newAmount !== undefined) {
                              setDepositAmount(newAmount);
                            }
                          }}
                        />
                        <div
                          onClick={() => {
                            setDepositAmount(
                              balanceCoins[tokenSelected as keyof Coins]
                            );
                          }}
                          className="center h-[28px] w-[40px]  rounded-md bg-ethBalance px-1 py-2 text-xs font-semibold  hover:cursor-pointer"
                        >
                          Max
                        </div>
                      </div>
                      <div className="text-xs font-medium text-textGray">{`$${estimadedSendingUSD.toFixed(
                        2
                      )}`}</div>
                    </div>
                  </div>

                  <DoubleArrowWithBar
                    className=" hover:cursor-pointer"
                    onClick={() => {
                      setAction((prev: 0 | 1) => {
                        if (prev === 0) {
                          return 1;
                        } else {
                          return 0;
                        }
                      });
                    }}
                  />
                  <div className=" flex flex-row items-center gap-3 ">
                    <div className="flex flex-col gap-2">
                      <div className="text-base font-medium">
                        To {action === 0 ? "Stoa" : ""} stablecoin
                      </div>
                      <ListboxComponent
                        width={224}
                        list={
                          action !== 0 ? listStableCoinsFrom : listStableCoinsTo
                        }
                        fromListBox={false}
                        disabled={true}
                      />
                      <div className="text-xs font-medium text-textGray">
                        2.93%
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ">
                      <div className="text-base font-medium">
                        You will receive
                      </div>
                      <input
                        type="number"
                        placeholder="0,00"
                        value={displayBalance(
                          estimatedReceiving,
                          decimalsTokens[
                            convertTokenList[
                              tokenSelected as keyof Coins
                            ] as keyof CoinsString
                          ]
                        )}
                        disabled
                        className="flex h-[40px] w-[224px]  items-center justify-between rounded-xl border-[0.5px] border-solid border-borderCardAbout p-[10px]"
                      />
                      <div className="text-xs font-medium text-textGray">{`$${estimadedReceivingUSD?.toFixed(
                        2
                      )}`}</div>
                    </div>
                  </div>
                </div>

                {action === 0 && (
                  <div className="flex flex-col  gap-2   p-5">
                    <div className=" text-sm  font-medium">
                      Referral address
                    </div>
                    <input
                      placeholder="Enter address..."
                      type="text"
                      className="h-[40px] w-[100%] rounded-lg border-[0.5px] border-solid border-[#00000033]  p-[10px]"
                      value={addressReferral}
                      onChange={(e) => {
                        setAddressReferral(e.target.value);
                      }}
                    />
                  </div>
                )}

                <div className="p-5">
                  <div
                    className="flex h-[48px] items-center justify-center rounded-lg bg-pink p-3 text-base font-normal text-white hover:cursor-pointer"
                    onClick={() => {
                      kycDone === true && action === 1
                        ? writeFiToUnderlying?.()
                        : ApproveSuccess
                        ? writeUnderlyingToFi?.()
                        : writeApprove?.();
                    }}
                  >
                    <button type="button">
                      {action === 1
                        ? "Redeem"
                        : ApproveSuccess
                        ? "Mint"
                        : "Approve"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalSwap;
