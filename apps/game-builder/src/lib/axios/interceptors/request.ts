import { type InternalAxiosRequestConfig } from "axios";
import initRequestHeader from "@/lib/axios/initRequestHeader";

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const headers = initRequestHeader();
  config.headers.set(headers);
  return config;
};
