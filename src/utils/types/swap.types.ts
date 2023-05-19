import React from "react";

export type CoinBalances = {
  DAI: number;
  COFI: number;
};
export type CoinPrices = {
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
