import { AxiosResponse } from "axios";
import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import apiOffChain from "../utils/services/apiOffChain";
import { UserOffChainData } from "../utils/types/global.types";
import { optimism } from "viem/chains";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

type MainContextProps = {
  landingView: string;
  setLandingView: Function;
  setShowContactModal: Function;
  showContactModal: boolean;
  windowWidth: number;
  showModalConnexion: boolean;
  setShowModalConnexion: Function;
  showModalForm: boolean;
  setShowModalForm: Function;
  showTransak: boolean;
  setShowTransak: Function;
  isOpenModalSwap: boolean;
  setIsOpenModalSwap: Function;
  action: 0 | 1;
  setAction: Function;
  showModalModifyForm: boolean;
  setShowModalModifyForm: Function;
  userData: UserOffChainData;
};

type MainProviderProps = {
  children: ReactNode;
};

export const MainContext = createContext({} as MainContextProps);

const MainProvider: FC<MainProviderProps> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [landingView, setLandingView] = useState<"deposit" | "borrow">(
    "deposit"
  );
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [showModalConnexion, setShowModalConnexion] = useState<boolean>(false);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [showModalModifyForm, setShowModalModifyForm] =
    useState<boolean>(false);
  const [showTransak, setShowTransak] = useState<boolean>(false);
  const [isOpenModalSwap, setIsOpenModalSwap] = useState<boolean>(false);
  const [action, setAction] = useState<0 | 1>(0);
  const { isConnected, address } = useAccount();
  const [userData, setUserData] = useState<UserOffChainData>({
    firstName: "",
    lastName: "",
    email: "",
    marketing: false,
    signature: "",
    privacy: false,
  });

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  useEffect(() => {
    if (chain?.id !== 10) switchNetwork?.(optimism.id);
  }, [chain]);

  useEffect(() => {
    if (isConnected) {
      apiOffChain
        .getProfilData(address)
        .then((result: AxiosResponse<UserOffChainData, any>) => {
          const profil: UserOffChainData = result.data;

          setUserData({
            firstName: profil.firstName,
            lastName: profil.lastName,
            email: profil.email,
            marketing: false,
            signature: "",
            privacy: false,
          });
        });
    }
  }, [isConnected]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <MainContext.Provider
      value={{
        landingView,
        setLandingView,
        setShowContactModal,
        showContactModal,
        windowWidth,
        showModalConnexion,
        setShowModalConnexion,
        showModalForm,
        setShowModalForm,
        showTransak,
        setShowTransak,
        isOpenModalSwap,
        setIsOpenModalSwap,
        action,
        setAction,
        showModalModifyForm,
        setShowModalModifyForm,
        userData,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
