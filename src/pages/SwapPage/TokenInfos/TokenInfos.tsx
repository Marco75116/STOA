import React, { FC } from "react";
import { ReactComponent as Arrow } from "../../../assets/icons/ArrowBlack.svg";
import { Collapse } from "react-collapse";
import CollapseTokenInfos from "./CollapseTokenInfos/CollapseTokenInfos";

type TokenInfosProps = {
  collapseOneOpen: boolean;
  setCollapseOneOpen: Function;
  SVGLogo: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  TokenName: String;
};

const TokenInfos: FC<TokenInfosProps> = ({
  collapseOneOpen,
  setCollapseOneOpen,
  SVGLogo,
  TokenName,
}) => {
  return (
    <div className="card w-[912px]">
      <div
        className="borderBottom flex justify-between p-5 hover:cursor-pointer"
        onClick={() => {
          setCollapseOneOpen((prev: boolean) => !prev);
        }}
      >
        <div className="flex gap-2 ">
          <SVGLogo />
          {TokenName}
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
          <span>3.5%</span>
          <div className="center h-[32px] w-[32px] rounded-lg  hover:cursor-pointer">
            <Arrow className={`${collapseOneOpen && "rotate-180"}`} />
          </div>
        </div>
      </div>
      <Collapse isOpened={!collapseOneOpen}>
        <CollapseTokenInfos />
      </Collapse>
    </div>
  );
};

export default TokenInfos;
