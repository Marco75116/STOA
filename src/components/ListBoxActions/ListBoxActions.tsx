import { Popover, Transition } from "@headlessui/react";
import { ReactComponent as ArrowWhite } from "../../assets/icons/ArrowWhite.svg";
import { ReactComponent as DepositIcon } from "../../assets/icons/DepositIcon.svg";
import { ReactComponent as TransferIcon } from "../../assets/icons/TransferIcon.svg";
import { ReactComponent as WithdrawIcon } from "../../assets/icons/WithdrawIcon.svg";
import { ReactComponent as LiquidateIcon } from "../../assets/icons/LiquidateIcon.svg";
import { Fragment, useState } from "react";
import ModalTransfer from "../ModalTransfer/ModalTransfer";

export default function Example() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
              ${open ? "" : "text-opacity-90"}
            group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <div
                  onClick={() => {}}
                  className="flex h-[32px] w-[99px]  flex-row items-center justify-between rounded-lg bg-pink p-2  text-xs font-normal text-white hover:cursor-pointer
                      "
                >
                  Take Action
                  <ArrowWhite />
                </div>
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
                <Popover.Panel className="absolute z-10 mt-3  w-[260px] translate-x-[-50%] transform px-4 sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden rounded-lg border-[0.5px] border-solid border-[#00000033] shadow-lg ring-black ring-opacity-5">
                    <div className=" relative flex h-[248px] flex-col justify-between gap-2 bg-white p-3">
                      <div className="flex h-[48px] items-center gap-3 p-3 ">
                        <DepositIcon /> Deposit
                      </div>
                      <div
                        className="flex  h-[48px] items-center  gap-3 p-3 hover:cursor-pointer "
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      >
                        <TransferIcon /> Transfer
                      </div>
                      <div className="flex   h-[48px] items-center  gap-3 p-3">
                        <WithdrawIcon />
                        Withdraw
                      </div>
                      <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                      <div className="flex  h-[48px] items-center  gap-3 p-3">
                        <LiquidateIcon />
                        Liquidate
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
      <ModalTransfer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
