import { Coins } from "../types/swap.types";

export const getTotalBalance = (balanceCoins: Coins, pricesCoins: Coins) => {
  try {
    return (
      balanceCoins.USDFI * pricesCoins.USDFI +
      balanceCoins.ETHFI * pricesCoins.ETHFI +
      balanceCoins.BTCFI * pricesCoins.BTCFI
    );
  } catch (error) {
    throw new Error("getTotalBalance failed : " + error);
  }
};

export const getEatchFIBalance = (balanceCoins: Coins, pricesCoins: Coins) => {
  try {
    return {
      USDFI: balanceCoins.USDFI * pricesCoins.USDFI,
      ETHFI: balanceCoins.ETHFI * pricesCoins.ETHFI,
      BTCFI: balanceCoins.BTCFI * pricesCoins.BTCFI,
    };
  } catch (error) {
    throw new Error("getEatchFIBalance failed : " + error);
  }
};

export const getDailyYield = (balanceFi: number, apy: number) => {
  try {
    return (balanceFi * apy) / 365;
  } catch (error) {
    throw new Error("getDailyYield failed : " + error);
  }
};

export const getEarnings = (balanceFi: number, deposit: number) => {
  try {
    return balanceFi - deposit;
  } catch (error) {
    throw new Error("getEarnings failed : " + error);
  }
};

export const getYield = (getTotalBalance: number, deposit: number) => {
  try {
    return getTotalBalance - deposit;
  } catch (error) {
    throw new Error("getYield failed : " + error);
  }
};
export const getPercentageEarned = (
  getTotalBalance: number,
  deposit: number
) => {
  try {
    return (getTotalBalance - deposit) / getTotalBalance;
  } catch (error) {
    throw new Error("getPercentageEarned failed : " + error);
  }
};
