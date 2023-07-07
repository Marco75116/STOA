export type GlobalConstants = {
  feeCollectorStatus: boolean | undefined;
  points: number | undefined;
  redeemEnabled: boolean | undefined;
  redeemFee: number | undefined;
  mintEnabled: boolean | undefined;
  mintFee: number | undefined;
  minDepositUSDFI: number | undefined;
  minDepositETHFI: number | undefined;
  minDepositBTCFI: number | undefined;
  minWithdrawUSDFI: number | undefined;
  minWithdrawETHFI: number | undefined;
  minWithdrawBTCFI: number | undefined;
};

export type UserOffChainData = {
  firstName: string;
  lastName: string;
  email: string;
  marketing: boolean;
  privacy: boolean;
  signature: string;
};

export type Address = `0x${string}` | undefined;

export type MagicMetadata = {
  issuer: string;
  publicAddress: string;
  email: string;
  isMfaEnabled: boolean;
  phoneNumber: null;
  recoveryFactors: [];
  walletType: string;
};
