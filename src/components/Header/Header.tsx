import React, { useContext, useState } from "react";
import { ReactComponent as COFILogo } from "../../assets/logos/COFILogo.svg";
import { ReactComponent as Swap } from "../../assets/icons/swap.svg";
// import { ReactComponent as VaultsLogo } from "../../assets/icons/Frame.svg";
// import { ReactComponent as VaultsLogoRed } from "../../assets/icons/FrameRed.svg";
import { ReactComponent as AboutLogo } from "../../assets/icons/Vector-2.svg";
import { ReactComponent as COFIPointLogo } from "../../assets/logos/COFIPointLogo.svg";
import { ReactComponent as ETHLogo } from "../../assets/logos/optimism-logo.svg";
import { useNavigate } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import ModalMagic from "../ModalMagic/ModalMagic";
import { WalletContext } from "../../context/Wallet.context";

const Header = () => {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<0 | 1 | 2 | 3>(0);
  const [openMagic, setOpenMagic] = useState<boolean>(false);
  const { isWalletConnected } = useContext(WalletContext);

  return (
    <div className="grid h-16 grid-cols-3 border-b-[0.5px] border-b-borderBottomConnectedCard bg-darkgreen px-6">
      <div
        className="col-span-1 flex items-center gap-2 hover:cursor-pointer"
        onClick={() => {
          navigate("/Swap");
        }}
      >
        <COFILogo />
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
          <Swap stroke={selectedPart === 0 ? "#EF2A89" : "white"} />
          <div
            className={`${selectedPart === 0 ? " text-pink" : "text-white"}`}
          >
            Swap
          </div>
        </div>

        {/* Hidden for now */}
        {/* <div
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
        </div> */}

        <div
          className={`flex h-[100%] items-center gap-[8px] hover:cursor-pointer ${
            selectedPart === 2 && "border-b-[3px] border-b-pink"
          }`}
          onClick={() => {
            navigate("/Points");
            setSelectedPart(2);
          }}
        >
          <COFIPointLogo stroke={selectedPart === 2 ? "#EF2A89" : "white"} />
          <div className={`${selectedPart === 2 ? "text-pink" : "text-white"}`}>
            Points
          </div>
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
          <AboutLogo stroke={`${selectedPart == 3 ? "#EF2A89" : "white"}`} />
          <div className={`${selectedPart == 3 ? "text-pink" : "text-white"}`}>
            About
          </div>
        </div>
      </div>

      <div className="col-span-1 flex items-center justify-end gap-[8px]  ">
        <div className="rounded-lg border bg-bgCardNavbar p-2   ">
          <ETHLogo />
        </div>
        <Dropdown setOpenMagic={setOpenMagic} />
      </div>
      {!isWalletConnected && (
        <ModalMagic isOpen={openMagic} setIsOpen={setOpenMagic} />
      )}
    </div>
  );
};

export default Header;
