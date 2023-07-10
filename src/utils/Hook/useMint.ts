import { useNavigate } from "react-router-dom";
import { DiamondContract } from "../constants/wagmiConfig/wagmiConfig";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SwapContext } from "../../context/Swap.context";
import { Coins, CoinsString } from "../types/swap.types";
import { ethers } from "ethers";

const useMint = (
  depositAmount: bigint,
  minAmountOut: bigint | undefined,
  addressReferral: string,
  action: 0 | 1
) => {
  const [toastId, setToastId] = useState<any>(null);
  const navigate = useNavigate();
  const { tokenSelected, addressesTokens, balanceCoins, convertTokenList } =
    useContext(SwapContext);
  const { isConnected, address } = useAccount();

  const { config: configUnderlyingToFi, refetch: refetchMint } =
    usePrepareContractWrite({
      ...DiamondContract,
      functionName: "underlyingToFi",
      args: [
        depositAmount,
        minAmountOut,
        addressesTokens[
          convertTokenList[tokenSelected as keyof Coins] as keyof CoinsString
        ],
        address,
        address,
        addressReferral === "" ? ethers.constants.AddressZero : addressReferral,
      ],
      enabled:
        depositAmount !== BigInt(0) &&
        isConnected &&
        balanceCoins[tokenSelected as keyof Coins] <= depositAmount &&
        action === 0,
      onError(error) {
        console.log("Error PrepareContractWrite underlyingToFi : ", error);
      },
    });

  const { data: dataMint, write: writeUnderlyingToFi } = useContractWrite({
    ...configUnderlyingToFi,
  });

  const {
    isLoading: isLoadingMint,
    isSuccess: isSuccessMint,
    isError: isErrorMint,
  } = useWaitForTransaction({
    hash: dataMint?.hash,
    onSuccess() {
      navigate("/Earnings");
    },
  });

  useEffect(() => {
    if (isLoadingMint) {
      let toastvalue = toast.loading("MINTING...");
      setToastId(toastvalue);
    }
    if (isSuccessMint) {
      toast.update(toastId, {
        render: "MINT SUCCESS",
        type: "success",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
    if (isErrorMint) {
      toast.update(toastId, {
        render: "MINT ERROR",
        type: "error",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
  }, [isSuccessMint, isLoadingMint, isErrorMint]);

  return { refetchMint, writeUnderlyingToFi };
};

export default useMint;
