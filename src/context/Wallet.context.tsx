import { ethers } from "ethers";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { m } from "../plugins/magic";
import { getConstants } from "../utils/helpers/constant.helper";
import { GlobalConstants } from "../utils/types/global.types";
import api from "../utils/service/apiSumsub";
import {
  ApplicantData,
  ApplicantDataApi,
  Review,
} from "../utils/types/sumsub.types";
import { getKycDone } from "../utils/helpers/global.helper";

type WalletContextProps = {
  currentWalletAddress: string;
  initMagicWallet: (email: string, address: string) => void;
  disconnect: () => void;
  isWalletConnected: boolean;
  email: string;
  setSigner: Function;
  signer: ethers.providers.JsonRpcSigner | undefined;
  provider: any;
  setProvider: Function;
  magicBalance: number;
  balance: number;
  getConnectedWalletMetamask: () => void;
  constants: GlobalConstants;
  review: Review | undefined;
  applicantExist: boolean | undefined;
  applicantData: ApplicantData | undefined;
  isOpenWallet: boolean;
  setIsOpenWallet: Function;
  kycDone: boolean;
};

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletContext = createContext({} as WalletContextProps);

const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");
  const [email, setEmail] = useState<string>("");
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>();
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >();
  const [magicBalance, setMagicBalance] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [walletType, setWalletType] = useState<
    "Magic" | "Metamask" | undefined
  >();
  const [applicantData, setApplicationData] = useState<
    ApplicantData | undefined
  >();
  const [review, setReview] = useState<Review | undefined>();
  const [applicantExist, setApplicantExist] = useState<boolean | undefined>();

  const [isOpenWallet, setIsOpenWallet] = useState<boolean>(false);

  const [constants, setConstants] = useState<GlobalConstants>({
    feeCollectorStatus: undefined,
    pointsRate: undefined,
    redeemEnabled: undefined,
    redeemFee: undefined,
    mintEnabled: undefined,
    mintFee: undefined,
    minDeposit: undefined,
    minWithdraw: undefined,
  });

  const initMagicWallet = async (email: string, address: string) => {
    setWalletType("Magic");
    setEmail(email);
    setIsWalletConnected(true);
    setCurrentWalletAddress(address);
  };

  const disconnect = async () => {
    if (walletType === "Magic") {
      m.user.logout();
    }
    setIsWalletConnected(false);
    setCurrentWalletAddress("");
    setEmail("");
    setWalletType(undefined);
  };

  const getbalanceMagic = async () => {
    if (provider) {
      const balance = await provider.getBalance(currentWalletAddress);
      const balanceInEth = ethers.utils.formatEther(balance);
      setMagicBalance(Number(balanceInEth));
    }
  };

  const connect = (address: string) => {
    setCurrentWalletAddress(address);
    setIsWalletConnected(true);
  };

  const getConnectedWalletMetamask = async () => {
    const prov = window.ethereum;
    if (prov !== undefined) {
      const provider = new ethers.providers.Web3Provider(prov);
      setProvider(provider);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
      setWalletType("Metamask");
      signer.getAddress().then((address) => {
        connect(address);
        provider
          .getBalance(address)
          .then((balance) =>
            setBalance(parseFloat(ethers.utils.formatEther(balance)))
          );
      });
    }
  };

  useEffect(() => {
    getConnectedWalletMetamask();
  }, []);

  useEffect(() => {
    getbalanceMagic();
    getConstants(signer).then((gConstants) => {
      setConstants(gConstants);
    });
  }, [isWalletConnected, signer]);

  const getApplicantData = async () => {
    const applicantData = await api.getApplicantData({
      externalUserId: currentWalletAddress,
    });

    return applicantData.data;
  };

  const checkApplicant = (applicantData: ApplicantDataApi) => {
    if (applicantData.code) {
      if (applicantData.code === 400) {
        setApplicantExist(false);
      }
    } else {
      setApplicantExist(true);
      setApplicationData(applicantData);
      setReview(applicantData.review);
    }
  };
  useEffect(() => {
    if (currentWalletAddress !== "") {
      getApplicantData().then((applicantData) => {
        checkApplicant(applicantData);
      });
    }
  }, [currentWalletAddress]);

  const kycDone = useMemo(() => {
    return getKycDone(review);
  }, [review, currentWalletAddress]);

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
        magicBalance,
        balance,
        getConnectedWalletMetamask,
        constants,
        review,
        applicantExist,
        applicantData,
        isOpenWallet,
        setIsOpenWallet,
        kycDone,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
