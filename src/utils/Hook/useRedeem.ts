import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { DiamondContract } from "../constants/wagmiConfig/wagmiConfig";
import { useContext, useEffect, useState } from "react";
import { SwapContext } from "../../context/Swap.context";
import { CoinsString } from "../types/swap.types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useRedeem = (
  depositAmount: bigint,
  minAmountOut: bigint | undefined,
  action: 0 | 1
) => {
  const [toastId, setToastId] = useState<any>(null);
  const { address, isConnected } = useAccount();
  const { tokenSelected, addressesTokens } = useContext(SwapContext);
  const navigate = useNavigate();

  const { config } = usePrepareContractWrite({
    ...DiamondContract,
    functionName: "fiToUnderlying",
    args: [
      depositAmount,
      minAmountOut,
      addressesTokens[tokenSelected as keyof CoinsString],
      address,
      address,
    ],
    enabled: depositAmount !== BigInt(0) && isConnected && action === 1,
    onError(error) {
      console.log("Error PrepareContractWrite fiToUnderlying : ", error);
    },
  });

  const { data, write } = useContractWrite({
    ...config,
  });

  const {
    isLoading: isLoadingRedeem,
    isSuccess: isSuccessRedeem,
    isError: isErrorRedeem,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      navigate("/Earnings");
    },
  });

  useEffect(() => {
    if (isLoadingRedeem) {
      let toastvalue = toast.loading("REDEEM...");
      setToastId(toastvalue);
    }
    if (isSuccessRedeem) {
      toast.update(toastId, {
        render: "REDEEM SUCCESS",
        type: "success",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
    if (isErrorRedeem) {
      toast.update(toastId, {
        render: "REDEEM ERROR",
        type: "error",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
  }, [isLoadingRedeem, isSuccessRedeem, isErrorRedeem]);

  return {
    write,
  };
};

export default useRedeem;
