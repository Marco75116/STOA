import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { ReactComponent as Cross } from "../../assets/icons/Cross.svg";
import { ReactComponent as VaultLogo } from "../../assets/logos/LogoVault.svg";
import { ReactComponent as UsdcLogo } from "../../assets/logos/UsdcLogo.svg";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { abiUSDC } from "../../utils/constants/abi/USDC";
import { addressUSDC } from "../../utils/constants/address/USDC";
import { ethers } from "ethers";

type ModalTransferProps = {
  isOpen: boolean;
  setIsOpen: Function;
};

const ModalTransfer: FC<ModalTransferProps> = ({ isOpen, setIsOpen }) => {
  const [tokenSelected, setTokenSelected] = useState<number>(0);
  const [addressRecipient, setAddressRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const closeModal = () => {
    setIsOpen(false);
  };

  const { config } = usePrepareContractWrite({
    address: addressUSDC,
    abi: abiUSDC,
    functionName: "transfer",
    args: [addressRecipient, ethers.utils.parseEther(amount.toString())],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // eslint-disable-next-line no-console
  console.log(isLoading, isSuccess);

  return (
    <>
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
            <div className="bg-black fixed inset-0 bg-opacity-25" />
          </Transition.Child>

          <div className=" fixed inset-0 overflow-y-auto bg-gray800 bg-opacity-30">
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
                {!isLoading && !isSuccess ? (
                  <Dialog.Panel className=" min-h-[444px] w-[500px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-gray-900 flex flex-col gap-6  border-b-[0.5px] border-[#00000033] p-5  text-base font-medium leading-6"
                    >
                      <div className="flex flex-row items-center justify-between">
                        Transfer
                        <div
                          className="flex h-[32px] w-[32px] items-center justify-center rounded-lg border-[0.5px] border-solid border-borderCardNavbar hover:cursor-pointer"
                          onClick={() => closeModal()}
                        >
                          <Cross />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div
                          className={`flex h-[44px] items-center justify-between  rounded-lg border-[0.5px] border-solid p-3 text-sm font-normal ${
                            tokenSelected === 0 ? "bg-[#EF2A890D]" : ""
                          }`}
                        >
                          <div className="flex gap-[10px]">
                            <VaultLogo />
                            USDFI
                          </div>
                          <input
                            className="flex "
                            type="radio"
                            name="tokens"
                            checked={tokenSelected === 0}
                            onClick={() => {
                              setTokenSelected(0);
                            }}
                          />
                        </div>
                        <div
                          className={`flex h-[44px] items-center justify-between  rounded-lg border-[0.5px] border-solid p-3 text-sm font-normal ${
                            tokenSelected === 1 ? "bg-[#EF2A890D]" : ""
                          }`}
                        >
                          <div className="flex items-center gap-[10px]">
                            <UsdcLogo />
                            USDC
                          </div>
                          <input
                            type="radio"
                            name="tokens"
                            checked={tokenSelected === 1}
                            onClick={() => {
                              setTokenSelected(1);
                            }}
                          />
                        </div>
                      </div>
                    </Dialog.Title>
                    <div className="flex flex-col  gap-2 border-b-[0.5px]  border-[#00000033]  p-5">
                      <div>Recipient address</div>
                      <input
                        placeholder="Enter address..."
                        type="text"
                        className="h-[40px] w-[100%] rounded-lg border-[0.5px] border-solid border-[#00000033]  p-[10px]"
                        onChange={(e) => {
                          setAddressRecipient(e.target.value);
                        }}
                      />
                    </div>
                    <div className="flex  flex-col gap-2 border-b-[0.5px]  border-[#00000033]  p-5">
                      <div>Amount</div>
                      <input
                        placeholder="1,000"
                        type="text"
                        className="h-[40px] w-[100%] rounded-lg border-[0.5px] border-solid border-[#00000033]  p-[10px]"
                        onChange={(e) => {
                          setAmount(Number(e.target.value));
                        }}
                      />
                    </div>
                    <div className="p-[20px]">
                      <div
                        className="flex h-[48px] items-center justify-center rounded-lg bg-pink p-[10px]  p-5 text-base font-normal text-white hover:cursor-pointer
                      "
                      >
                        <button disabled={!write} onClick={() => write?.()}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                ) : isLoading ? (
                  <div>{"'Minting...'"}</div>
                ) : (
                  <Dialog.Panel>
                    Successfully minted your NFT!
                    <div>
                      <a href={`https://etherscan.io/tx/${data?.hash}`}>
                        Etherscan
                      </a>
                    </div>
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalTransfer;
