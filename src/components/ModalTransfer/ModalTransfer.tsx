import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { ReactComponent as Cross } from "../../assets/icons/Cross.svg";
import { ReactComponent as ValidationTx } from "../../assets/icons/ValidationTx.svg";
import { ReactComponent as VaultLogo } from "../../assets/logos/LogoVault.svg";
import { ReactComponent as USDC } from "../../assets/logos/USDC.svg";
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
                            <USDC />
                            LINK
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
                  <Dialog.Panel className="relative h-[244px] min-w-[324px] transform overflow-hidden rounded-2xl bg-white p-[32px] text-left align-middle shadow-xl transition-all">
                    <div
                      className="absolute right-4 top-4 flex h-[32px] w-[32px] items-center justify-center rounded-lg border-[0.5px] border-solid border-borderCardNavbar hover:cursor-pointer"
                      onClick={() => closeModal()}
                    >
                      <Cross />
                    </div>
                    <div className="flex h-[100%] w-[100%] flex-col items-center justify-between ">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="text-gray-200 dark:text-gray-600 mr-2 inline h-20 w-20 animate-spin fill-pink"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold">
                          Wainting for confimation
                        </div>
                        <div>This tx is added on the ethereum network.</div>
                      </div>
                    </div>
                  </Dialog.Panel>
                ) : (
                  <Dialog.Panel className="relative h-[384px] min-w-[324px] transform overflow-hidden rounded-2xl bg-white p-[32px] text-left align-middle shadow-xl transition-all">
                    <div
                      className="absolute right-4 top-4 flex h-[32px] w-[32px] items-center justify-center rounded-lg border-[0.5px] border-solid border-borderCardNavbar hover:cursor-pointer"
                      onClick={() => closeModal()}
                    >
                      <Cross />
                    </div>
                    <div className="flex h-[100%] w-[260px] flex-col items-center justify-between ">
                      <ValidationTx />
                      <div className="flex flex-col items-center">
                        <div className="text-xl font-semibold">
                          Transaction submited!
                        </div>
                        <div className="text-center">
                          You transaction{" "}
                          <a
                            href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}
                            className="text-[#345EEB]"
                          >
                            #331590
                          </a>{" "}
                          was successfully completed
                        </div>
                      </div>
                      <div className=" flex w-[100%] flex-col items-center gap-4">
                        <div
                          className="flex h-[48px] w-[100%] items-center justify-center rounded-lg bg-pink text-base font-normal text-white hover:cursor-pointer
                      "
                        >
                          <button>Add to Metamask</button>
                        </div>
                        <div
                          className="text-pink hover:cursor-pointer"
                          onClick={() => closeModal()}
                        >
                          Close
                        </div>
                      </div>
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
