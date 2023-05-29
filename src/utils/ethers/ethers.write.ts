import { ethers } from "ethers";
import { abiDiamond } from "../constants/abi/Diamond";
import { addressDai } from "../constants/address/Dai";
import { addressDiamond } from "../constants/address/Diamond";

export const transferDai = async (
  signer: ethers.providers.JsonRpcSigner,
  to: string,
  amount: number
) => {
  try {
    const dai_Contract = await new ethers.Contract(
      addressDai,
      abiDiamond,
      signer
    );
    return dai_Contract.transfer(to, amount);
  } catch (error) {
    throw new Error("transfer failed : " + error);
  }
};

export const approveDai = async (
  signer: ethers.providers.JsonRpcSigner,
  spender: string,
  amount: number
) => {
  try {
    const dai_Contract = await new ethers.Contract(
      addressDai,
      abiDiamond,
      signer
    );
    return dai_Contract.approve(spender, amount);
  } catch (error) {
    throw new Error("transfer failed : " + error);
  }
};

export const underlyingToFiDiamond = async (
  erc20address: string,
  fiAssetAddress: string,
  signer: ethers.providers.JsonRpcSigner,
  depositAmount: ethers.BigNumber,
  minAmountOut: ethers.BigNumber,
  currentWalletAddress: string,
  referral: string
) => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );

    const erc20_Contract = await new ethers.Contract(
      erc20address,
      abiDiamond,
      signer
    );
    const approveTX = await erc20_Contract.approve(
      addressDiamond,
      depositAmount
    );
    await approveTX.wait();

    return diamond_Contract.underlyingToFi(
      depositAmount,
      minAmountOut,
      fiAssetAddress,
      currentWalletAddress,
      currentWalletAddress,
      referral
    );
  } catch (error) {
    throw new Error("underlyingToFi failed : " + error);
  }
};

export const fiToUnderlyingDiamond = async (
  signer: ethers.providers.JsonRpcSigner,
  depositAmount: ethers.BigNumber,
  minAmountOut: ethers.BigNumber,
  fiAssetAddress: string,
  currentWalletAddress: string
) => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    return diamond_Contract.fiToUnderlying(
      depositAmount,
      minAmountOut,
      fiAssetAddress,
      currentWalletAddress,
      currentWalletAddress
    );
  } catch (error) {
    throw new Error("fiToUnderlying failed : " + error);
  }
};
