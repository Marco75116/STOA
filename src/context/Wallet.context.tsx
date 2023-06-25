import { ethers } from "ethers";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GlobalConstants } from "../utils/types/global.types";
import apiKYC from "../utils/services/apiSumsub";
import {
  ApplicantData,
  ApplicantDataApi,
  Review,
} from "../utils/types/sumsub.types";
import { getKycDone } from "../utils/helpers/global.helper";
import { useAccount, useContractReads } from "wagmi";
import { DiamondContract } from "../utils/constants/wagmiConfig/wagmiConfig";
import { addressUSDCOFI } from "../utils/constants/address/addressesCOFI/USDCOFI";
import { addressETHCOFI } from "../utils/constants/address/addressesCOFI/ETHCOFI";
import { addressBTCCOFI } from "../utils/constants/address/addressesCOFI/BTCCOFI";
import { decimalUSDC } from "../utils/constants/address/USDC";
import { decimalBTC } from "../utils/constants/address/wBTC";
import apiOffChain from "../utils/services/apiOffChain";
import { AxiosResponse } from "axios";

type WalletContextProps = {
  constants: GlobalConstants;
  review: Review | undefined;
  applicantExist: boolean | undefined;
  applicantData: ApplicantData | undefined;
  isOpenWallet: boolean;
  setIsOpenWallet: Function;
  kycDone: boolean | undefined;
  registrationDone: boolean;
};

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletContext = createContext({} as WalletContextProps);

const WalletProvider = ({ children }: WalletProviderProps) => {
  const [applicantData, setApplicationData] = useState<
    ApplicantData | undefined
  >();
  const [review, setReview] = useState<Review | undefined>();
  const [applicantExist, setApplicantExist] = useState<boolean | undefined>();

  const [isOpenWallet, setIsOpenWallet] = useState<boolean>(false);
  const [registrationDone, setRegistrationDone] = useState<boolean>(false);

  const [constants, setConstants] = useState<GlobalConstants>({
    feeCollectorStatus: undefined,
    points: undefined,
    redeemEnabled: undefined,
    redeemFee: undefined,
    mintEnabled: undefined,
    mintFee: undefined,
    minDepositUSDFI: undefined,
    minDepositETHFI: undefined,
    minDepositBTCFI: undefined,
    minWithdrawUSDFI: undefined,
    minWithdrawETHFI: undefined,
    minWithdrawBTCFI: undefined,
  });

  const { isConnected, address } = useAccount();
  const percentageFactor = 10 ** 4;
  const arrayAddressFiTokens = [addressUSDCOFI, addressBTCCOFI, addressETHCOFI];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useContractReads({
    contracts: [
      {
        ...DiamondContract,
        functionName: "getPoints",
        args: [address as `0x${string}`, arrayAddressFiTokens],
      },
      {
        ...DiamondContract,
        functionName: "getRedeemEnabled",
        args: [address as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getRedeemFee",
        args: [addressUSDCOFI],
      },
      {
        ...DiamondContract,
        functionName: "getMintEnabled",
        args: [address as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMintFee",
        args: [addressUSDCOFI],
      },
      {
        ...DiamondContract,
        functionName: "getMinDeposit",
        args: [addressUSDCOFI as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMinDeposit",
        args: [addressETHCOFI as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMinDeposit",
        args: [addressBTCCOFI as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMinWithdraw",
        args: [addressUSDCOFI as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMinWithdraw",
        args: [addressETHCOFI as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMinWithdraw",
        args: [addressBTCCOFI as `0x${string}`],
      },
    ],
    watch: true,
    onSuccess(data: any) {
      setConstants({
        feeCollectorStatus: false,
        points: Number(ethers.utils.formatEther(data[0].result)),
        redeemEnabled: data[1].result,
        redeemFee:
          Number(ethers.utils.formatUnits(data[2].result, "wei")) /
          percentageFactor,
        mintEnabled: data[3].result,
        mintFee:
          Number(ethers.utils.formatUnits(data[4].result, "wei")) /
          percentageFactor,
        minDepositUSDFI: Number(
          ethers.utils.formatUnits(data[5].result, decimalUSDC)
        ),
        minDepositETHFI: Number(ethers.utils.formatEther(data[6].result)),
        minDepositBTCFI: Number(
          ethers.utils.formatUnits(data[7].result, decimalBTC)
        ),
        minWithdrawUSDFI: Number(
          ethers.utils.formatUnits(data[8].result, decimalUSDC)
        ),
        minWithdrawETHFI: Number(ethers.utils.formatEther(data[9].result)),
        minWithdrawBTCFI: Number(
          ethers.utils.formatUnits(data[10].result, decimalBTC)
        ),
      });
    },
    enabled: isConnected,
  });

  const getApplicantData = async () => {
    const applicantData = await apiKYC.getApplicantData({
      externalUserId: address,
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
    if (isConnected && address) {
      getApplicantData().then((applicantData) => {
        checkApplicant(applicantData);
      });
      apiOffChain
        .checkData(address)
        .then((result: AxiosResponse<boolean, any>) => {
          if (result.data) {
            setRegistrationDone(true);
          }
        });
    }
  }, [isConnected]);

  const kycDone: boolean | undefined = useMemo(() => {
    if (isConnected) return getKycDone(review);
  }, [review, isConnected]);

  return (
    <WalletContext.Provider
      value={{
        constants,
        review,
        applicantExist,
        applicantData,
        isOpenWallet,
        setIsOpenWallet,
        kycDone,
        registrationDone,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
