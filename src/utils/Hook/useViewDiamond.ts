import { useAccount, useContractReads } from "wagmi";
import { addressBTCCOFI } from "../constants/address/addressesCOFI/BTCCOFI";
import { addressETHCOFI } from "../constants/address/addressesCOFI/ETHCOFI";
import { addressUSDCOFI } from "../constants/address/addressesCOFI/USDCOFI";
import { DiamondContract } from "../constants/wagmiConfig/wagmiConfig";
import { useState } from "react";
import { GlobalConstants } from "../types/global.types";
import { ethers } from "ethers";
import { decimalBTC } from "../constants/address/wBTC";
import { decimalUSDC } from "../constants/address/USDC";

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useContractReads({
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
        points: Number(data[0].result),
        redeemEnabled: data[1].result,
        redeemFee:
          Number(ethers.utils.formatUnits(data[2].result, "wei")) /
          percentageFactor,
        mintEnabled: data[3].result,
        mintFee:
          Number(ethers.utils.formatUnits(data[4].result, "wei")) /
          percentageFactor,
        minDepositUSDFI: Number(
          ethers.utils.formatUnits(data[5].result, decimalUSDC)
        ),
        minDepositETHFI: Number(ethers.utils.formatEther(data[6].result)),
        minDepositBTCFI: Number(
          ethers.utils.formatUnits(data[7].result, decimalBTC)
        ),
        minWithdrawUSDFI: Number(
          ethers.utils.formatUnits(data[8].result, decimalUSDC)
        ),
        minWithdrawETHFI: Number(ethers.utils.formatEther(data[9].result)),
        minWithdrawBTCFI: Number(
          ethers.utils.formatUnits(data[10].result, decimalBTC)
        ),
      });
    },
    enabled: isConnected,
  });

  return {
    constants,
  };
};

export default useViewDiamond;
