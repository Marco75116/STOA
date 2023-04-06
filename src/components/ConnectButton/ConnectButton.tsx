/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../context/Wallet.context";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow.svg";
import { ReactComponent as Profile } from "../../assets/icons/profile.svg";
import { ReactComponent as Shield } from "../../assets/icons/Shield.svg";
import { ReactComponent as Validate } from "../../assets/icons/Validate.svg";

const ConnectButton = () => {
  const { isWalletConnected, currentWalletAddress } = useContext(WalletContext);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [addressDisplayed, setAddressDisplayed] = useState<string>("");

  useEffect(() => {
    setAddressDisplayed(address || "");
  }, [address]);

  useEffect(() => {
    setAddressDisplayed(currentWalletAddress);
  }, [isWalletConnected]);

  if (isConnected || isWalletConnected)
    return (
      <div
        className=" flex items-center justify-center gap-[6px] rounded-lg border-[0.5px] border-solid border-borderBottomConnectedCard bg-white p-2"
        onClick={() => {
          showPopup ? setShowPopup(false) : setShowPopup(true);
        }}
      >
        <div className="relative mr-[6px]">
          <Validate className="absolute right-[-6px] bottom-[-2px] " />
          <Profile />
        </div>
        {addressDisplayed?.slice(0, 6) + "..." + addressDisplayed?.slice(38)}
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
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => {
            showPopup ? setShowPopup(false) : setShowPopup(true);
          }}
          className=" flex items-center justify-center gap-[6px] rounded-lg border-[0.5px] border-solid border-borderBottomConnectedCard bg-white p-2 hover:cursor-pointer"
        >
          <div className="relative mr-[6px]">
            <Shield className="absolute right-[-6px] bottom-[-2px]" />
            <Profile />
          </div>

          <Arrow className={`${showPopup && "rotate-180"}`} />
        </button>
      ))}
    </div>
  );
};

export default ConnectButton;
