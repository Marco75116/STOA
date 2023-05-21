import { ethers } from "ethers";
import { abiDiamond } from "../constants/abi/Diamond";
import { addressDiamond } from "../constants/address/Diamond";
import { addressUSDCOFI } from "../constants/address/addressesCOFI/USDCOFI";

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
): Promise<number> => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const minWithdraw = await diamond_Contract.getMinWithdraw(addressUSDCOFI);
    return minWithdraw;
  } catch (error) {
    throw new Error("getMinWithdraw failed : " + error);
  }
};

export const getMinDeposit = async (
  signer: ethers.providers.JsonRpcSigner
): Promise<number> => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const minDeposit = await diamond_Contract.getMinDeposit(addressUSDCOFI);
    return minDeposit;
  } catch (error) {
    throw new Error("getMinDeposit failed : " + error);
  }
};

export const getMintFee = async (
  signer: ethers.providers.JsonRpcSigner
): Promise<number> => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const mintFee = await diamond_Contract.getMintFee(addressUSDCOFI);
    return mintFee;
  } catch (error) {
    throw new Error("getMintFee failed : " + error);
  }
};

export const getMintEnabled = async (
  signer: ethers.providers.JsonRpcSigner
): Promise<boolean> => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const mintEnabled = await diamond_Contract.getMintEnabled(addressUSDCOFI);
    return mintEnabled;
  } catch (error) {
    throw new Error("getMintEnabled failed : " + error);
  }
};

export const getRedeemFee = async (
  signer: ethers.providers.JsonRpcSigner
): Promise<number> => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const redeemFee = await diamond_Contract.getRedeemFee(addressUSDCOFI);
    return redeemFee;
  } catch (error) {
    throw new Error("getRedeemFee failed : " + error);
  }
};

export const getRedeemEnabled = async (
  signer: ethers.providers.JsonRpcSigner
): Promise<boolean> => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const redeemEnabled = await diamond_Contract.getRedeemEnabled(
      addressUSDCOFI
    );
    return redeemEnabled;
  } catch (error) {
    throw new Error("getRedeemEnabled failed : " + error);
  }
};

export const getPointsRate = async (
  signer: ethers.providers.JsonRpcSigner
): Promise<number> => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const pointsRate = await diamond_Contract.getPointsRate(addressUSDCOFI);
    return pointsRate;
  } catch (error) {
    throw new Error("getPointsRate failed : " + error);
  }
};

export const getFeeCollectorStatus = async (
  signer: ethers.providers.JsonRpcSigner
): Promise<boolean> => {
  try {
    const diamond_Contract = await new ethers.Contract(
      addressDiamond,
      abiDiamond,
      signer
    );
    const feeCollectorStatus = await diamond_Contract.getFeeCollectorStatus();
    return feeCollectorStatus;
  } catch (error) {
    throw new Error("getFeeCollectorStatus failed : " + error);
  }
};
