import { ethers } from "ethers";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { m } from "../plugins/magic";

type WalletContextProps = {
  currentWalletAddress: string;
  initMagicWallet: (email: string, address: string) => void;
  disconnectMagic: () => void;
  isWalletConnected: boolean;
  email: string;
  setSigner: Function;
  signer: any;
  provider: any;
  setProvider: Function;
  magicBalance: number;
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
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>();
  const [magicBalance, setMagicBalance] = useState<number>(0);

  const initMagicWallet = async (email: string, address: string) => {
    setEmail(email);
    setIsWalletConnected(true);
    setCurrentWalletAddress(address);
  };

  const disconnectMagic = async () => {
    m.user.logout();
    setIsWalletConnected(false);
    setCurrentWalletAddress("");
  };

  const getbalanceMagic = async () => {
    if (provider) {
      const balance = await provider.getBalance(currentWalletAddress);
      const balanceInEth = ethers.utils.formatEther(balance);
      setMagicBalance(Number(balanceInEth));
    }
  };

  useEffect(() => {
    setProvider(
      new ethers.providers.JsonRpcProvider(
        "https://rpc.ankr.com/polygon_mumbai"
      )
    );
  }, []);

  useEffect(() => {
    getbalanceMagic();
  }, [isWalletConnected, signer]);

  return (
    <WalletContext.Provider
      value={{
        isWalletConnected,
        currentWalletAddress,
        initMagicWallet,
        disconnectMagic,
        email,
        setSigner,
        signer,
        provider,
        setProvider,
        magicBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
