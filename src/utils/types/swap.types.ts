import React from "react";

export type CoinBalances = {
  USDC: number;
  DAI: number;
  USDFI: number;
  ETH: number;
  BTC: number;
  ETHFI: number;
  BTCFI: number;
};

export type CoinPrices = {
  USDC: number;
  DAI: number;
  USDFI: number;
  ETH: number;
  BTC: number;
  ETHFI: number;
  BTCFI: number;
};

export type CoinDecimals = {
  USDC: number;
  DAI: number;
  USDFI: number;
  ETH: number;
  BTC: number;
  ETHFI: number;
  BTCFI: number;
};

export type AddressesTokens = {
  USDC: string;
  DAI: string;
  ETH: string;
  BTC: string;
  USDFI: string;
  ETHFI: string;
  BTCFI: string;
};

export type Token = {
  name: TokenSelected;
  svgLogo: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};

export type HistoryYield = {
  id: number;
  day: number;
  amountUSDFI: number;
  amountBTCFI: number;
  amountETHFI: number;
};

export type HistoryYiedAsset = {
  id: number;
  day: number;
  amount: number;
};

export type TokenName = "USDFI" | "ETHFI" | "BTCFI";

export type TokenSelected =
  | "USDC"
  | "DAI"
  | "COFI"
  | "ETH"
  | "BTC"
  | "USDFI"
  | "ETHFI"
  | "BTCFI";

export type AllTokens = {
  USDC: string;
  DAI: string;
  USDFI: string;
  ETH: string;
  BTC: string;
  ETHFI: string;
  BTCFI: string;
};
