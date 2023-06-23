import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useState } from "react";
import { ReactComponent as Cross } from "../../../assets/icons/Cross.svg";
import { useAccount, useSignMessage } from "wagmi";
import apiOffChain from "../../../utils/services/apiOffChain";
import { AxiosResponse } from "axios";
import { UserOffChainData } from "../../../utils/types/global.types";

type ModalOffChainDataProps = {
  isOpen: boolean;
  setIsOpen: Function;
};

const ModalOffChainData: FC<ModalOffChainDataProps> = ({
  isOpen = true,
  setIsOpen,
}) => {
  const [registrationDone, setRegisterDone] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserOffChainData>({
    firstName: "",
    lastName: "",
    email: "",
    marketing: false,
    signature: "",
  });
  const { isConnected, address } = useAccount();
  const { signMessage } = useSignMessage({
    message:
      "I certify that I am 18 years of age of older, I agree to the User Agreement, and I have read the Privacy Policy.",
    onSuccess(data) {
      setUserData({ ...userData, signature: data });
      apiOffChain.insertOffChainData(address, userData);
      setRegisterDone(true);
    },
  });

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isConnected && address) {
      apiOffChain
        .checkData(address)
        .then((result: AxiosResponse<boolean, any>) => {
          console.log(result.data);
          if (!result.data) {
            setIsOpen(true);
          }
        });
    }
  }, [isConnected]);

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
                <Dialog.Panel className="flex min-h-[180px] w-full max-w-md transform flex-col gap-4 overflow-hidden rounded-3xl bg-[#161618] px-8 py-4 text-left align-middle font-bold shadow-xl transition-all">
                  <div className=" mb-2 flex items-center justify-between  text-2xl text-white">
                    <div>Registration</div>
                    <Cross
                      stroke="white"
                      height="16"
                      width="16"
                      onClick={() => {
                        closeModal();
                      }}
                      className=" cursor-pointer"
                    />
                  </div>

                  {registrationDone ? (
                    <div className="  font-normal text-white">
                      Thank you for submitting your details. Finish final step
                      of identity verification to start using COFI.
                    </div>
                  ) : (
                    <>
                      <div className=" font-normal text-white">
                        Be sure to enter your legal name as it appears on your
                        government issued ID
                      </div>
                      <div className="flex flex-row  gap-2 ">
                        <div className="flex flex-col gap-2">
                          <div className=" font-bold text-white">
                            Legal First name
                          </div>
                          <input
                            placeholder="Enter firstname..."
                            type="text"
                            className="h-[40px] w-[100%] rounded-lg border-[0.5px] border-solid border-[#00000033]  p-[10px]"
                            value={userData.firstName}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                firstName: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className=" font-bold text-white">
                            Legal Last name
                          </div>
                          <input
                            placeholder="Enter lastname..."
                            type="text"
                            className="h-[40px] w-[100%] rounded-lg border-[0.5px] border-solid border-[#00000033]  p-[10px]"
                            value={userData.lastName}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                lastName: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col  gap-2 ">
                        <div className=" font-bold text-white">Email</div>
                        <input
                          placeholder="Enter email..."
                          type="text"
                          className="h-[40px] w-[100%] rounded-lg border-[0.5px] border-solid border-[#00000033]  p-[10px]"
                          value={userData.email}
                          onChange={(e) => {
                            setUserData({ ...userData, email: e.target.value });
                          }}
                        />
                      </div>
                      <div className="flex  gap-2 ">
                        <input type="checkbox" className="mt-1" />
                        <div className="font-normal  text-white">
                          I certify that I am 18 years of age of older, I agree
                          to the User Agreement, and I have read the Privacy
                          Policy.
                        </div>
                      </div>
                      <div className="flex  gap-2 ">
                        <input
                          type="checkbox"
                          className="mt-1"
                          onClick={() => {
                            setUserData({
                              ...userData,
                              marketing: !userData.marketing,
                            });
                          }}
                        />
                        <div className="font-normal  text-white">
                          I agree to be contacted by Stoa Group&#x2019;s
                          marketing campaigns.
                        </div>
                      </div>
                      <div className="text-green-400 col-span-1 flex w-full items-center justify-center gap-[8px] font-semibold  ">
                        <button
                          className="  hover:bg-green-700 rounded-lg bg-white px-5 py-2 font-semibold text-black"
                          onClick={() => signMessage()}
                        >
                          Sign
                        </button>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalOffChainData;
