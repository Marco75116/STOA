import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "offChain/",
  timeout: 30000,
});

const apiOffChain = {
  insertConnexionData: (address: string) =>
    instance.get<boolean>(`connexion/${address}`).catch((error) => {
      throw new Error("insertConnexionData call failed: " + error);
    }),
};

export default apiOffChain;
