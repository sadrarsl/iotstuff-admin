import axios, { AxiosResponse } from "axios";
import { CheckTokenResponse, LoginResponse } from "./_models";
import config from "../../../config/config";

const baseUrl = config.baseUrl;

const loginUrl = `${baseUrl}user/login`;
const checkTokenUrl = `${baseUrl}user/checkToken`;

export const login = (
  phoneNumber: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post(loginUrl, { phoneNumber, password });
};

export const checkToken = (
  token: string
): Promise<AxiosResponse<CheckTokenResponse>> => {
  return axios.post(checkTokenUrl, {  },{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
}
