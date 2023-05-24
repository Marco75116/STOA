import React from "react";

export type CoinBalances = {
  USDC: number;
  DAI: number;
  COFI: number;
};
export type CoinPrices = {
  USDC: number;
  DAI: number;
  COFI: number;
};
export type Token = {
  name: string;
  svgLogo: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};

export type HistoryYield = {
  id: number;
  day: number;
  amount: number;
};
