// import { config } from "../../../modules/config";
import { T_submit, T_discount_search } from "./_type";
import axios, { AxiosResponse } from "axios";
import { notification } from "antd";
import config from "../../../config/config";

const SPECIFIED = "discount";
const baseURL = config.baseUrl;

const RAW = `${baseURL}${SPECIFIED}`;
const OPERATION = `${baseURL}${SPECIFIED}/`;

export const fetch_all_discount = (
  TOKEN: string,
  params?: T_discount_search & { page?: number; limit?: number }
): Promise<AxiosResponse<any, any>> => {
  const Authorization = `Bearer ${TOKEN}`;
  return axios.get(RAW, { params, headers: { Authorization } });
};

export const fetch_discount = (
  TOKEN: string,
  id: number
): Promise<AxiosResponse<any, any>> => {

  const Authorization = `Bearer ${TOKEN}`;
  return axios.get(`${OPERATION}${id}`, { headers: { Authorization } });
};

export const post_discount = (
  TOKEN: string,
  data: T_submit | string | object
): Promise<AxiosResponse<any, any>> => {
  const Authorization = `Bearer ${TOKEN}`;
  return axios.post(RAW, data, { headers: { Authorization } });
};

export const update_discount = (
  TOKEN: string,
  id: number,
  data: T_submit
): Promise<AxiosResponse<any, any>> => {
  const Authorization = `Bearer ${TOKEN}`;
  return axios.put(`${OPERATION}${id}`, data, { headers: { Authorization } });
};

export const delete_discount = (
  TOKEN: string,
  id: number
): Promise<AxiosResponse<any, any>> => {
  const Authorization = `Bearer ${TOKEN}`;
  return axios.delete(`${OPERATION}${id}`, { headers: { Authorization } });
};

export const getAllItemCategories = (TOKEN: string, params: any) => {
  const Authorization = `Bearer ${TOKEN}`;
  return axios
    .get(`${baseURL}discountCategory`, { params, headers: { Authorization } })
    .catch(() => {
      notification.error({ message: "مشکلی در دریافت اطلاعات بوجود آمد" });
    });
};
