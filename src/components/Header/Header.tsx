import React, { useState } from "react";
import { ReactComponent as Logo } from "../../assets/logos/STOA_Blue_on_Transparent_Font_Logo 2.svg";
import { ReactComponent as Stoa } from "../../assets/logos/STOA.svg";
import { ReactComponent as Swap } from "../../assets/icons/Vector-2Black.svg";
import { ReactComponent as SwapRed } from "../../assets/icons/Vector.svg";
import { ReactComponent as VaultsLogo } from "../../assets/icons/Frame.svg";
import { ReactComponent as VaultsLogoRed } from "../../assets/icons/FrameRed.svg";
import { ReactComponent as AboutLogo } from "../../assets/icons/Vector-2.svg";
import { ReactComponent as PointsLogo } from "../../assets/icons/Union.svg";
import { ReactComponent as PointsLogoRed } from "../../assets/icons/UnionRed.svg";
import { ReactComponent as AboutLogoRed } from "../../assets/icons/AboutRed.svg";
import { ReactComponent as Question } from "../../assets/icons/Question.svg";
import { ReactComponent as ETHLogo } from "../../assets/icons/EthLogo.svg";
import { ReactComponent as Moon } from "../../assets/icons/Moon.svg";
import { ReactComponent as Sun } from "../../assets/icons//Sun.svg";
import { useNavigate } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";

const Header = () => {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<0 | 1 | 2 | 3>(0);
  const [theme, setTheme] = useState<boolean>(true);

  return (
    <div className="grid h-16 grid-cols-3 border-b-[0.5px] border-b-borderBottomConnectedCard px-6">
      {/* <Stoa /> */}
      <div
        className="col-span-1 flex items-center hover:cursor-pointer"
        onClick={() => {
          navigate("/Swap");
        }}
      >
        <Logo className="" />
        <Stoa />
      </div>

      <div className="flex items-center justify-center gap-[12px] space-x-2">
        <div
          className={`flex h-[100%] items-center gap-[8px] hover:cursor-pointer ${
            selectedPart === 0 && " border-b-[3px] border-b-pink "
          } `}
          onClick={() => {
            navigate("/Swap");
            setSelectedPart(0);
          }}
        >
          {selectedPart === 0 ? <SwapRed /> : <Swap />}
          <div className={`${selectedPart === 0 && " text-pink"}`}>Swap</div>
        </div>

        <div
          className={`flex h-[100%] items-center gap-[8px] hover:cursor-pointer ${
            selectedPart === 1 && "border-b-[3px] border-b-pink"
          }`}
          onClick={() => {
            navigate("/Vaults");
            setSelectedPart(1);
          }}
        >
          {selectedPart === 1 ? <VaultsLogoRed /> : <VaultsLogo />}
          <div className={`${selectedPart === 1 && "text-pink"}`}>Vaults</div>
        </div>

        <div
          className={`flex h-[100%] items-center gap-[8px] hover:cursor-pointer ${
            selectedPart === 2 && "border-b-[3px] border-b-pink"
          }`}
          onClick={() => {
            navigate("/Points");
            setSelectedPart(2);
          }}
        >
          {selectedPart === 2 ? <PointsLogoRed /> : <PointsLogo />}
          <div className={`${selectedPart === 2 && "text-pink"}`}>Points</div>
        </div>

        <div
          className={`flex h-[100%] items-center gap-[8px] hover:cursor-pointer ${
            selectedPart === 3 && "border-b-[3px] border-b-pink"
          }`}
          onClick={() => {
            navigate("/About");
            setSelectedPart(3);
          }}
        >
          {selectedPart == 3 ? <AboutLogoRed /> : <AboutLogo />}
          <div className={`${selectedPart == 3 && "text-pink"}`}>About</div>
        </div>
      </div>

      <div className="col-span-1 flex items-center justify-end gap-[8px]  ">
        <div className="flex gap-0.5 rounded-lg border-[0.5px] border-solid border-borderCardNavbar bg-bgCardNavbar p-[2px]">
          <div
            className={` flex h-8 w-8 items-center justify-center hover:cursor-pointer  ${
              theme === true &&
              "rounded-[6px] border-[0.5px] border-solid border-borderCardNavbar  bg-white"
            } `}
            onClick={() => {
              setTheme(true);
            }}
          >
            <Sun />
          </div>
          <div
            className={` flex h-8 w-8 items-center justify-center hover:cursor-pointer  ${
              theme === false &&
              "rounded-[6px] border-[0.5px] border-solid border-borderCardNavbar  bg-white  "
            } `}
            onClick={() => {
              setTheme(false);
            }}
          >
            <Moon />
          </div>
        </div>

        <Question />
        <div className="rounded-lg border-[0.5px] border-solid border-borderCardNavbar bg-bgCardNavbar p-2   ">
          <ETHLogo />
        </div>
        <Dropdown />
      </div>
    </div>
  );
};

export default Header;
