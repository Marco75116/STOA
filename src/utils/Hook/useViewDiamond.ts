import { useAccount, useContractReads } from "wagmi";
import { addressBTCCOFI } from "../constants/address/addressesCOFI/BTCCOFI";
import { addressETHCOFI } from "../constants/address/addressesCOFI/ETHCOFI";
import { addressUSDCOFI } from "../constants/address/addressesCOFI/USDCOFI";
import { DiamondContract } from "../constants/wagmiConfig/wagmiConfig";
import { useState } from "react";
import { GlobalConstants } from "../types/global.types";
import { decimalBTC } from "../constants/address/wBTC";
import { decimalUSDC } from "../constants/address/USDC";
import { weiToEth } from "../helpers/global.helper";

const useViewDiamond = () => {
  const { isConnected, address } = useAccount();
  const [constants, setConstants] = useState<GlobalConstants>({
    feeCollectorStatus: undefined,
    points: undefined,
    redeemEnabled: undefined,
    redeemFee: undefined,
    mintEnabled: undefined,
    mintFee: undefined,
    minDepositUSDFI: undefined,
    minDepositETHFI: undefined,
    minDepositBTCFI: undefined,
    minWithdrawUSDFI: undefined,
    minWithdrawETHFI: undefined,
    minWithdrawBTCFI: undefined,
  });
  const percentageFactor = 10 ** 4;
  const arrayAddressFiTokens = [addressUSDCOFI, addressBTCCOFI, addressETHCOFI];

  useContractReads({
    contracts: [
      {
        ...DiamondContract,
        functionName: "getPoints",
        args: [address as `0x${string}`, arrayAddressFiTokens],
      },
      {
        ...DiamondContract,
        functionName: "getRedeemEnabled",
        args: [address as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getRedeemFee",
        args: [addressUSDCOFI],
      },
      {
        ...DiamondContract,
        functionName: "getMintEnabled",
        args: [address as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMintFee",
        args: [addressUSDCOFI],
      },
      {
        ...DiamondContract,
        functionName: "getMinDeposit",
        args: [addressUSDCOFI as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMinDeposit",
        args: [addressETHCOFI as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMinDeposit",
        args: [addressBTCCOFI as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMinWithdraw",
        args: [addressUSDCOFI as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMinWithdraw",
        args: [addressETHCOFI as `0x${string}`],
      },
      {
        ...DiamondContract,
        functionName: "getMinWithdraw",
        args: [addressBTCCOFI as `0x${string}`],
      },
    ],
    watch: true,
    onSuccess(data: any) {
      setConstants({
        feeCollectorStatus: false,
        points: weiToEth(Number(data[0].result)),
        redeemEnabled: data[1].result,
        redeemFee: Number(data[2].result) / percentageFactor,
        mintEnabled: data[3].result,
        mintFee: Number(data[4].result) / percentageFactor,
        minDepositUSDFI: Number(data[5].result) / 10 ** decimalUSDC,
        minDepositETHFI: weiToEth(Number(data[6].result)),
        minDepositBTCFI: Number(data[7].result) / 10 ** decimalBTC,
        minWithdrawUSDFI: Number(data[8].result) / 10 ** decimalUSDC,
        minWithdrawETHFI: weiToEth(Number(data[9].result)),
        minWithdrawBTCFI: Number(data[10].result) / 10 ** decimalBTC,
      });
    },
    enabled: isConnected,
  });

  return {
    constants,
  };
};

export default useViewDiamond;
