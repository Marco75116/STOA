import React, { useEffect, useRef, useState } from "react";
import PieChartComponent from "../../components/PieChart/PieChart";
import Graph from "../../components/Graph/Graph";
import { HistoryYiedAsset } from "../../utils/types/swap.types";
import { ReactComponent as USDFI } from "../../assets/logos/USDCFILogo.svg";
import { ReactComponent as BTCFILogo } from "../../assets/logos/tokens/BTCFILogo.svg";
import { ReactComponent as ETHFILogo } from "../../assets/logos/tokens/ETHFILogo.svg";
import { ReactComponent as ThreeDots } from "../../assets/icons/three-dots-svgrepo-com.svg";

const historyDataMock: HistoryYiedAsset[] = [
  {
    day: "2023-06-04",
    amount: 0,
    id: 1,
  },
  {
    day: "2023-06-05",
    amount: 4.97689172107e-7,
    id: 2,
  },
  {
    day: "2023-06-06",
    amount: 8.691563723009999e-7,
    id: 3,
  },
  {
    day: "2023-06-07",
    amount: 8.691563723009999e-7,
    id: 4,
  },
  {
    day: "2023-06-08",
    amount: 8.691563723009999e-7,
    id: 5,
  },
  {
    day: "2023-06-09",
    amount: 0.000002682221102649,
    id: 6,
  },
  {
    day: "2023-06-10",
    amount: 0.000003500220330144,
    id: 7,
  },
];

const Earnings = () => {
  const [show, setShow] = useState<0 | 1 | 2 | undefined>(undefined);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShow(undefined);
    }
  };

  useEffect(() => {
    if (show !== undefined) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  const itemDeuxProps = show == 1 ? { ref: modalRef } : {};
  const itemTroisProps = show == 2 ? { ref: modalRef } : {};
  const itemUnProps = show == 0 ? { ref: modalRef } : {};

  return (
    <div className=" flex min-h-[calc(100%-64px)] flex-col items-center  gap-[16px] bg-bgCardNavbar  py-16">
      <div className="flex w-[900px] flex-row justify-between">
        <div className="card flex h-28 w-52 flex-col justify-between gap-2 p-5">
          <div className="  text-2xl font-extrabold">Total Balance</div>
          <div className="text-lg text-gray-600">$107,000</div>
        </div>
        <div className="card flex h-28 w-52 flex-col justify-between gap-2 p-5">
          <div className="  text-2xl font-extrabold">Deposit</div>
          <div className="text-lg text-gray-600">$80,000</div>
        </div>
        <div className="card flex h-28 w-52 flex-col justify-between gap-2 p-5">
          <div className="  text-2xl font-extrabold">Yield</div>
          <div className=" text-lg text-gray-600">$27,000</div>
        </div>
        <div className="card flex h-28 w-52 flex-col justify-between gap-2 p-5">
          <div className="  text-2xl font-extrabold">% Earned </div>
          <div className="text-lg text-gray-600">34,3%</div>
        </div>
      </div>

      <div className="flex w-[900px] flex-row justify-between  gap-5">
        <div className="card flex w-[30%]  flex-col p-5">
          <div className="  text-xl font-extrabold">My Holdings</div>
          <div className="center mt-3">
            <PieChartComponent />
          </div>
        </div>
        <div className="card flex w-[70%] flex-col p-5">
          <div className="flex flex-row  items-center justify-between">
            <div className=" p-3 text-xl font-extrabold">Total Balance</div>
            <div className="flex flex-row gap-2">
              <div className="center cursor-pointer rounded-xl border bg-[#e0e0e0] px-2 text-xs">
                7 days
              </div>
              <div className="center cursor-pointer rounded-xl border bg-[#e0e0e0] px-2 text-xs">
                1 month
              </div>
              <div className="center cursor-pointer rounded-xl border bg-[#e0e0e0] px-2 text-xs">
                6 months
              </div>
              <div className="center cursor-pointer rounded-xl border bg-[#e0e0e0] px-2 text-xs">
                1 year
              </div>
            </div>
          </div>
          <Graph historyData={historyDataMock} />
        </div>
      </div>

      <div className="card flex w-[900px] flex-col justify-between  gap-5 p-5">
        <div className=" p-3 text-xl font-extrabold">My Balances</div>
        <div className=" flex  flex-col gap-3 p-5">
          <div className=" flex flex-row justify-between rounded-xl  bg-gray-100 px-7 py-4">
            <div>
              <div className="center flex flex-row gap-3">
                <USDFI width={44} height={44} />
                <div>
                  <span className="text-xl ">USDFI</span>
                  <div>Balance : 23,333 </div>
                </div>
              </div>
            </div>
            <div className="center flex flex-row gap-5">
              <div>
                <div>Current Apy : 7.3%</div>
                <div>Daily Yield : $4.33</div>
              </div>
              <div
                {...itemUnProps}
                className="center relative  cursor-pointer "
              >
                <ThreeDots
                  width={34}
                  height={34}
                  className=" h-12 w-12 rotate-90 rounded-[50%] bg-slate-50 p-4 shadow-md"
                  onClick={() => {
                    setShow(show === 0 ? undefined : 0);
                  }}
                />
                {show === 0 && (
                  <div className="absolute top-[100%] z-10 rounded-xl bg-white ">
                    <div className="cursor-pointer rounded-se-xl rounded-ss-xl px-3 py-2 hover:bg-slate-200">
                      Buy
                    </div>
                    <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                    <div className="cursor-pointer px-3  py-2 hover:bg-slate-200">
                      Deposit
                    </div>
                    <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                    <div className="cursor-pointer rounded-ee-xl  rounded-es-xl px-3 py-2 hover:bg-slate-200">
                      Redeem
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" flex flex-row justify-between bg-gray-100 px-7 py-4">
            <div>
              <div className="center flex flex-row gap-3">
                <ETHFILogo width={44} height={44} />
                <div>
                  <span className="text-xl ">USDFI</span>
                  <div>Balance : 8,13263 </div>
                </div>
              </div>
            </div>
            <div className="center flex flex-row gap-5">
              <div>
                <div>Current Apy : 6.1%</div>
                <div>Daily Yield : $4.33</div>
              </div>
              <div
                {...itemDeuxProps}
                className="center relative  cursor-pointer "
              >
                <ThreeDots
                  width={34}
                  height={34}
                  className=" h-12 w-12 rotate-90 rounded-[50%] bg-slate-50 p-4 shadow-md"
                  onClick={() => {
                    setShow(show === 1 ? undefined : 1);
                  }}
                />
                {show === 1 && (
                  <div className="absolute top-[100%] z-10 rounded-xl bg-white ">
                    <div className="cursor-pointer rounded-se-xl rounded-ss-xl px-3 py-2 hover:bg-slate-200">
                      Buy
                    </div>
                    <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                    <div className="cursor-pointer px-3  py-2 hover:bg-slate-200">
                      Deposit
                    </div>
                    <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                    <div className="cursor-pointer rounded-ee-xl  rounded-es-xl px-3 py-2 hover:bg-slate-200">
                      Redeem
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" flex flex-row justify-between bg-gray-100 px-7 py-4">
            <div>
              <div className="center flex flex-row gap-3">
                <BTCFILogo width={44} height={44} />
                <div>
                  <span className="text-xl ">BTCFI</span>
                  <div>Balance : 2,75654 </div>
                </div>
              </div>
            </div>
            <div className="center flex flex-row gap-5">
              <div>
                <div>Current Apy : 5.3%</div>
                <div>Daily Yield : $8.33</div>
              </div>
              <div
                {...itemTroisProps}
                className="center relative  cursor-pointer "
              >
                <ThreeDots
                  width={34}
                  height={34}
                  className=" h-12 w-12 rotate-90 rounded-[50%] bg-slate-50 p-4 shadow-md"
                  onClick={() => {
                    setShow(show === 2 ? undefined : 2);
                  }}
                />
                {show === 2 && (
                  <div className="absolute top-[100%] z-10 rounded-xl bg-white ">
                    <div className="cursor-pointer rounded-se-xl rounded-ss-xl px-3 py-2 hover:bg-slate-200">
                      Buy
                    </div>
                    <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                    <div className="cursor-pointer px-3  py-2 hover:bg-slate-200">
                      Deposit
                    </div>
                    <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                    <div className="cursor-pointer rounded-ee-xl  rounded-es-xl px-3 py-2 hover:bg-slate-200">
                      Redeem
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
