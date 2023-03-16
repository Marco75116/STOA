import React, { createContext, ReactNode, useState } from "react";

type WalletContextProps = {
  currentWalletAddress: string;
  initWallet: () => void;
  disconnect: () => void;
  isWalletConnected: boolean;
};

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletContext = createContext({} as WalletContextProps);

const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");

  const initWallet = async () => {};

  const disconnect = async () => {
    setIsWalletConnected(false);
    setCurrentWalletAddress("");
  };

  return (
    <WalletContext.Provider
      value={{
        isWalletConnected,
        currentWalletAddress,
        initWallet,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
