import { Magic } from "magic-sdk";

const customNodeOptions = {
  rpcUrl: "https://matic-mumbai.chainstacklabs.com",
  chainId: 80001,
};

export const m = new Magic("pk_live_A92E80BE7F60C880", {
  network: customNodeOptions,
});
