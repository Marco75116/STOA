import React, { useState } from "react";
import ListboxComponent from "../../components/ListboxComponent/ListboxComponent";
import { ReactComponent as Settings } from "../../assets/icons/Settings.svg";

const listStableCoins = [
  { name: "USDC" },
  { name: "USDT" },
  { name: "USDFI" },
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
        <div className="flex h-[128px] flex-row px-5">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col gap-2">
              <div className="text-base font-medium">From Wallet</div>
              <ListboxComponent width={160} list={listStableCoins} />
              <div className="text-xs font-medium text-textGray">
                Balance: 25.0 USDC
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className=" text-base font-medium">Amount</div>
              <div className="center h-[40px] w-[160px] rounded-xl border-[0.5px] border-solid border-borderCardAbout p-[10px]">
                <input type="number" placeholder="0,00" className="w-[80%]" />
              </div>

              <div className="text-xs font-medium text-textGray">$0.00</div>
            </div>
          </div>
          <div>right</div>
        </div>
      </div>
      <div className="card max-h-[446px] w-[912px]">2</div>
      <div className="card max-h-[446px] w-[912px]">3</div>
    </div>
  );
};

export default SwapPage;
