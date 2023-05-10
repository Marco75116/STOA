import { addressCOFI } from "../constants/address/COFI";
import { addressDai } from "../constants/address/Dai";
import { getBalanceERC20 } from "../ethers/ethers.view";
import { CoinBalances, CoinPrices } from "../types/swap.types";
import { ethers } from "ethers";

export const getBalances = async (
  signer: ethers.providers.JsonRpcSigner,
  currentWalletAddress: string
): Promise<CoinBalances> => {
  try {
    const daiBalance = await getBalanceERC20(
      signer,
      currentWalletAddress,
      addressDai
    );
    const cofiBalance = await getBalanceERC20(
      signer,
      currentWalletAddress,
      addressCOFI
    );

    return {
      DAI: Number(ethers.utils.formatUnits(daiBalance || 0)),
      COFI: Number(ethers.utils.formatUnits(cofiBalance || 0)),
    };
  } catch (error) {
    throw new Error("getBalances : " + error);
  }
};

export const getPrices = (): CoinPrices => {
  return {
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
