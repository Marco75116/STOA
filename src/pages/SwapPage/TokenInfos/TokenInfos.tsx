import React, { FC, useEffect, useState } from "react";
import { ReactComponent as Arrow } from "../../../assets/icons/ArrowBlack.svg";
import { Collapse } from "react-collapse";
import CollapseTokenInfos from "./CollapseTokenInfos/CollapseTokenInfos";
import { FITokensAPY, TokenName } from "../../../utils/types/swap.types";
import apiIndexer from "../../../utils/services/apiDapp";

type TokenInfosProps = {
  collapseOpen: boolean;
  setCollapseOpen: () => void;
  SVGLogo: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  tokenName: TokenName;
};

const TokenInfos: FC<TokenInfosProps> = ({
  collapseOpen,
  setCollapseOpen,
  SVGLogo,
  tokenName,
}) => {
  const [currentApy, setCurrentApy] = useState<FITokensAPY>({
    USDFI: 0,
    ETHFI: 0,
    BTCFI: 0,
  });

  useEffect(() => {
    const getApy = async () => {
      const applicantData = await apiIndexer.getApy(1);

      return applicantData.data;
    };

    getApy().then((FiTokensApy) => {
      setCurrentApy(FiTokensApy);
    });
  }, []);

  return (
    <div className="card w-[912px]">
      <div
        className="borderBottom flex justify-between p-5 hover:cursor-pointer"
        onClick={setCollapseOpen}
      >
        <div className="flex gap-2 ">
          <SVGLogo />
          {tokenName}
        </div>
        {/* <div className="flex flex-row items-center gap-[6px] ">
      <span className="text-xs font-medium text-textGray">
        Points rate
      </span>
      <STOALOGOBLACK />
      <span>100/$ earned</span>
    </div> */}
        <div className="center flex-row  gap-[6px] ">
          <span className="flex  items-stretch text-xs font-medium text-textGray">
            APY
          </span>
          <span>
            {currentApy[tokenName as keyof FITokensAPY].toPercentageFormat(1)}
          </span>
          <div className="center h-[32px] w-[32px] rounded-lg  hover:cursor-pointer">
            <Arrow className={`${collapseOpen && "rotate-180"}`} />
          </div>
        </div>
      </div>
      <Collapse isOpened={collapseOpen}>
        <CollapseTokenInfos tokenName={tokenName} />
      </Collapse>
    </div>
  );
};

export default TokenInfos;
