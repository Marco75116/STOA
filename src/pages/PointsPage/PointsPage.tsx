import React from "react";
import { ReactComponent as Bulb } from "../../assets/icons/Bulb.svg";
import { ReactComponent as TotalEarned } from "../../assets/texts/TotalEarned.svg";
import { ReactComponent as Claimed } from "../../assets/texts/Claimed.svg";
import { ReactComponent as StoaPoints } from "../../assets/texts/StoaPoints.svg";
import { ReactComponent as Claimable } from "../../assets/texts/Claimable.svg";
import ListboxComponent from "../../components/ListboxComponent/ListboxComponent";

const listStableCoins = [
  { name: "USDC" },
  { name: "USDT" },
  { name: "fiUSD" },
  { name: "USTT" },
];
const listFromFunds = [
  { name: "Metamask", amount: 12222 },
  { name: "Sam's Vault", amount: 12222 },
  { name: "ETHFI Vault", amount: 12222 },
  { name: "My Vault", amount: 12222 },
];

const PointsPage = () => {
  return (
    <div className=" flex h-[calc(100%-64px)] flex-col items-center justify-center gap-[16px]  bg-bgCardNavbar">
      <div className=" card grid h-[212px] w-[800px] grid-cols-2">
        <div className="col-span-2 flex-row border-b-[0.5px] border-solid border-borderCardAbout p-[20px]">
          <div className=" flex h-[100%] flex-col justify-between">
            <div className="flex flex-row justify-between">
              <StoaPoints />
              <div className=" flex h-[36px] items-center justify-center rounded-lg bg-pink py-[8px] px-[12px]  text-xs font-semibold font-normal text-white hover:cursor-pointer">
                Claim Points
              </div>
            </div>
            <div className=" flex gap-[4px] text-2xl font-semibold">
              50,000
              <span className="mb-[2px] flex h-[20px]  self-end text-sm font-normal text-textGray">
                <Claimable />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between  border-r-[0.5px] border-solid border-borderCardAbout p-[20px] ">
          <TotalEarned />
          <div className=" flex gap-[4px] text-2xl font-semibold">
            50,000
            <span className="mb-[2px] flex  h-[20px] self-end  text-sm font-normal text-textGray">
              STOA
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between border-solid border-borderCardAbout p-[20px]">
          <Claimed />
          <div className=" flex gap-[4px] text-2xl font-semibold">
            49,000
            <span className="mb-[2px] flex h-[20px]  self-end text-sm font-normal text-textGray">
              STOA
            </span>
          </div>
        </div>
      </div>

      <div className=" card flex h-[140px] w-[800px] flex-col justify-between p-5">
        <Bulb />
        <div className="gap-[4px]">
          <div className=" text-base font-semibold ">Stoa Tip</div>
          <div className="text-base font-normal">
            Earn 100 Stoa Points for every Dollar of Yield Earned.
          </div>
        </div>
      </div>

      <div className=" card grid h-[212px] w-[800px] grid-cols-2">
        <div className="col-span-2  flex flex-row justify-between border-b-[0.5px] border-solid border-borderCardAbout p-[20px]">
          <div className="flex flex-row gap-[16px]">
            <div className="flex flex-col">
              <div className="pl-[4px]">Supply Assets</div>
              <ListboxComponent list={listStableCoins} />
            </div>
            <div className="flex flex-col">
              <div className="pl-[4px]">Supply</div>
              <ListboxComponent list={listStableCoins} />
            </div>

            <div>
              <div className="pl-[4px]">Amount</div>
              <input
                type="number"
                placeholder="0,00"
                className="h-[40px] w-[120px] rounded-xl border-[0.5px] border-solid border-borderCardAbout p-[10px]"
              ></input>
            </div>

            <div className="flex flex-col">
              <div className="pl-[4px]">From</div>
              <ListboxComponent list={listFromFunds} />
            </div>
          </div>

          <div className="flex gap-1">
            <button className=" h-[28px] rounded-lg  border-[0.5px] border-solid border-borderCardAbout px-[8px] py-[4px] text-xs font-semibold">
              Withdraw
            </button>
            <button className="h-[28px]  rounded-lg bg-[#EF2A891F] px-[8px] text-xs text-[#EF2A89]">
              Deposit
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between border-r-[0.5px]  border-solid border-borderCardAbout p-[20px] ">
          <div className="mb-[2px]  h-[20px]  text-sm font-normal text-textGray">
            Points multiplier
          </div>
          <div className=" flex  text-2xl font-semibold">5x</div>
        </div>

        <div className="flex flex-col justify-between  border-solid border-borderCardAbout p-[20px]">
          <div className="mb-[2px]  h-[20px]  text-sm font-normal text-textGray">
            Points earned
          </div>
          <div className=" flex gap-[4px] text-2xl font-semibold">12,000</div>
        </div>
      </div>
    </div>
  );
};

export default PointsPage;
