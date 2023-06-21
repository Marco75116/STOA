import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { CoinsString, Coins, TokenSelected } from "../utils/types/swap.types";
import { addressDai } from "../utils/constants/address/Dai";
import { addressUSDC, decimalUSDC } from "../utils/constants/address/USDC";
import { addresswETH, decimalETH } from "../utils/constants/address/wETH";
import { addresswBTC, decimalBTC } from "../utils/constants/address/wBTC";
import { addressUSDCOFI } from "../utils/constants/address/addressesCOFI/USDCOFI";
import {
  addressETHCOFI,
  decimalsFI,
} from "../utils/constants/address/addressesCOFI/ETHCOFI";
import { addressBTCCOFI } from "../utils/constants/address/addressesCOFI/BTCCOFI";
import { useAccount, useContractReads } from "wagmi";
import { abiDiamond } from "../utils/constants/abi/Diamond";
import { ethers } from "ethers";
import { getPrices } from "../utils/helpers/swap.helpers";

type SwapContextProps = {
  tokenSelected: TokenSelected;
  setTokenSelected: Function;
  addressesTokens: CoinsString;
  decimalsTokens: Coins;
  pricesCoins: Coins;
  balanceCoins: Coins;
  convertTokenList: CoinsString;
};

type SwapProviderProps = {
  children: ReactNode;
};

export const SwapContext = createContext({} as SwapContextProps);

const SwapProvider: FC<SwapProviderProps> = ({ children }) => {
  const [tokenSelected, setTokenSelected] = useState<TokenSelected>("USDC");
  const [pricesCoins, setPricesCoins] = useState<Coins>({
    DAI: 0,
    USDFI: 0,
    USDC: 0,
    ETH: 0,
    BTC: 0,
    ETHFI: 0,
    BTCFI: 0,
  });

  const [balanceCoins, setBalanceCoins] = useState<Coins>({
    DAI: 0,
    USDFI: 0,
    USDC: 0,
    ETH: 0,
    BTC: 0,
    ETHFI: 0,
    BTCFI: 0,
  });

  const addressesTokens: CoinsString = {
    DAI: addressDai,
    USDC: addressUSDC,
    ETH: addresswETH,
    BTC: addresswBTC,
    USDFI: addressUSDCOFI,
    ETHFI: addressETHCOFI,
    BTCFI: addressBTCCOFI,
  };

  const decimalsTokens: Coins = {
    DAI: 0,
    USDFI: decimalsFI,
    USDC: decimalUSDC,
    ETH: decimalETH,
    BTC: decimalBTC,
    ETHFI: decimalsFI,
    BTCFI: decimalsFI,
  };

  const convertTokenList: CoinsString = {
    USDC: "USDFI",
    ETH: "ETHFI",
    BTC: "BTCFI",
    DAI: "DAI",
    USDFI: "USDC",
    ETHFI: "ETH",
    BTCFI: "BTC",
  };

  const { address, isConnected } = useAccount();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useContractReads({
    contracts: [
      {
        address: addressUSDC as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: addressUSDCOFI as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: addresswETH as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: addresswBTC as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: addressETHCOFI as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: addressBTCCOFI as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
    ],
    onSuccess(data: any) {
      setBalanceCoins({
        USDC: Number(
          ethers.utils.formatUnits(data[0].result || 0, decimalUSDC)
        ),
        DAI: 0,
        USDFI: Number(ethers.utils.formatUnits(data[1].result || 0)),
        ETH: Number(ethers.utils.formatUnits(data[2].result || 0)),
        BTC: Number(ethers.utils.formatUnits(data[3].result || 0, decimalBTC)),
        ETHFI: Number(ethers.utils.formatUnits(data[4].result || 0)),
        BTCFI: Number(ethers.utils.formatUnits(data[5].result || 0)),
      });
    },
    enabled: isConnected,
  });

  useEffect(() => {
    if (isConnected) {
      getPrices().then((prices: Coins) => {
        setPricesCoins(prices);
      });
    }
  }, [isConnected]);

  return (
    <SwapContext.Provider
      value={{
        tokenSelected,
        setTokenSelected,
        addressesTokens,
        decimalsTokens,
        pricesCoins,
        balanceCoins,
        convertTokenList,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
};

export default SwapProvider;
