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
    throw new Error("Error : " + error);
  }
};
