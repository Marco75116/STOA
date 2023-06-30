import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { optimism } from "viem/chains";
import { useNetwork, useSwitchNetwork } from "wagmi";

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
  const [showTransak, setShowTransak] = useState<boolean>(false);
  const [isOpenModalSwap, setIsOpenModalSwap] = useState<boolean>(false);
  const [action, setAction] = useState<0 | 1>(0);

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  useEffect(() => {
    if (chain?.id !== 10) switchNetwork?.(optimism.id);
  }, [chain]);

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
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
