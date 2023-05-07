import { Dialog, Transition } from "@headlessui/react";
import { WalletContext } from "../../context/Wallet.context";
import { FC, Fragment, useContext, useState } from "react";
import { ReactComponent as Cross } from "../../assets/icons/Cross.svg";
import { m } from "../../plugins/magic";
import { ethers } from "ethers";

type ModalMagicProps = {
  isOpen: boolean;
  setIsOpen: Function;
};

const ModalMagic: FC<ModalMagicProps> = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState<string>("");
  const { initMagicWallet, setSigner } = useContext(WalletContext);

  function closeModal() {
    setIsOpen(false);
  }

  const authenticationMagic = async () => {
    await m.auth
      .loginWithEmailOTP({ email })
      .then(async () => {
        const metadata = await m.user.getMetadata();
        initMagicWallet(metadata.email || "", metadata.publicAddress || "");
        const provider = new ethers.providers.Web3Provider(
          m.rpcProvider as any
        );
        const signer = provider.getSigner();
        setSigner(signer);
        closeModal();
      })
      .catch((error: Error) => {
        throw new Error("MAGIC_AUTH_ERROR: " + error.message);
      });
  };

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
                <Dialog.Panel className="card max-h-[536px] w-full max-w-md transform overflow-hidden text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex flex-row items-center justify-between border-b-[0.5px] border-solid border-borderCardAbout p-6  text-lg font-medium leading-6 text-gray-900"
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
                  <div className="flex items-center justify-center pb-5">
                    <button
                      onClick={() => {
                        authenticationMagic();
                      }}
                      className="flex h-[48px]  items-center justify-center rounded-lg  bg-magicWallet px-6 py-3 text-base font-normal text-white hover:cursor-pointer"
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
