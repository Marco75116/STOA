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
import { useAccount } from "wagmi";
import apiOffChain from "../utils/services/apiOffChain";
import { AxiosResponse } from "axios";
import useViewDiamond from "../utils/Hook/useViewDiamond";

type WalletContextProps = {
  constants: GlobalConstants;
  review: Review | undefined;
  applicantExist: boolean | undefined;
  applicantData: ApplicantData | undefined;
  isOpenWallet: boolean;
  setIsOpenWallet: Function;
  kycDone: boolean | undefined;
  registrationDone: boolean;
  setRegistrationDone: Function;
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
  const [registrationDone, setRegistrationDone] = useState<boolean>(true);

  const { isConnected, address } = useAccount();
  const { constants } = useViewDiamond();

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
          if (!result.data) {
            setRegistrationDone(false);
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
        setRegistrationDone,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
