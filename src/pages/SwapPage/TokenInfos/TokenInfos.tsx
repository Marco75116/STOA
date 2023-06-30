import React, { FC, useEffect, useState } from "react";
import { ReactComponent as Arrow } from "../../../assets/icons/ArrowBlack.svg";
import { Collapse } from "react-collapse";
import CollapseTokenInfos from "./CollapseTokenInfos/CollapseTokenInfos";
import { FITokens, TokenName } from "../../../utils/types/swap.types";
import apiIndexer from "../../../utils/services/apiDapp";

type TokenInfosProps = {
  collapseOpen: boolean;
  setCollapseOpen: () => void;
  TokenLogo: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  FiLogo: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  tokenName: TokenName;
};

const TokenInfos: FC<TokenInfosProps> = ({
  collapseOpen,
  setCollapseOpen,
  TokenLogo,
  FiLogo,
  tokenName,
}) => {
  const [currentApy, setCurrentApy] = useState<FITokens>({
    USDFI: 0,
    ETHFI: 0,
    BTCFI: 0,
  });

  useEffect(() => {
    const getApy = async () => {
      const applicantData = await apiIndexer.getApy(1);

      return applicantData.data;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getApy().then((FiTokens) => {
      setCurrentApy({
        USDFI: 0.078,
        ETHFI: 0.084,
        BTCFI: 0.012,
      });
    });
  }, []);

  return (
    <div className="card w-[912px]">
      <div
        className="borderBottom flex justify-between p-5 px-7 hover:cursor-pointer"
        onClick={setCollapseOpen}
      >
        <div className="center gap-2 ">
          <TokenLogo />
          <span>
            deposit and earn{" "}
            {currentApy[tokenName as keyof FITokens].toPercentageFormat(1)} APY
          </span>
        </div>
        <div className="center flex-row  gap-[6px] ">
          <span className="mr-3">reveive</span>
          <FiLogo />
          {tokenName}
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
