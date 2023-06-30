import { getFloor } from "../global.helper";

declare global {
  interface Number {
    toPercentageFormat: (decimals: number | undefined) => string;
    cofiFormatFloor: (decimals: number | undefined) => string;
  }
}

Number.prototype.cofiFormatFloor = function (
  decimals: number | undefined
): string {
  if (this !== undefined && this !== null && !isNaN(this)) {
    const isBigNumber = this > 999999;

    return new Intl.NumberFormat("en-US", {
      notation: isBigNumber ? "compact" : undefined,
      minimumFractionDigits: decimals || 0,
      maximumFractionDigits: decimals || 0,
    }).format(getFloor(this, decimals));
  } else {
    return "--";
  }
};

Number.prototype.toPercentageFormat = function (
  decimals: number | undefined
): string {
  if (this !== undefined && this !== null && !isNaN(this)) {
    return `${(this * 100).toFixed(decimals || 0)}%`;
  } else {
    return "--";
  }
};
