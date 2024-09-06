import { config } from '../../../modules/config'
import { T_submit, T_item_search } from './_type'
import axios, { AxiosResponse } from 'axios'
import { notification } from 'antd'

const SPECIFIED = 'items'
const baseURL = config.baseUrl

const RAW = `${baseURL}${SPECIFIED}`
const OPERATION = `${baseURL}${SPECIFIED}/`

export const fetch_all_item = (
  params?: T_item_search & { offset?: number; limit?: number }
): Promise<AxiosResponse<any, any>> => {
  const TOKEN = typeof window !== 'undefined' && window.localStorage.getItem('access_token')
  const Authorization = `Bearer ${TOKEN}`
  return axios.get(RAW, { params, headers: { Authorization } })
}

export const fetch_item = (id: number): Promise<AxiosResponse<any, any>> => {
  const TOKEN = typeof window !== 'undefined' && window.localStorage.getItem('access_token')
  const Authorization = `Bearer ${TOKEN}`
  return axios.get(`${OPERATION}${id}`, { headers: { Authorization } })
}

export const post_item = (data: T_submit | string | object): Promise<AxiosResponse<any, any>> => {
  const TOKEN = typeof window !== 'undefined' && window.localStorage.getItem('access_token')
  const Authorization = `Bearer ${TOKEN}`
  return axios.post(RAW, data, { headers: { Authorization } })
}

export const update_item = (id: number, data: T_submit): Promise<AxiosResponse<any, any>> => {
  const TOKEN = typeof window !== 'undefined' && window.localStorage.getItem('access_token')
  const Authorization = `Bearer ${TOKEN}`
  return axios.put(`${OPERATION}${id}`, data, { headers: { Authorization } })
}

export const delete_item = (id: number): Promise<AxiosResponse<any, any>> => {
  const TOKEN = typeof window !== 'undefined' && window.localStorage.getItem('access_token')
  const Authorization = `Bearer ${TOKEN}`
  return axios.delete(`${OPERATION}${id}`, { headers: { Authorization } })
}

