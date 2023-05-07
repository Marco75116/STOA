import { ethers } from "ethers";
import { abiDiamond } from "../constants/abi/Diamond";
import { addressDai } from "../constants/address/Dai";

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
