import React, { useContext, useState } from "react";
import { ReactComponent as Settings } from "../../assets/icons/Settings.svg";
import { ReactComponent as USDFI } from "../../assets/logos/USDCFILogo.svg";
import { ReactComponent as DepositIllustration } from "../../assets/illustrations/DepositIllustration.svg";
import { ReactComponent as DepositCards } from "../../assets/illustrations/DepositCards.svg";
import { WalletContext } from "../../context/Wallet.context";
import { ReactComponent as Warning } from "../../assets/icons/Warning.svg";
import { useNavigate } from "react-router-dom";
import TokenInfos from "./TokenInfos/TokenInfos";
import { ReactComponent as ETHFI } from "../../assets/logos/ETHFILogo.svg";
import ModalSwap from "../../components/Modals/ModalSwap/ModalSwap";

const SwapPage = () => {
  const [action, setAction] = useState<0 | 1>(0);
  const [collapseOneOpen, setCollapseOneOpen] = useState<boolean>(true);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const { kycDone } = useContext(WalletContext);
  const navigate = useNavigate();

  return (
    <div className="center flex-col gap-3 bg-bgCardNavbar p-16">
      {!kycDone && (
        <div className="center flex flex-row gap-2">
          <Warning />
          Your have to pass your KYC before minting.{" "}
          <div
            onClick={() => {
              navigate("/KYC");
            }}
            className="  text-gray-500 hover:cursor-pointer hover:text-gray-400"
          >
            Let&apos;s go
          </div>
        </div>
      )}

      <div className="card min-h-[200px] w-[912px]">
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
        <div className="flex flex-row gap-3 p-5">
          <div className="flex h-[156px] w-full flex-row justify-between rounded-xl bg-[#F5F5F5] ">
            <div className="flex flex-col justify-between p-4">
              <div className="flex h-[68px] w-[200px] flex-col justify-between">
                <div className="text-sm font-medium">Deposit with Wallet</div>
                <div className="text-sm font-normal">
                  The purple elephant rode a unicycle through the park.
                </div>
              </div>
              <div
                className="center h-[40px] w-[108px] rounded-lg border-[1px] border-[#FF87B2] text-[#FF87B2] hover:cursor-pointer"
                onClick={() => {
                  setIsOpenPopup(true);
                }}
              >
                Proceed
              </div>
            </div>
            <DepositIllustration />
          </div>
          <div className="flex h-[156px] w-full flex-row justify-between rounded-xl bg-[#F5F5F5] ">
            <div className="flex flex-col justify-between p-4">
              <div className="flex h-[68px] w-[200px] flex-col justify-between">
                <div className="text-sm font-medium">
                  Deposit with Credit Card
                </div>
                <div className="text-sm font-normal">
                  The purple elephant rode a unicycle through the park.
                </div>
              </div>
              <div className="center h-[40px] w-[108px] rounded-lg border-[1px] border-[#FF87B2] text-[#FF87B2] hover:cursor-pointer">
                Proceed
              </div>
            </div>
            <DepositCards />
          </div>
        </div>
      </div>
      <TokenInfos
        collapseOneOpen={collapseOneOpen}
        setCollapseOneOpen={setCollapseOneOpen}
        SVGLogo={USDFI}
        TokenName={"USDFI"}
      />
      <TokenInfos
        collapseOneOpen={!collapseOneOpen}
        setCollapseOneOpen={setCollapseOneOpen}
        SVGLogo={ETHFI}
        TokenName={"ETHFI"}
      />
      <ModalSwap
        isOpen={isOpenPopup}
        setIsOpen={setIsOpenPopup}
        action={action}
        setAction={setAction}
      />
    </div>
  );
};

export default SwapPage;
