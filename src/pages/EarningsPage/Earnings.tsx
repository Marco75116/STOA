import React, { useContext, useMemo, useEffect, useState } from "react";
import PieChartComponent from "../../components/PieChart/PieChart";
import Graph from "../../components/Graph/Graph";
import { FITokens, HistoryYiedAsset } from "../../utils/types/swap.types";
import { ReactComponent as USDC } from "../../assets/logos/tokens/USDC.svg";
import { ReactComponent as BTCLogo } from "../../assets/logos/tokens/BTCLogo.svg";
import { ReactComponent as ETHLogo } from "../../assets/logos/tokens/ETHLogo.svg";
import { SwapContext } from "../../context/Swap.context";
import {
  getEatchFIBalance,
  getPercentageEarned,
  getTotalBalance,
  getTotalDeposit,
  getYield,
} from "../../utils/helpers/earnings.helper";
import BalanceFI from "./BalanceFI/BalanceFI";
import apiDefi from "../../utils/services/apiDapp";
import { useAccount } from "wagmi";
import { AxiosResponse } from "axios";

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
  const [arrayDeposit, setArrayDeposit] = useState<FITokens>({
    USDFI: 0,
    ETHFI: 0,
    BTCFI: 0,
  });
  const { address, isConnected } = useAccount();
  const { pricesCoins, balanceCoins } = useContext(SwapContext);

  const totalDeposit = useMemo(() => {
    return getTotalDeposit(arrayDeposit, pricesCoins);
  }, [arrayDeposit]);

  const totalBalance: number = useMemo(() => {
    return getTotalBalance(balanceCoins, pricesCoins);
  }, [balanceCoins, pricesCoins]);

  const yieldAmount: number = useMemo(() => {
    return getYield(totalBalance, totalDeposit);
  }, [totalBalance, totalDeposit]);

  const percentageEarned: number = useMemo(() => {
    return getPercentageEarned(totalBalance, totalDeposit);
  }, [totalBalance, totalDeposit]);

  const balancesFi: FITokens = useMemo(() => {
    return getEatchFIBalance(balanceCoins, pricesCoins);
  }, [balanceCoins, pricesCoins]);

  useEffect(() => {
    if (isConnected) {
      apiDefi
        .getDepositArray(address)
        .then((deposits: AxiosResponse<FITokens, any>) => {
          setArrayDeposit(deposits.data);
        });
    }
  }, [address]);

  return (
    <div className=" flex min-h-[calc(100%-64px)] flex-col items-center  gap-[16px] bg-bgCardNavbar  py-16">
      <div className="flex w-[900px] flex-row justify-between">
        <div className="card flex h-28 w-52 flex-col justify-between gap-2 p-5">
          <div className="  text-2xl font-extrabold">Total Balance</div>
          <div className="text-lg text-gray-600">
            ${totalBalance.cofiFormatFloor(1)}
          </div>
        </div>
        <div className="card flex h-28 w-52 flex-col justify-between gap-2 p-5">
          <div className="  text-2xl font-extrabold">Deposit</div>
          <div className="text-lg text-gray-600">
            ${totalDeposit.cofiFormatFloor(1)}
          </div>
        </div>
        <div className="card flex h-28 w-52 flex-col justify-between gap-2 p-5">
          <div className="  text-2xl font-extrabold">Yield</div>
          <div className=" text-lg text-gray-600">
            ${yieldAmount.cofiFormatFloor(1)}
          </div>
        </div>
        <div className="card flex h-28 w-52 flex-col justify-between gap-2 p-5">
          <div className="  text-2xl font-extrabold">% Earned </div>
          <div className="text-lg text-gray-600">
            {percentageEarned.toPercentageFormat(1)}
          </div>
        </div>
      </div>

      <div className="flex w-[900px] flex-row justify-between  gap-5">
        <div className="card flex w-[30%]  flex-col p-5">
          <div className="  text-xl font-extrabold">My Holdings</div>
          <div className="center mt-3">
            <PieChartComponent balancesFi={balancesFi} />
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
          <BalanceFI
            TokenLogo={USDC}
            tokenName={"USDFI"}
            apy={0.073}
            deposit={arrayDeposit.USDFI}
          />
          <BalanceFI
            TokenLogo={ETHLogo}
            tokenName={"ETHFI"}
            apy={0.073}
            deposit={arrayDeposit.ETHFI}
          />
          <BalanceFI
            TokenLogo={BTCLogo}
            tokenName={"BTCFI"}
            apy={0.073}
            deposit={arrayDeposit.BTCFI}
          />
        </div>
      </div>
    </div>
  );
};

export default Earnings;
