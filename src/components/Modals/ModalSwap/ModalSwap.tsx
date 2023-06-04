import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useContext, useEffect, useMemo, useState } from "react";
import { ReactComponent as Cross } from "../../../assets/icons/Cross.svg";
import ListboxComponent from "../../../components/ListboxComponent/ListboxComponent";
import {
  AddressesTokens,
  AllTokens,
  CoinBalances,
  CoinDecimals,
  CoinPrices,
  Token,
} from "../../../utils/types/swap.types";
import { getReceiveAmount } from "../../../utils/helpers/swap.helpers";
import { WalletContext } from "../../../context/Wallet.context";
import { ethers } from "ethers";
import {
  fiToUnderlyingDiamond,
  underlyingToFiDiamond,
} from "../../../utils/ethers/ethers.write";
import { ReactComponent as DoubleArrowWithBar } from "../../../assets/icons/ArrowSwitch.svg";
import { ReactComponent as USDFI } from "../../../assets/logos/USDCFILogo.svg";
import { ReactComponent as BTCFILogo } from "../../../assets/logos/tokens/BTCFILogo.svg";
import { ReactComponent as ETHFILogo } from "../../../assets/logos/tokens/ETHFILogo.svg";
import { ReactComponent as USDC } from "../../../assets/logos/tokens/USDC.svg";
import { ReactComponent as BTCLogo } from "../../../assets/logos/tokens/BTCLogo.svg";
import { ReactComponent as ETHLogo } from "../../../assets/logos/tokens/ETHLogo.svg";
import { SwapContext } from "../../../context/Swap.context";

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
  const [depositAmount, setDepositAmount] = useState<number>(0);

  const { signer, currentWalletAddress, constants, kycDone } =
    useContext(WalletContext);

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
    return getReceiveAmount(depositAmount, fee);
  }, [depositAmount, constants, action, tokenSelected]);

  const estimadedReceivingUSD = useMemo(() => {
    if (estimatedReceiving !== undefined)
      return (
        estimatedReceiving * pricesCoins[tokenSelected as keyof CoinPrices]
      );
  }, [estimatedReceiving, action, pricesCoins, tokenSelected]);

  const minAmountOut = useMemo(() => {
    if (estimatedReceiving !== undefined)
      return Math.floor(estimatedReceiving * 0.9975 * 10 ** 6) / 10 ** 6;
  }, [estimatedReceiving]);

  useEffect(() => {
    setDepositAmount(0);
  }, [action]);

  function closeModal() {
    setIsOpen(false);
  }

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
                          balanceCoins[
                            tokenSelected as keyof CoinBalances
                          ].toFixed(6) +
                          " " +
                          tokenSelected
                        }`}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className=" text-base font-medium">Amount</div>
                      <div className="flex h-[40px] w-[224px]  items-center justify-between rounded-xl border-[0.5px] border-solid border-borderCardAbout p-[10px]">
                        <input
                          type="number"
                          placeholder="0,00"
                          className="w-[224px]"
                          value={depositAmount}
                          onChange={(event) => {
                            setDepositAmount(Number(event.target.value));
                          }}
                        />
                        <div
                          onClick={() => {
                            setDepositAmount(
                              balanceCoins[tokenSelected as keyof CoinBalances]
                            );
                          }}
                          className="center h-[28px] w-[40px]  rounded-md bg-ethBalance px-1 py-2 text-xs font-semibold  hover:cursor-pointer"
                        >
                          Max
                        </div>
                      </div>
                      <div className="text-xs font-medium text-textGray">{`$${(
                        Number(depositAmount) *
                        pricesCoins[tokenSelected as keyof CoinPrices]
                      ).toFixed(3)}`}</div>
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
                        value={estimatedReceiving}
                        disabled
                        className="flex h-[40px] w-[224px]  items-center justify-between rounded-xl border-[0.5px] border-solid border-borderCardAbout p-[10px]"
                      />
                      <div className="text-xs font-medium text-textGray">{`$${estimadedReceivingUSD?.toFixed(
                        3
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
                      {
                        kycDone === true &&
                          signer &&
                          (action === 0
                            ? underlyingToFiDiamond(
                                addressesTokens[
                                  tokenSelected as keyof AddressesTokens
                                ],
                                addressesTokens[
                                  convertTokenList[
                                    tokenSelected as keyof AllTokens
                                  ] as keyof AddressesTokens
                                ],
                                signer,
                                ethers.utils.parseUnits(
                                  depositAmount.toString(),
                                  decimalsTokens[
                                    tokenSelected as keyof CoinDecimals
                                  ]
                                ),
                                ethers.utils.parseUnits(
                                  Number(minAmountOut).toString(),
                                  "ether"
                                ),
                                currentWalletAddress,
                                addressReferral === ""
                                  ? ethers.constants.AddressZero
                                  : addressReferral
                              )
                            : fiToUnderlyingDiamond(
                                signer,
                                ethers.utils.parseUnits(
                                  depositAmount.toString(),
                                  "ether"
                                ),
                                ethers.utils.parseUnits(
                                  Number(minAmountOut).toString(),
                                  decimalsTokens[
                                    convertTokenList[
                                      tokenSelected as keyof AllTokens
                                    ] as keyof CoinDecimals
                                  ]
                                ),
                                addressesTokens[
                                  tokenSelected as keyof AddressesTokens
                                ],
                                currentWalletAddress
                              ));
                      }
                    }}
                  >
                    <button type="button">
                      {action === 0 ? "Mint" : "Redeem"}
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
