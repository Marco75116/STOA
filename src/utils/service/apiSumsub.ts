import axios from "axios";
import { User, AccessToken } from "../types/sumsub.types";

const instance = axios.create({
  baseURL: "https://stoa-kyc-api-back.up.railway.app/verify/",
  timeout: 30000,
});

const apiService = {
  createApplicant: (externalUserId: User) =>
    instance.post(`createApplicant/${externalUserId.externalUserId}`),
  getApplicantData: (externalUserId: User) =>
    instance.get(`/getApplicantData/${externalUserId.externalUserId}`),
  createToken: (externalUserId: User) =>
    instance.get<AccessToken>(
      `getAccessToken/${externalUserId.externalUserId}`
    ),
};

export default apiService;
