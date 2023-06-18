import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
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
import { getBalances, getPrices } from "../utils/helpers/swap.helpers";
import { WalletContext } from "./Wallet.context";

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

  const { signer, currentWalletAddress } = useContext(WalletContext);

  useEffect(() => {
    if (signer && currentWalletAddress) {
      getBalances(signer, currentWalletAddress).then((balances: Coins) =>
        setBalanceCoins(balances)
      );
      getPrices().then((prices: Coins) => {
        setPricesCoins(prices);
      });
    }
  }, [signer, currentWalletAddress]);

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
