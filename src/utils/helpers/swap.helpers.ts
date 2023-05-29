import { addressUSDCOFI } from "../constants/address/addressesCOFI/USDCOFI";
// import { addressDai } from "../constants/address/Dai";
import { getBalanceERC20 } from "../ethers/ethers.view";
import {
  CoinBalances,
  CoinPrices,
  HistoryYield,
  TokenName,
} from "../types/swap.types";
import { ethers } from "ethers";
import { addressUSDC, decimalUSDC } from "../constants/address/USDC";
import { addresswETH } from "../constants/address/wETH";
import { addresswBTC, decimalBTC } from "../constants/address/wBTC";
import { addressETHCOFI } from "../constants/address/addressesCOFI/ETHCOFI";
import { addressBTCCOFI } from "../constants/address/addressesCOFI/BTCCOFI";
import axios from "axios";

export const getBalances = async (
  signer: ethers.providers.JsonRpcSigner,
  currentWalletAddress: string
): Promise<CoinBalances> => {
  try {
    // const daiBalance = await getBalanceERC20(
    //   signer,
    //   currentWalletAddress,
    //   addressDai
    // );
    const cofiBalance = await getBalanceERC20(
      signer,
      currentWalletAddress,
      addressUSDCOFI
    );

    const usdcBalance = await getBalanceERC20(
      signer,
      currentWalletAddress,
      addressUSDC
    );

    const ethBalance = await getBalanceERC20(
      signer,
      currentWalletAddress,
      addresswETH
    );

    const btcBalance = await getBalanceERC20(
      signer,
      currentWalletAddress,
      addresswBTC
    );

    const ethFIBalance = await getBalanceERC20(
      signer,
      currentWalletAddress,
      addressETHCOFI
    );

    const btcFIBalance = await getBalanceERC20(
      signer,
      currentWalletAddress,
      addressBTCCOFI
    );

    return {
      USDC: Number(ethers.utils.formatUnits(usdcBalance || 0, decimalUSDC)),
      DAI: 0,
      USDFI: Number(ethers.utils.formatUnits(cofiBalance || 0)),
      ETH: Number(ethers.utils.formatUnits(ethBalance || 0)),
      BTC: Number(ethers.utils.formatUnits(btcBalance || 0, decimalBTC)),
      ETHFI: Number(ethers.utils.formatUnits(ethFIBalance || 0)),
      BTCFI: Number(ethers.utils.formatUnits(btcFIBalance || 0)),
    };
  } catch (error) {
    throw new Error("getBalances : " + error);
  }
};

export const getPrices = async (): Promise<CoinPrices> => {
  const usdcPrice = await axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd"
    )
    .then((response) => {
      return response.data["usd-coin"].usd;
    })
    .catch((err) => {
      throw new Error(err);
    });

  const ethPrice = await axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
    .then((response) => {
      return response.data.ethereum.usd;
    })
    .catch((err) => {
      throw new Error(err);
    });

  const btcPrice = await axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    )
    .then((response) => {
      return response.data.bitcoin.usd;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return {
    USDC: usdcPrice,
    DAI: 1,
    USDFI: usdcPrice,
    ETH: ethPrice,
    BTC: btcPrice,
    ETHFI: ethPrice,
    BTCFI: btcPrice,
  };
};

export const getReceiveAmount = (
  depositAmount: number,
  fee: number | undefined
): number | undefined => {
  try {
    if (fee !== undefined)
      return Number((depositAmount * (1 - fee)).toFixed(3));
  } catch (error) {
    throw new Error("Error : " + error);
  }
};

export const getHistoryYieldArray = (
  historyYieldArray: HistoryYield[],
  tokenName: TokenName
) => {
  const historyYieldArrayAsset = historyYieldArray.map(
    (historyYiel: HistoryYield) => {
      const { day, amountUSDFI, amountETHFI, amountBTCFI, id } = historyYiel;
      return {
        id,
        day,
        amount:
          tokenName === "USDFI"
            ? amountUSDFI
            : tokenName === "ETHFI"
            ? amountETHFI
            : amountBTCFI,
      };
    }
  );

  return historyYieldArrayAsset;
};
