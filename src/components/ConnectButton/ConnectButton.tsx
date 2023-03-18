/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import { WalletContext } from "../../context/Wallet.context";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow.svg";
import { ReactComponent as Profile } from "../../assets/icons/profile.svg";
import { ReactComponent as Shield } from "../../assets/icons/Shield.svg";
import { ReactComponent as Validate } from "../../assets/icons/Validate.svg";

const ConnectButton = () => {
  // const { initWallet, isWalletConnected, currentWalletAddress,  } =
  //   useContext(WalletContext);

  // const handleConnection = () => {
  //   isWalletConnected ? disconnect() : initWallet();
  // };
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div className=" flex items-center justify-center gap-[6px] rounded-lg border-[0.5px] border-solid border-borderBottomConnectedCard bg-white p-2">
        <div className="relative mr-[6px]">
          <Validate className="absolute right-[-6px] bottom-[-2px] " />
          <Profile />
        </div>
        {address?.slice(0, 6) + "..." + address?.slice(38)}
        <Arrow
          className={` hover:cursor-pointer ${showPopup && "rotate-180"}`}
          onClick={() => {
            showPopup ? setShowPopup(false) : setShowPopup(true);
          }}
        />
        {/* <button onClick={() => disconnect()}>Disconnect</button> */}
      </div>
    );

  return (
    // <div className="flex flex-row gap-2 ">
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          className=" flex items-center justify-center gap-[6px] rounded-lg border-[0.5px] border-solid border-borderBottomConnectedCard bg-white p-2 hover:cursor-pointer"
        >
          {/* {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"} */}

          <div className="relative mr-[6px]">
            <Shield className="absolute right-[-6px] bottom-[-2px]" />
            <Profile />
          </div>

          <Arrow
            className={`${showPopup && "rotate-180"}`}
            onClick={() => {
              showPopup ? setShowPopup(false) : setShowPopup(true);
            }}
          />
        </button>
      ))}
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default ConnectButton;
