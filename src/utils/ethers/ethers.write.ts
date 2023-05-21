import { ethers } from "ethers";
import { abiDiamond } from "../constants/abi/Diamond";
import { addressDai } from "../constants/address/Dai";
import { addressDiamond } from "../constants/address/Diamond";
import { addressUSDCOFI } from "../constants/address/addressesCOFI/USDCOFI";
import { addressvUSDC } from "../constants/address/vUSDC";
import { addressUSDC } from "../constants/address/USDC";

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
  signer: ethers.providers.JsonRpcSigner,
  depositAmount: ethers.BigNumber,
  minAmountOut: ethers.BigNumber,
  currentWalletAddress: string
) => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );

    const usdc_Contract = await new ethers.Contract(
      addressUSDC,
      abiDiamond,
      signer
    );
    const approveTX = await usdc_Contract.approve(addressvUSDC, depositAmount);
    await approveTX.wait();

    // const dai_Contract = await new ethers.Contract(
    //   addressDai,
    //   abiDiamond,
    //   signer
    // );
    // const approveTX = await dai_Contract.approve(addressYVDai, depositAmount);
    // await approveTX.wait();

    return diamond_Contract.underlyingToFi(
      depositAmount,
      minAmountOut,
      addressUSDCOFI,
      currentWalletAddress,
      currentWalletAddress,
      ethers.constants.AddressZero
    );
  } catch (error) {
    throw new Error("underlyingToFi failed : " + error);
  }
};

export const fiToUnderlyingDiamond = async (
  signer: ethers.providers.JsonRpcSigner,
  depositAmount: ethers.BigNumber,
  minAmountOut: ethers.BigNumber,
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
      addressUSDCOFI,
      currentWalletAddress,
      currentWalletAddress
    );
  } catch (error) {
    throw new Error("fiToUnderlying failed : " + error);
  }
};
