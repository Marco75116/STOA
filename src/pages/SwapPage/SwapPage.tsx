import React, { useState } from "react";
import ListboxComponent from "../../components/ListboxComponent/ListboxComponent";
import { ReactComponent as Settings } from "../../assets/icons/Settings.svg";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow.svg";
import { ReactComponent as STOALOGOBLACK } from "../../assets/logos/STOALOGOBLACK.svg";
import { ReactComponent as SamsVault } from "../../assets/logos/SamsVault.svg";
import { ReactComponent as LegendGraph } from "../../assets/texts/StoaEarning.svg";
import { ReactComponent as DoubleArrowWithBar } from "../../assets/icons/dobleArrowWithBar.svg";
import { Collapse } from "react-collapse";
import Graph from "../../components/Graph/Graph";

const listStableCoinsFrom = [
  { name: "USDC" },
  { name: "USDT" },
  { name: "fiUSD" },
  { name: "USTT" },
];
const listStableCoinsTo = [
  { name: "fiUSD" },
  { name: "USDT" },
  { name: "USDC" },
  { name: "USTT" },
];
const SwapPage = () => {
  const [action, setAction] = useState<0 | 1>(1);
  const [collapseOneOpen, setCollapseOneOpen] = useState<boolean>(true);

  return (
    <div className="center flex-col gap-3 bg-bgCardNavbar p-16">
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
                <div className="center h-[28px] w-[40px]  rounded-md bg-ethBalance px-1 py-2 text-xs font-semibold  hover:cursor-pointer">
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

      <div className="card w-[912px]">
        <div
          className="borderBottom flex justify-between p-5 hover:cursor-pointer"
          onClick={() => {
            setCollapseOneOpen((prev) => !prev);
          }}
        >
          <div className="flex gap-2 ">
            <SamsVault />
            fiUSD
          </div>
          <div className="flex flex-row items-center gap-[6px] ">
            <span className="text-xs font-medium text-textGray">
              Points rate
            </span>
            <STOALOGOBLACK />
            <span>100/$ earned</span>
          </div>
          <div className="center flex-row  gap-[6px] ">
            <span className="flex  items-stretch text-xs font-medium text-textGray">
              APY
            </span>
            <span>3.5%</span>
          </div>
          <div className="center h-[32px] w-[32px] rounded-lg  hover:cursor-pointer">
            <Arrow />
          </div>
        </div>
        <Collapse isOpened={collapseOneOpen}>
          <div className="borderBottom flex flex-row ">
            <div className="borderRight flex basis-[53%] flex-col gap-2 p-5">
              <div className=" text-base font-semibold">Description</div>
              <div className="text-sm font-normal leading-[16px] text-[#000000B2]">
                USD Coin is a stablecoin that is pegged to the U.S. dollar on a
                1:1 basis. Every unit of this cryptocurrency in circulation is
                backed up by S1 that is held in reserve, in a mix of cash and
                short-term U.S. Treasury bonds. The Centre consortium, which is
                behind this asset, says USDC is issued by regulated financial
                institutions.
              </div>
            </div>

            <div className="flex basis-[47%] flex-col gap-2 p-5">
              <div>Summary</div>
              <div className="flex flex-row gap-2">
                <div className="center h-[90px] w-[90px] flex-col  rounded-lg border">
                  <div className=" text-base font-semibold">1.7%</div>
                  <div className="text-xs font-normal text-textGray">
                    Weekly APY
                  </div>
                </div>
                <div className="center h-[90px] w-[90px] flex-col  rounded-lg border ">
                  <div className=" text-base font-semibold">2.33%</div>
                  <div className="text-xs font-normal text-textGray">
                    Inception APY
                  </div>
                </div>
                <div className="center h-[90px] w-[90px] flex-col  rounded-lg border">
                  <div className=" text-base font-semibold">2.93%</div>
                  <div className="text-xs font-normal text-textGray">
                    Monthly APY
                  </div>
                </div>
                <div className="center h-[90px] w-[90px] flex-col rounded-lg border ">
                  <div className=" text-base font-semibold">7500</div>
                  <div className="text-xs font-normal text-textGray">
                    Stoa rewarded
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between pb-3">
              <div>Cumulative Earning</div>
              <LegendGraph />
            </div>
            <Graph />
          </div>
        </Collapse>
      </div>

      <div className="card w-[912px]">
        <div
          className="borderBottom flex justify-between p-5 hover:cursor-pointer"
          onClick={() => {
            setCollapseOneOpen((prev) => !prev);
          }}
        >
          <div className="flex gap-2 ">
            <SamsVault />
            fiETH
          </div>
          <div className="flex flex-row items-center gap-[6px] ">
            <span className="text-xs font-medium text-textGray">
              Points rate
            </span>
            <STOALOGOBLACK />
            <span>100/$ earned</span>
          </div>
          <div className="center flex-row  gap-[6px] ">
            <span className="flex  items-stretch text-xs font-medium text-textGray">
              APY
            </span>
            <span>3.5%</span>
          </div>
          <div className="center h-[32px] w-[32px] rounded-lg  hover:cursor-pointer">
            <Arrow />
          </div>
        </div>
        <Collapse isOpened={!collapseOneOpen}>
          <div className="borderBottom flex flex-row">
            <div className="borderRight flex basis-[53%] flex-col gap-2 p-5">
              <div className=" text-base font-semibold">Description</div>
              <div className="text-sm font-normal leading-[16px] text-[#000000B2]">
                USD Coin is a stablecoin that is pegged to the U.S. dollar on a
                1:1 basis. Every unit of this cryptocurrency in circulation is
                backed up by S1 that is held in reserve, in a mix of cash and
                short-term U.S. Treasury bonds. The Centre consortium, which is
                behind this asset, says USDC is issued by regulated financial
                institutions.
              </div>
            </div>

            <div className="flex basis-[47%] flex-col gap-2 p-5">
              <div>Summary</div>
              <div className="flex flex-row gap-2">
                <div className="center h-[90px] w-[90px] flex-col  rounded-lg border">
                  <div className=" text-base font-semibold">1.7%</div>
                  <div className="text-xs font-normal text-textGray">
                    Weekly APY
                  </div>
                </div>
                <div className="center h-[90px] w-[90px] flex-col  rounded-lg border ">
                  <div className=" text-base font-semibold">2.33%</div>
                  <div className="text-xs font-normal text-textGray">
                    Inception APY
                  </div>
                </div>
                <div className="center h-[90px] w-[90px] flex-col  rounded-lg border">
                  <div className=" text-base font-semibold">2.93%</div>
                  <div className="text-xs font-normal text-textGray">
                    Monthly APY
                  </div>
                </div>
                <div className="center h-[90px] w-[90px] flex-col rounded-lg border ">
                  <div className=" text-base font-semibold">7500</div>
                  <div className="text-xs font-normal text-textGray">
                    Stoa rewarded
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between pb-3">
              <div>Cumulative Earning</div>
              <LegendGraph />
            </div>
            <Graph />
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default SwapPage;
