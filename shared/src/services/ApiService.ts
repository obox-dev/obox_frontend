import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "@libs/axios";
import { Config } from "@shared/config";

class API {
  static base_url: string;

  private static async request<T, K>(
    method: string,
    path: string,
    data?: T,
    params?: any,
    headers?: any
  ): Promise<K> {
    const url = API.base_url + path;
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      headers,
    };

    try {
      const response: AxiosResponse<K> = await axios(config);
      return response.data;
    } catch (error) {
      API.handleRequestError(error as AxiosError);
      throw error;
    }
  }

  static async get<T, K>(path: string, params?: any, headers?: any): Promise<K> {
    return API.request<T, K>("get", path, undefined, params, headers);
  }

  static async post<T, K>(path: string, data?: T, headers?: any): Promise<K> {
    return API.request<T, K>("post", path, data, undefined, headers);
  }

  static async patch<T, K>(path: string, data?: T, headers?: any): Promise<K> {
    return API.request<T, K>("patch", path, data, undefined, headers);
  }

  static async delete<T, K>(path: string, headers?: any): Promise<K> {
    return API.request<T, K>("delete", path, undefined, undefined, headers);
  }

  private static handleRequestError(error: AxiosError): void {
    if (error.response) {
      console.error(
        "Response Error",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("Request Error", error.request);
    } else {
      console.error("Error", error.message);
    }
  }
}

API.base_url = Config.baseUrl;

export { API };
