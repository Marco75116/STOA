import { Magic } from "magic-sdk";

const customNodeOptions = {
  rpcUrl: `https://opt-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_RPC_KEY_ALCHEMY}`,
  chainId: 10,
};

export const m = new Magic("pk_live_A92E80BE7F60C880", {
  network: customNodeOptions,
});
