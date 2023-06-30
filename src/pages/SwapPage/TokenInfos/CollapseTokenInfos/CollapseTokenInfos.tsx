import React, { FC, useEffect, useState } from "react";
import Graph from "../../../../components/Graph/Graph";
import { ReactComponent as LegendGraph } from "../../../../assets/texts/StoaEarning.svg";
import { ReactComponent as ArrowSwap } from "../../../../assets/icons/arrowSwap.svg";
import apiIndexer from "../../../../utils/services/apiDapp";
import {
  FITokens,
  HistoryYiedAsset,
  TokenName,
} from "../../../../utils/types/swap.types";
import { getHistoryYieldArray } from "../../../../utils/helpers/swap.helpers";

type CollapseTokenInfosProps = {
  tokenName: TokenName;
};

const CollapseTokenInfos: FC<CollapseTokenInfosProps> = ({ tokenName }) => {
  const [historyData, setHistoryData] = useState<HistoryYiedAsset[]>();
  const [apyData, setapyData] = useState<FITokens>({
    USDFI: 0,
    ETHFI: 0,
    BTCFI: 0,
  });
  const getHistoryYield = async () => {
    const applicantData = await apiIndexer.getHistoryYield();

    return applicantData.data;
  };
  const getApy = async () => {
    const applicantData = await apiIndexer.getApy(1);

    return applicantData.data;
  };

  useEffect(() => {
    getHistoryYield().then((historyYieldArray) => {
      setHistoryData(getHistoryYieldArray(historyYieldArray, tokenName));
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getApy().then((FiTokens) => {
      setapyData({
        USDFI: 0.076,
        ETHFI: 0.086,
        BTCFI: 0.011,
      });
    });
  }, []);

  return (
    <>
      <div className="borderBottom flex flex-row ">
        <div className="borderRight flex basis-[53%] flex-col gap-2 p-5">
          <div className=" text-base font-semibold">Description</div>
          <div className="text-sm font-normal leading-[16px] text-[#000000B2]">
            USD Coin is a stablecoin that is pegged to the U.S. dollar on a 1:1
            basis. Every unit of this cryptocurrency in circulation is backed up
            by S1 that is held in reserve, in a mix of cash and short-term U.S.
            Treasury bonds. The Centre consortium, which is behind this asset,
            says USDC is issued by regulated financial institutions.
          </div>
        </div>

        <div className="flex basis-[47%] flex-col gap-2 p-5">
          <div>Summary</div>
          <div className="flex flex-row gap-2">
            <div className="center h-[90px] w-full flex-col  rounded-lg border">
              <div className=" text-base font-semibold">
                {apyData[tokenName as keyof FITokens].toPercentageFormat(2)}
              </div>
              <div className="center flex-row gap-1 text-xs  font-normal text-textGray">
                3 days APY <ArrowSwap />
              </div>
            </div>

            <div className="center h-[90px] w-full flex-col rounded-lg border ">
              <div className=" text-base font-semibold">7,500</div>
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
        <Graph historyData={historyData} />
      </div>
    </>
  );
};

export default CollapseTokenInfos;
