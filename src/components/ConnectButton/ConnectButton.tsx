/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import { WalletContext } from "../../context/Wallet.context";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const ConnectButton = () => {
  // const { initWallet, isWalletConnected, currentWalletAddress,  } =
  //   useContext(WalletContext);

  // const handleConnection = () => {
  //   isWalletConnected ? disconnect() : initWallet();
  // };

  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  // return (
  //   <button
  //     className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
  //     onClick={handleConnection}
  //   >
  //     {isWalletConnected ? currentWalletAddress : "Connect Wallet"}
  //   </button>
  // );
  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  return (
    <div className="flex flex-row gap-2 ">
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 "
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default ConnectButton;
