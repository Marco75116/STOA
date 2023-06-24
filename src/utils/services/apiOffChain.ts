import axios from "axios";
import { Address, UserOffChainData } from "../types/global.types";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "offChain/",
  timeout: 30000,
});

const apiOffChain = {
  insertConnexionData: (address: string) =>
    instance.get<boolean>(`connexion/${address}`).catch((error) => {
      throw new Error("insertConnexionData call failed: " + error);
    }),
  checkData: (address: string) =>
    instance.get<boolean>(`checkDataOffChain/${address}`).catch((error) => {
      throw new Error("insertConnexionData call failed: " + error);
    }),
  insertOffChainData: (
    address: Address,
    userData: UserOffChainData,
    signature: `0x${string}` | undefined
  ) =>
    instance.get<boolean>(`form/${address}`, {
      params: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        marketing: userData.marketing === false ? 0 : 1,
        signature: signature,
      },
    }),
};

export default apiOffChain;
