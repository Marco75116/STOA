import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { ReactComponent as Cross } from "../../assets/icons/Cross.svg";
import { ReactComponent as DoubleArrow } from "../../assets/icons/DoubleArrow.svg";
import { ReactComponent as Info } from "../../assets/icons/Info.svg";
import { ReactComponent as RoundCross } from "../../assets/icons/RoundCross.svg";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow.svg";
import { ReactComponent as NewVault } from "../../assets/icons/NewVault.svg";
import { ReactComponent as VaultLogo } from "../../assets/logos/LogoVault.svg";
import { ReactComponent as USDC } from "../../assets/logos/USDC.svg";

type ModalVaultProps = {
  isOpen: boolean;
  setIsOpen: Function;
  setIsVaultOpen: Function;
};

const ModalVault: FC<ModalVaultProps> = ({
  isOpen,
  setIsOpen,
  setIsVaultOpen,
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="">
        <div className=" card flex h-[200px] w-[459px] flex-row justify-between p-5">
          <div className="flex w-[235px] flex-col self-center ">
            <div className="text-[20px] font-semibold">
              There are no vaults yet
            </div>
            <div className="text-[14px] text-[#000000B2]  ">
              Create your first vault to explore all the features of STOA
            </div>
          </div>
          <div
            className=" flex h-[160px] w-[160px] flex-col items-center justify-center gap-4 rounded-2xl bg-[#EF2A891F] text-pink hover:cursor-pointer"
            onClick={openModal}
          >
            <NewVault />
            New Vault
          </div>
        </div>
      </div>

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
                <Dialog.Panel className="card h-[536px] w-full max-w-md transform overflow-hidden text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex flex-row items-center justify-between border-b-[0.5px] border-solid border-borderCardAbout p-6  text-lg font-medium leading-6 text-gray-900"
                  >
                    New Vault
                    <Cross />
                  </Dialog.Title>
                  <div className="flex h-[372px] flex-col justify-between border-b-[0.5px] border-solid border-borderCardAbout px-[20px] py-[32px]">
                    <div className="flex h-[68px] flex-col justify-between">
                      <div>Vault Name</div>
                      <div className="h-[40px] rounded-xl border-[0.5px] border-solid border-borderCardAbout p-[10px] text-textGray">
                        fiUSD Vault
                      </div>
                    </div>
                    <div className="grid grid-cols-1 rounded-xl border-[0.5px] border-solid border-borderCardAbout ">
                      <div className=" flex justify-between p-[20px] pb-[4px] ">
                        <div>
                          <div>1000</div>
                          <div className="text-textGray">$1,000.00</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-end gap-2">
                            <USDC /> USDC <Arrow />
                          </div>
                          <div className="text-textGray">balance: 1,000</div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <DoubleArrow />
                      </div>
                      <div className=" flex justify-between p-[20px] pt-[4px] ">
                        <div>
                          <div>996</div>
                          <div className="text-textGray">$995.80</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-end gap-1">
                            <VaultLogo /> fiUSD
                          </div>
                          <div className="text-textGray">balance: 1,000</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between rounded-xl bg-ethBalance p-2">
                      <div className="flex flex-row items-center gap-1">
                        <Info />
                        <div className=" font-medium">
                          1 USDC = 1.0006 fiUSD{" "}
                          <span className="text-textGray">{"($1.000)"}</span>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <RoundCross />
                        <div className="text-textGray">$6.20</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-[20px]">
                    <div
                      onClick={() => {
                        closeModal;
                        setIsVaultOpen(true);
                      }}
                      className="flex h-[48px] items-center justify-center rounded-lg bg-pink p-3 text-base font-normal text-white hover:cursor-pointer
                      "
                    >
                      <button type="button">Open Vaults</button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalVault;
