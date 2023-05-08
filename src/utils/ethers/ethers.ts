import { ethers } from "ethers";
import { abiDiamond } from "../constants/abi/Diamond";
import { addressDai } from "../constants/address/Dai";
import { addressDiamond } from "../constants/address/Diamond";
import { addressCOFI } from "../constants/address/COFI";
import { addressYVDai } from "../constants/address/yvDai";

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

    const dai_Contract = await new ethers.Contract(
      addressDai,
      abiDiamond,
      signer
    );
    const approveTX = await dai_Contract.approve(addressYVDai, depositAmount);
    await approveTX.wait();

    return diamond_Contract.underlyingToFi(
      depositAmount,
      minAmountOut,
      addressCOFI,
      currentWalletAddress,
      currentWalletAddress
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
      addressCOFI,
      currentWalletAddress,
      currentWalletAddress
    );
  } catch (error) {
    throw new Error("fiToUnderlying failed : " + error);
  }
};

export const getBalanceERC20 = async (
  signer: ethers.providers.JsonRpcSigner,
  currentWalletAddress: string,
  erc20_address: string
): Promise<ethers.BigNumber | undefined> => {
  try {
    if (currentWalletAddress !== "") {
      const erc20_Contract = await new ethers.Contract(
        erc20_address,
        abiDiamond,
        signer
      );
      const DaiBalance = await erc20_Contract.balanceOf(currentWalletAddress);

      return DaiBalance;
    }
  } catch (error) {
    throw new Error("getBalanceERC20 failed : " + error);
  }
};

export const getMinWithdraw = async (
  signer: ethers.providers.JsonRpcSigner
) => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const minWithdraw = diamond_Contract.getMinWithdraw(addressCOFI);
    return minWithdraw;
  } catch (error) {
    throw new Error("getMinWithdraw failed : " + error);
  }
};

export const getMinDeposit = async (signer: ethers.providers.JsonRpcSigner) => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const minDeposit = diamond_Contract.getMinDeposit(addressCOFI);
    return minDeposit;
  } catch (error) {
    throw new Error("getMinDeposit failed : " + error);
  }
};

export const getMintFee = async (signer: ethers.providers.JsonRpcSigner) => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const mintFee = diamond_Contract.getMintFee(addressCOFI);
    return mintFee;
  } catch (error) {
    throw new Error("getMintFee failed : " + error);
  }
};

export const getMintEnabled = async (
  signer: ethers.providers.JsonRpcSigner
) => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const mintEnabled = diamond_Contract.getMintEnabled(addressCOFI);
    return mintEnabled;
  } catch (error) {
    throw new Error("getMintEnabled failed : " + error);
  }
};

export const getRedeemFee = async (signer: ethers.providers.JsonRpcSigner) => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const redeemFee = diamond_Contract.getRedeemFee(addressCOFI);
    return redeemFee;
  } catch (error) {
    throw new Error("getRedeemFee failed : " + error);
  }
};

export const getRedeemEnabled = async (
  signer: ethers.providers.JsonRpcSigner
) => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const redeemEnabled = diamond_Contract.getRedeemEnabled(addressCOFI);
    return redeemEnabled;
  } catch (error) {
    throw new Error("getRedeemEnabled failed : " + error);
  }
};

export const getPointsRate = async (signer: ethers.providers.JsonRpcSigner) => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const pointsRate = diamond_Contract.getPointsRate(addressCOFI);
    return pointsRate;
  } catch (error) {
    throw new Error("getPointsRate failed : " + error);
  }
};
