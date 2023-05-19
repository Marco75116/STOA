import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../context/Wallet.context";
import { ReactComponent as Arrow } from "../../assets/icons/ArrowWhiteAccount.svg";
import { ReactComponent as Profile } from "../../assets/icons/profile.svg";
import { ReactComponent as Shield } from "../../assets/icons/Shield.svg";
import { ReactComponent as Validate } from "../../assets/icons/Validate.svg";

const ConnectButton = () => {
  const { isWalletConnected, currentWalletAddress } = useContext(WalletContext);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [addressDisplayed, setAddressDisplayed] = useState<string>("");

  useEffect(() => {
    setAddressDisplayed(currentWalletAddress);
  }, [isWalletConnected]);

  if (isWalletConnected)
    return (
      <div
        className="center gap-[6px] rounded-lg border-[0.5px] border-solid border-white bg-darkgreen p-2"
        onClick={() => {
          showPopup ? setShowPopup(false) : setShowPopup(true);
        }}
      >
        <div className="relative mr-[6px]">
          <Validate className="absolute bottom-[-2px] right-[-6px] " />
          <Profile />
        </div>
        <span className="text-white">
          {addressDisplayed?.slice(0, 6) + "..." + addressDisplayed?.slice(38)}
        </span>
        <Arrow
          className={` hover:cursor-pointer ${showPopup && "rotate-180"}`}
          onClick={() => {
            showPopup ? setShowPopup(false) : setShowPopup(true);
          }}
        />
      </div>
    );

  return (
    <div>
      {
        <button
          onClick={() => {
            showPopup ? setShowPopup(false) : setShowPopup(true);
          }}
          className="center gap-[6px] rounded-lg border-[0.5px] border-solid border-borderBottomConnectedCard border-white bg-darkgreen p-2 hover:cursor-pointer"
        >
          <div className="relative mr-[6px]">
            <Shield className="absolute bottom-[-2px] right-[-6px]" />
            <Profile />
          </div>

          <Arrow className={`${showPopup && "rotate-180"}`} />
        </button>
      }
    </div>
  );
};

export default ConnectButton;
