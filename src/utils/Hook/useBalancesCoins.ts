import { useAccount, useContractReads } from "wagmi";
import { addressUSDC } from "../constants/address/USDC";
import { abiDiamond } from "../constants/abi/Diamond";
import { addressUSDCOFI } from "../constants/address/addressesCOFI/USDCOFI";
import { addresswETH } from "../constants/address/wETH";
import { addresswBTC } from "../constants/address/wBTC";
import { addressETHCOFI } from "../constants/address/addressesCOFI/ETHCOFI";
import { addressBTCCOFI } from "../constants/address/addressesCOFI/BTCCOFI";
import { useState } from "react";
import { BalanceCoins } from "../types/swap.types";

const useBalancesCoins = () => {
  const { address, isConnected } = useAccount();
  const [balanceCoins, setBalanceCoins] = useState<BalanceCoins>({
    DAI: BigInt(0),
    USDFI: BigInt(0),
    USDC: BigInt(0),
    ETH: BigInt(0),
    BTC: BigInt(0),
    ETHFI: BigInt(0),
    BTCFI: BigInt(0),
  });

  useContractReads({
    contracts: [
      {
        address: addressUSDC as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: addressUSDCOFI as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: addresswETH as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: addresswBTC as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: addressETHCOFI as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: addressBTCCOFI as `0x${string}`,
        abi: abiDiamond as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
    ],
    onSuccess(data: any) {
      setBalanceCoins({
        USDC: data[0].result,
        DAI: BigInt(0),
        USDFI: data[1].result,
        ETH: data[2].result,
        BTC: data[3].result,
        ETHFI: data[4].result,
        BTCFI: data[5].result,
      });
    },
    enabled: isConnected,
  });

  return {
    balanceCoins,
  };
};

export default useBalancesCoins;
