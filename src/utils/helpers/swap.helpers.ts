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
import { addressUSDC } from "../constants/address/USDC";

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

    return {
      USDC: Number(ethers.utils.formatUnits(usdcBalance || 0)),
      DAI: 0,
      COFI: Number(ethers.utils.formatUnits(cofiBalance || 0)),
    };
  } catch (error) {
    throw new Error("getBalances : " + error);
  }
};

export const getPrices = (): CoinPrices => {
  return {
    USDC: 1,
    DAI: 1,
    COFI: 1,
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
