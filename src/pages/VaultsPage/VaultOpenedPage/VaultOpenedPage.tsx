import React, { useState } from "react";
import { ReactComponent as Arrow } from "../../../assets/icons/Arrow.svg";
import { ReactComponent as Bulb } from "../../../assets/icons/Bulb.svg";
import { ReactComponent as Cadena } from "../../../assets/icons/Cadena.svg";
import { ReactComponent as LegendGraph } from "../../../assets/texts/StoaEarning.svg";
import { ReactComponent as SamsVault } from "../../../assets/logos/SamsVault.svg";
import { ReactComponent as Info } from "../../../assets/icons/Info.svg";
import { ReactComponent as StoaLogoBlack } from "../../../assets/logos/STOALOGOBLACK.svg";
import Graph from "../../../components/Graph/Graph";
import Example from "../../../components/ListBoxActions/ListBoxActions";

const VaultOpenedPage = () => {
  const [period, setPeriod] = useState<"days" | "months" | "years">("days");

  return (
    <div className="flex h-[calc(100%-64px)] flex-col items-center justify-center gap-[15px] bg-ethBalance">
      <div className="h-[284px] w-[1200px] rounded-2xl border-[0.5px] border-solid border-borderCardAbout bg-white ">
        <div className="flex h-[92px] flex-row justify-between p-[20px]">
          <div className=" flex-rox flex h-[52px] w-[279px] items-center justify-between rounded-2xl bg-ethBalance p-[12px]">
            <div className="flex flex-row items-center gap-[12px]">
              <SamsVault /> {"Sam's Vault"}
            </div>
            <Arrow />
          </div>

          <Example />
        </div>

        <div className="grid grid-cols-4 ">
          <div className="border-b-[0.5px] border-t-[0.5px]  border-r-[0.5px] border-solid border-borderCardAbout p-[20px] ">
            <div className="flex flex-col justify-between">
              <div className="text-textGray">balance</div>
              <div>
                <span className="mr-[4px] text-2xl font-bold"> 10,000.00</span>
                <span className=" text-textGray">USDFI</span>
              </div>
            </div>
          </div>

          <div className="border-b-[0.5px]  border-t-[0.5px] border-r-[0.5px] border-solid border-borderCardAbout p-[20px]">
            <div className="flex flex-col justify-between">
              <div className="text-textGray">APY</div>
              <div>
                <span className="mr-[4px] text-2xl font-bold"> 3.5%</span>
                <span className=" text-textGray">30d AER V </span>
              </div>
            </div>
          </div>

          <div className="border-b-[0.5px] border-t-[0.5px]  border-r-[0.5px] border-solid border-borderCardAbout p-[20px]">
            <div className="flex flex-col justify-between">
              <div className="text-textGray">Yield Earned</div>
              <div>
                <span className="mr-[4px] text-2xl font-bold"> 178</span>
                <span className=" text-textGray">USDFI</span>
              </div>
            </div>
          </div>

          <div className="border-b-[0.5px] border-t-[0.5px]  border-solid border-borderCardAbout p-[20px]">
            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-2 text-textGray">
                <StoaLogoBlack /> Points Earned
              </div>
              <div>
                <span className="mr-[4px] text-2xl font-bold"> 54</span>
                <span className=" text-textGray">STOA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="flex h-[96px] w-[218px] flex-col justify-between p-5 ">
            <div className="flex items-center gap-2">
              <SamsVault /> Stoa Credit <Info />
            </div>
            <div>
              <span className="mr-[4px] text-2xl font-bold">2500</span>
              <span className=" text-sm font-normal text-textGray">
                /2500 USDC
              </span>
            </div>
          </div>

          <div className="flex w-[100%] flex-row justify-between p-5 pl-[72px]">
            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-2 ">
                <Cadena /> Locked Amount <Info />
              </div>
              <div>
                <span className="mr-[4px] text-2xl font-bold"> 0,00</span>
                <span className="text-sm font-normal text-textGray">USDFI</span>
              </div>
            </div>
            <div className="flex h-[28px] w-[173px] gap-[4px]">
              <div className=" flex items-center rounded-lg border-[0.5px] border-solid border-borderCardAbout px-[8px] py-[4px] text-xs font-semibold hover:cursor-pointer ">
                Borrow
              </div>
              <div className=" flex items-center rounded-lg border-[0.5px] border-solid border-borderCardAbout px-[8px] py-[4px] text-xs font-semibold hover:cursor-pointer">
                Repay
              </div>
              <div className="flex items-center rounded-lg border-[0.5px] border-solid border-borderCardAbout bg-[#EF2A891F] px-[8px] py-[4px] text-xs font-semibold text-pink hover:cursor-pointer">
                Transfer
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-[16px]">
        <div className="h-[260px] w-[912px] rounded-2xl border-[0.5px] border-t-[0.5px] border-solid border-borderCardAbout  bg-white p-[20px]">
          <div className="grid grid-cols-3">
            <div className=" font-semibold">Overview</div>
            <div className=" flex items-center justify-center">
              <div className="flex gap-[1px] rounded-lg border-[0.5px] border-solid border-borderCardNavbar bg-bgCardNavbar p-[2px]">
                <div
                  className={` flex  items-center justify-center p-[6px] hover:cursor-pointer  ${
                    period === "days" &&
                    "rounded-[6px] border-[0.5px] border-solid border-borderCardNavbar bg-white"
                  } `}
                  onClick={() => {
                    setPeriod("days");
                  }}
                >
                  Days
                </div>
                <div
                  className={` flex  items-center justify-center p-[6px] hover:cursor-pointer  ${
                    period === "months" &&
                    "rounded-[6px] border-[0.5px] border-solid border-borderCardNavbar bg-white   "
                  } `}
                  onClick={() => {
                    setPeriod("months");
                  }}
                >
                  Months
                </div>
                <div
                  className={` flex  items-center justify-center p-[6px] hover:cursor-pointer  ${
                    period === "years" &&
                    "rounded-[6px] border-[0.5px] border-solid border-borderCardNavbar bg-white "
                  } `}
                  onClick={() => {
                    setPeriod("years");
                  }}
                >
                  Years
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-end">
              <LegendGraph />
            </div>
          </div>
          <div>
            <Graph />
          </div>
        </div>

        <div className="r flex h-[260px] w-[272px] flex-col justify-end rounded-2xl border-[0.5px] border-t-[0.5px] border-solid border-borderCardAbout  bg-white p-[20px]">
          <Bulb />
          <div className="gap-[4px]">
            <div className=" text-base font-semibold ">Stoa Tip</div>
            <div className="text-sm font-normal text-textGrayFonce">
              Credit shown is gathered from your actual credit holding versus
              your base credit - how much credit your balance entitles you to.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultOpenedPage;
