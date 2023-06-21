import { Popover, Transition } from "@headlessui/react";
import {
  FC,
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import { ReactComponent as Explore } from "../../assets/icons/Explore.svg";
import { ReactComponent as Warning } from "../../assets/icons/Warning.svg";
import { ReactComponent as Disconnect } from "../../assets/icons/Disconnect.svg";
import { ReactComponent as Wallet } from "../../assets/icons/Wallet.svg";
// import { ReactComponent as Mail } from "../../assets/icons/Mail.svg";
import axios from "axios";
import { WalletContext } from "../../context/Wallet.context";
import { useNavigate } from "react-router-dom";
import { copyToClipboard, getKycDone } from "../../utils/helpers/global.helper";
import { useAccount, useBalance, useDisconnect } from "wagmi";

type DropdownProps = {};

const Dropdown: FC<DropdownProps> = () => {
  const [priceEth, setPriceEth] = useState<number>(0);
  const dRef = useRef<HTMLButtonElement>(null);

  function toggle() {
    dRef.current?.click();
  }

  const { isOpenWallet, review } = useContext(WalletContext);
  const { isConnected, address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const { disconnect } = useDisconnect();

  const navigate = useNavigate();

  const getConvertedPrice = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      )
      .then(function (response) {
        setPriceEth(response.data.ethereum.usd);
      });
  };

  useEffect(() => {
    getConvertedPrice();
  }, []);

  const kycDone = useMemo(() => {
    return getKycDone(review);
  }, [review]);

  return (
    <div className="">
      <Popover className="relative">
        {({ open, close }) => {
          useEffect(() => {
            toggle();
          }, [isOpenWallet]);

          return (
            <>
              <Popover.Button
                ref={dRef}
                className={`
                ${open ? "" : "text-opacity-90"}
              group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <ConnectButton />
              </Popover.Button>

              {open && (
                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  {isConnected && (
                    <Popover.Panel
                      static
                      className="absolute z-10 mt-3 h-[272px] w-[260px]  translate-x-[-30%] transform px-4 sm:px-0 lg:max-w-3xl"
                    >
                      <div className="overflow-hidden rounded-lg shadow-lg ring-black ring-opacity-5">
                        <div className="relative flex grid  gap-[6px] bg-white p-3 lg:grid-cols-1">
                          <div className="flex h-[140px] w-[236px] flex-col rounded-lg border-[0.5px] border-solid border-bgCardNavbar bg-ethBalance">
                            <div className="flex h-[52px] flex-row items-center justify-center gap-[12px]">
                              <Wallet />
                              <div
                                className=" cursor-pointer"
                                onClick={() =>
                                  copyToClipboard("currentWalletAddress")
                                }
                              >
                                {address?.slice(0, 6) +
                                  "..." +
                                  address?.slice(38)}
                              </div>
                            </div>
                            {/* {email && (
                              <div className="flex h-[52px] flex-row items-center justify-center gap-[12px]">
                                <Mail />
                                <div>{email}</div>
                              </div>
                            )} */}
                            <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                            <div className=" flex h-[88px] flex-col items-center justify-center">
                              <div className="text-3xl font-bold">
                                {Number(data?.formatted).toFixed(3)} ETH
                              </div>
                              <div>
                                $
                                {(Number(data?.formatted) * priceEth).toFixed(
                                  2
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex h-[48px] items-center justify-between p-3 text-base font-normal">
                            My Profile
                          </div>

                          <div
                            className={`flex max-h-[64px] items-center justify-between  px-[12px] py-[10px] text-base font-normal hover:cursor-pointer ${
                              !kycDone && " bg-yellow"
                            }`}
                            onClick={() => navigate("/KYC")}
                          >
                            <div>
                              {!kycDone ? (
                                <>
                                  <p>Vérification Center</p>
                                  <p>Complete Verification</p>
                                </>
                              ) : (
                                <p>KYC verified </p>
                              )}
                            </div>
                            {!kycDone && <Warning />}
                          </div>
                          <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                          <div className="flex h-[48px] items-center justify-between p-3 text-base font-normal">
                            Explore
                            <Explore
                              className="hover:cursor-pointer"
                              onClick={() =>
                                window.open(
                                  `https://optimistic.etherscan.io/address/${address}`,
                                  "_blank"
                                )
                              }
                            />
                          </div>
                          <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                          <div
                            className="flex h-[48px] items-center justify-between p-3 text-base font-normal hover:cursor-pointer"
                            onClick={() => {
                              disconnect();
                              close();
                            }}
                          >
                            Disconnect
                            <Disconnect />
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  )}
                </Transition>
              )}
            </>
          );
        }}
      </Popover>
    </div>
  );
};

export default Dropdown;
