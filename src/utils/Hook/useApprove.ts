import { useContext, useEffect, useState } from "react";
import { SwapContext } from "../../context/Swap.context";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CoinsString } from "../types/swap.types";
import { addressDiamond } from "../constants/address/Diamond";
import { abiDiamond } from "../constants/abi/Diamond";
import { toast } from "react-toastify";

const useApprove = (
  depositAmount: bigint,
  action: 0 | 1,
  refetch: Function
) => {
  const [toastId, setToastId] = useState<any>(null);
  const { tokenSelected, addressesTokens } = useContext(SwapContext);

  const { config: configApprove } = usePrepareContractWrite({
    address: addressesTokens[
      tokenSelected as keyof CoinsString
    ] as `0x${string}`,
    abi: abiDiamond,
    functionName: "approve",
    args: [addressDiamond, depositAmount],
    enabled: depositAmount !== BigInt(0) && action === 0,
    onError(error) {
      console.log("Error approve", error);
    },
  });

  const { data, write: writeApprove } = useContractWrite(configApprove);

  const {
    isSuccess: ApproveSuccess,
    isLoading: isLoadingApprove,
    isSuccess: isSuccessApprove,
    isError: isErrorApprove,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isLoadingApprove) {
      let toastvalue = toast.loading("APPROVE...");
      setToastId(toastvalue);
    }
    if (isSuccessApprove) {
      refetch();
      toast.update(toastId, {
        render: "APPROVE SUCCESS",
        type: "success",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
    if (isErrorApprove) {
      toast.update(toastId, {
        render: "APPROVE ERROR",
        type: "error",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
  }, [isSuccessApprove, isLoadingApprove, isErrorApprove]);

  return { ApproveSuccess, writeApprove };
};
export default useApprove;
