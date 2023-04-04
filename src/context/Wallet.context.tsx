import React, { createContext, ReactNode, useState } from "react";

type WalletContextProps = {
  currentWalletAddress: string;
  initMagicWallet: (email: string) => void;
  disconnect: () => void;
  isWalletConnected: boolean;
  email: string;
  setSigner: Function;
  signer: any;
  provider: any;
  setProvider: Function;
};

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletContext = createContext({} as WalletContextProps);

const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");
  const [email, setEmail] = useState<string>("");
  const [signer, setSigner] = useState();
  const [provider, setProvider] = useState();

  const initMagicWallet = async (email: string) => {
    setEmail(email);
  };

  const disconnect = async () => {
    setIsWalletConnected(false);
    setCurrentWalletAddress("");
  };

  return (
    <WalletContext.Provider
      value={{
        isWalletConnected,
        currentWalletAddress,
        initMagicWallet,
        disconnect,
        email,
        setSigner,
        signer,
        provider,
        setProvider,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
