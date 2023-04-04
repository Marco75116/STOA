import { Popover, Transition } from "@headlessui/react";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import { ReactComponent as Explore } from "../../assets/icons/Explore.svg";
import { ReactComponent as Warning } from "../../assets/icons/Warning.svg";
import { ReactComponent as Disconnect } from "../../assets/icons/Disconnect.svg";
import { ReactComponent as Wallet } from "../../assets/icons/Wallet.svg";
import { ReactComponent as Mail } from "../../assets/icons/Mail.svg";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { fetchBalance } from "@wagmi/core";
import axios from "axios";
import { WalletContext } from "../../context/Wallet.context";

type DropdownProps = {
  setOpenMagic: Function;
};

const Dropdown: FC<DropdownProps> = ({ setOpenMagic }) => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState<number>(0);
  const [priceEth, setPriceEth] = useState<number>(0);

  const { email } = useContext(WalletContext);

  const getBalance = () => {
    if (address) {
      fetchBalance({
        address: address,
      }).then((balance) => {
        setBalance(Number(balance.formatted));
      });
    } else {
      setBalance(0);
    }
  };

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
    getBalance();
    getConvertedPrice();
  }, [isConnected, address]);

  const connector = new MetaMaskConnector();

  return (
    <div className="">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
              text-black group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <ConnectButton />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {!isConnected ? (
                <Popover.Panel className="absolute z-10 mt-3 h-[272px] w-[260px] translate-x-[-70%] transform px-4 sm:px-0 lg:max-w-3xl">
                  <div className="ring-black overflow-hidden rounded-lg shadow-lg ring-opacity-5">
                    <div className="relative flex grid  gap-[6px] bg-white p-3 lg:grid-cols-1">
                      <div className=" h-[48px] p-3 text-base font-normal">
                        My Profile
                      </div>
                      <div className="flex h-[64px] items-center justify-between bg-yellow px-[12px] py-[10px] text-base font-normal">
                        <div>
                          <p>Vérification Center</p>
                          <p>Complete Verification</p>
                        </div>
                        <Warning />
                      </div>
                      <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                      <div className="flex h-[48px] items-center justify-between p-3 text-base font-normal">
                        Explore
                        <Explore
                          className="hover:cursor-pointer"
                          onClick={() =>
                            window.open(
                              `https://mumbai.polygonscan.com/address/${address}`,
                              "_blank"
                            )
                          }
                        />
                      </div>
                      <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                      <div
                        className="flex h-[48px] items-center justify-center rounded-lg  bg-magicWallet p-3 text-base font-normal text-white hover:cursor-pointer
                      "
                        onClick={() => {
                          setOpenMagic(true);
                          close();
                        }}
                      >
                        Magic Wallet
                      </div>
                      <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                      <div
                        className="flex h-[48px] items-center justify-center rounded-lg bg-pink p-3 text-base font-normal text-white hover:cursor-pointer
                      "
                        onClick={() => {
                          connect({ connector });
                          close();
                        }}
                      >
                        Connect Wallet
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              ) : (
                <Popover.Panel className="absolute z-10 mt-3 h-[272px] w-[260px]  translate-x-[-30%] transform px-4 sm:px-0 lg:max-w-3xl">
                  <div className="ring-black overflow-hidden rounded-lg shadow-lg ring-opacity-5">
                    <div className="relative flex grid  gap-[6px] bg-white p-3 lg:grid-cols-1">
                      <div className="flex h-[140px] w-[236px] flex-col rounded-lg border-[0.5px] border-solid border-bgCardNavbar bg-ethBalance">
                        <div className="flex h-[52px] flex-row items-center justify-center gap-[12px]">
                          <Wallet />
                          <div>
                            {address?.slice(0, 6) + "..." + address?.slice(38)}
                          </div>
                        </div>
                        {email && (
                          <div className="flex h-[52px] flex-row items-center justify-center gap-[12px]">
                            <Mail />
                            <div>{email}</div>
                          </div>
                        )}
                        <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                        <div className=" flex h-[88px] flex-col items-center justify-center">
                          <div className="text-3xl font-bold">
                            {balance.toFixed(3)} ETH
                          </div>
                          <div>${(balance * priceEth).toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex h-[48px] items-center justify-between p-3 text-base font-normal">
                        My Profile
                      </div>
                      <div className="flex h-[48px] items-center justify-between p-3 text-base font-normal">
                        Verification Center
                      </div>
                      <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                      <div className="flex h-[48px] items-center justify-between p-3 text-base font-normal">
                        Explore
                        <Explore
                          className="hover:cursor-pointer"
                          onClick={() =>
                            window.open(
                              `https://mumbai.polygonscan.com/address/${address}`,
                              "_blank"
                            )
                          }
                        />
                      </div>
                      <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
                      <div
                        className="flex h-[48px] items-center justify-between p-3 text-base font-normal hover:cursor-pointer"
                        onClick={() => disconnect()}
                      >
                        Disconnect
                        <Disconnect />
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              )}
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default Dropdown;
