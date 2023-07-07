import { Review } from "../types/sumsub.types";
import { toast } from "react-toastify";

export const getKycDone = (review: Review | undefined) => {
  try {
    if (review && review.reviewStatus === "completed") {
      return review.reviewResult.reviewAnswer === "GREEN" &&
        review.reviewStatus === "completed"
        ? true
        : false;
    } else if (review && review.reviewStatus === "init") {
      return false;
    } else {
      return undefined;
    }
  } catch (error) {
    throw new Error("getKycDone : " + error);
  }
};

export const copyToClipboard = async (text?: string) => {
  try {
    if (text) {
      return await toast.promise(() => navigator.clipboard.writeText(text), {
        success: "Copied !",
        error: "Error while copying address : " + text,
      });
    }
  } catch (error) {
    throw new Error("Error while copying address");
  }
};

export const getFloor = (
  num: number | undefined,
  decimal: number | undefined
) => {
  try {
    if (num !== undefined && decimal !== undefined)
      return Math.floor(num * 10 ** decimal) / 10 ** decimal;
  } catch (error) {
    throw new Error("getFloor failed : " + error);
  }
};
export const displayBalance = (
  num: bigint | undefined,
  decimal: number | undefined
): string | undefined => {
  try {
    if (num !== undefined && decimal !== undefined) {
      return (Number(num / BigInt(10 ** (decimal - 4))) / 10 ** 4).toString();
    }
  } catch (error) {
    throw new Error("displayBalance  failed: " + error);
  }
};

export const bigIntToDecimal = (
  num: bigint | undefined,
  decimal: number | undefined
): number | undefined => {
  try {
    if (num !== undefined && decimal !== undefined) {
      return Number(num / BigInt(10 ** (decimal - 6))) / 10 ** 6;
    }
  } catch (error) {
    throw new Error("bigIntToDecimal failed : " + error);
  }
};

export const stringToBigInt = (
  num: string | undefined,
  decimal: number | undefined
): bigint | undefined => {
  try {
    if (num !== undefined && decimal !== undefined) {
      return BigInt(Number(num) * 10 ** decimal);
    }
  } catch (error) {
    throw new Error("bigIntToDecimal failed : " + error);
  }
};

export const getMinAmountOut = (
  num: bigint | undefined
): bigint | undefined => {
  try {
    const percentageFactor = 10000;
    if (num !== undefined) {
      return (
        BigInt(Number(num) * 0.9975 * percentageFactor) /
        BigInt(percentageFactor)
      );
    }
  } catch (error) {
    throw new Error("bigIntToDecimal failed : " + error);
  }
};

export const weiToEth = (num: number) => {
  return num / 10 ** 18;
};
