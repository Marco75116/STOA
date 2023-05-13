import { Review } from "../types/sumsub.types";

export const getKycDone = (review: Review | undefined) => {
  try {
    if (review && review.reviewStatus === "completed") {
      return (
        review.reviewResult.reviewAnswer === "GREEN" &&
        review.reviewStatus === "completed"
      );
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("getKycDone : " + error);
  }
};
