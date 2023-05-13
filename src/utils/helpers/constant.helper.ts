import { ethers } from "ethers";
import {
  // getFeeCollectorStatus,
  getMinDeposit,
  getMinWithdraw,
  getMintEnabled,
  getMintFee,
  getPointsRate,
  getRedeemEnabled,
  getRedeemFee,
} from "../ethers/ethers.view";
import { GlobalConstants } from "../types/global.types";

export const getConstants = async (
  signer: ethers.providers.JsonRpcSigner | undefined
): Promise<GlobalConstants> => {
  try {
    if (signer) {
      const feeCollectorStatus = undefined;
      const pointsRate = await getPointsRate(signer);
      const redeemEnabled = await getRedeemEnabled(signer);
      const redeemFee = await getRedeemFee(signer);
      const mintEnabled = await getMintEnabled(signer);
      const mintFee = await getMintFee(signer);
      const minDeposit = await getMinDeposit(signer);
      const minWithdraw = await getMinWithdraw(signer);

      const percentageFactor = 10 ** 4;

      return {
        feeCollectorStatus: feeCollectorStatus,
        pointsRate: Number(ethers.utils.formatEther(pointsRate)),
        redeemEnabled: redeemEnabled,
        redeemFee:
          Number(ethers.utils.formatUnits(redeemFee, "wei")) / percentageFactor,
        mintEnabled: mintEnabled,
        mintFee:
          Number(ethers.utils.formatUnits(mintFee, "wei")) / percentageFactor,
        minDeposit: Number(ethers.utils.formatEther(minDeposit)),
        minWithdraw: Number(ethers.utils.formatEther(minWithdraw)),
      };
    } else {
      return {
        feeCollectorStatus: undefined,
        pointsRate: undefined,
        redeemEnabled: undefined,
        redeemFee: undefined,
        mintEnabled: undefined,
        mintFee: undefined,
        minDeposit: undefined,
        minWithdraw: undefined,
      };
    }
  } catch (error) {
    throw new Error("getConstants : " + error);
  }
};
