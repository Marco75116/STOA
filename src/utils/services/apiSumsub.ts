import axios from "axios";
import { User, AccessToken, ApplicantDataApi } from "../types/sumsub.types";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "verify/",
  timeout: 30000,
});

const apiService = {
  createApplicant: (externalUserId: User) =>
    instance
      .post(`createApplicant/${externalUserId.externalUserId}`)
      .catch((error) => {
        throw new Error("createApplicant call failed: " + error);
      }),

  getApplicantData: (externalUserId: User) =>
    instance
      .get<ApplicantDataApi>(
        `/getApplicantData/${externalUserId.externalUserId}`
      )
      .catch((error) => {
        throw new Error("getApplicantData call failed: " + error);
      }),

  createToken: (externalUserId: User) =>
    instance
      .get<AccessToken>(`getAccessToken/${externalUserId.externalUserId}`)
      .catch((error) => {
        throw new Error("createToken call failed: " + error);
      }),
};

export default apiService;
