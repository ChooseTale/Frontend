import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { API_URL } from "@/config/config";

interface NextOptions {
  tags?: string[];
}

interface CustomAxiosInstance extends AxiosInstance {
  get: <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D> & { next?: NextOptions }
  ) => Promise<R>;
}

const api = axios.create({
  baseURL: API_URL,
});

export default api as CustomAxiosInstance;
