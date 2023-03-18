import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import { ReactComponent as Explore } from "../../assets/icons/Explore.svg";
import { ReactComponent as Warning } from "../../assets/icons/Warning.svg";
import { ReactComponent as Disconnect } from "../../assets/icons/Disconnect.svg";

export default function Dropdown() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [connected, setConnected] = useState<boolean>(false);
  return (
    <div className="fixed top-16 w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
              text-black group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <ConnectButton />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {!connected ? (
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 h-[272px]  w-[260px] -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                  <div className="ring-black overflow-hidden rounded-lg shadow-lg ring-opacity-5">
                    <div className="relative flex grid  gap-[6px] bg-white p-3 lg:grid-cols-1">
                      <div className=" h-[48px] p-3 text-base font-normal">
                        My Profile
                      </div>
                      <div className="flex h-[64px] items-center justify-between bg-yellow px-[12px] py-[10px] text-base font-normal">
                        <div>
                          <p>Vérification Center</p>
                          <p>Complete Verification</p>
                        </div>
                        <Warning />
                      </div>
                      <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                      <div className="flex h-[48px] items-center justify-between p-3 text-base font-normal">
                        Explore
                        <Explore
                          className="hover:cursor-pointer"
                          onClick={() =>
                            window.open(
                              `https://mumbai.polygonscan.com/address/0x01738387092e007ccb8b5a73fac2a9ba23cf91d3`,
                              "_blank"
                            )
                          }
                        />
                      </div>
                      <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                      <div className="flex h-[48px] items-center justify-center rounded-lg bg-pink p-3 text-base font-normal text-white hover:cursor-pointer">
                        Connect Wallet
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              ) : (
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 h-[272px]  w-[260px] -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                  <div className="ring-black overflow-hidden rounded-lg shadow-lg ring-opacity-5">
                    <div className="relative flex grid  gap-[6px] bg-white p-3 lg:grid-cols-1">
                      <div>Account Stats</div>
                      <div className="flex h-[48px] items-center justify-between p-3 text-base font-normal">
                        My Profile
                      </div>
                      <div className="flex h-[48px] items-center justify-between p-3 text-base font-normal">
                        Verification Center
                      </div>
                      <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                      <div className="flex h-[48px] items-center justify-between p-3 text-base font-normal">
                        Explore
                        <Explore
                          className="hover:cursor-pointer"
                          onClick={() =>
                            window.open(
                              `https://mumbai.polygonscan.com/address/0x01738387092e007ccb8b5a73fac2a9ba23cf91d3`,
                              "_blank"
                            )
                          }
                        />
                      </div>
                      <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                      <div className="flex h-[48px] items-center justify-between p-3 text-base font-normal">
                        Disconnect
                        <Disconnect className="hover:cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              )}
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
