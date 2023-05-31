interface Number {
  toPercentageFormat: (decimals: number | undefined) => string;
}

Number.prototype.toPercentageFormat = function (
  decimals: number | undefined
): string {
  if (this !== undefined && this !== null && !isNaN(this)) {
    return `${(this * 100).toFixed(decimals || 0)}%`;
  } else {
    return "--";
  }
};
