import React, { useState } from "react";
import ListboxComponent from "../../components/ListboxComponent/ListboxComponent";
import { ReactComponent as Settings } from "../../assets/icons/Settings.svg";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow.svg";
import { ReactComponent as STOALOGOBLACK } from "../../assets/logos/STOALOGOBLACK.svg";

import { ReactComponent as DoubleArrowWithBar } from "../../assets/icons/dobleArrowWithBar.svg";

const listStableCoinsFrom = [
  { name: "USDC" },
  { name: "USDT" },
  { name: "USDFI" },
  { name: "USTT" },
];
const listStableCoinsTo = [
  { name: "USDFI" },
  { name: "USDT" },
  { name: "USDC" },
  { name: "USTT" },
];
const SwapPage = () => {
  const [action, setAction] = useState<0 | 1>(1);

  return (
    <div className="center  h-[calc(100%-64px)] flex-col bg-bgCardNavbar">
      <div className="card max-h-[200px] w-[912px]">
        <div className="borderBottom flex justify-between p-5">
          <div className="flex h-[32px] w-[158px] flex-row gap-[2px] rounded-lg bg-bgCardNavbar p-[2px]">
            <div
              className={`center h-[28px] w-[76px] rounded-md p-[6px] text-xs font-normal hover:cursor-pointer  ${
                action === 0 && "borderToggle  bg-white shadow"
              }`}
              onClick={() => {
                setAction(0);
              }}
            >
              Deposit
            </div>
            <div
              className={`center h-[28px] w-[76px] rounded-md p-[6px] text-xs font-normal hover:cursor-pointer ${
                action === 1 && "borderToggle bg-white shadow"
              }`}
              onClick={() => {
                setAction(1);
              }}
            >
              Redeem
            </div>
          </div>
          <div className="center h-[32px] w-[32px] rounded-lg  border hover:cursor-pointer">
            <Settings />
          </div>
        </div>

        <div className="flex h-[128px] flex-row ">
          <div className="flex flex-row items-center gap-3 px-5">
            <div className="flex flex-col gap-2">
              <div className="text-base font-medium">From Wallet</div>
              <ListboxComponent width={160} list={listStableCoinsFrom} />
              <div className="text-xs font-medium text-textGray">
                Balance: 25.0 USDC
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className=" text-base font-medium">Amount</div>
              <div className="flex h-[40px] w-[160px]  items-center justify-between rounded-xl border-[0.5px] border-solid border-borderCardAbout p-[10px]">
                <input type="number" placeholder="0,00" className="w-[80%]" />
                <div className="center h-[28px] w-[40px]  rounded-md bg-ethBalance px-1 py-2 text-xs font-semibold">
                  Max
                </div>
              </div>
              <div className="text-xs font-medium text-textGray">$0.00</div>
            </div>
          </div>
          <DoubleArrowWithBar />
          <div className="wit flex flex-row items-center gap-3 px-5">
            <div className="flex flex-col gap-2">
              <div className="text-base font-medium">To Stoa stablecoin</div>
              <ListboxComponent width={160} list={listStableCoinsTo} />
              <div className="text-xs font-medium text-textGray">2.93%</div>
            </div>

            <div className="flex flex-col gap-2 ">
              <div className="text-base font-medium">You will recieve</div>
              <input
                type="number"
                placeholder="0,00"
                className="flex h-[40px] w-[160px]  items-center justify-between rounded-xl border-[0.5px] border-solid border-borderCardAbout p-[10px]"
              />
              <div className="text-xs font-medium text-textGray">$0.00</div>
            </div>
            <div className="center h-[40px] w-[108px]  rounded-lg bg-pink p-3 text-base font-normal text-white hover:cursor-pointer ">
              Swap
            </div>
          </div>
        </div>
      </div>
      <div className="card max-h-[446px] w-[912px]">
        <div className="borderBottom flex justify-between p-5">
          <div>USDFI</div>
          <div className="center ">
            <span className="text-xs font-medium text-textGray">
              Points rate
            </span>
            <STOALOGOBLACK />
            <span>100/$ earned</span>
          </div>
          <div className="center">
            <span className="flex  items-stretch text-xs font-medium text-textGray">
              APY
            </span>
            <span>3.5%</span>
          </div>
          <div className="center h-[32px] w-[32px] rounded-lg  hover:cursor-pointer">
            <Arrow />
          </div>
        </div>
      </div>
      <div className="card max-h-[446px] w-[912px]">3</div>
    </div>
  );
};

export default SwapPage;
