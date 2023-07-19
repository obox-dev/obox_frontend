import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "@libs/axios";
import { Config } from "@shared/config";

class API {
  static base_url: string;

  static async request<T>(
    method: string,
    path: string,
    data?: any,
    params?: any,
    headers?: any
  ): Promise<T> {
    const url = API.base_url + path;
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      headers,
    };

    try {
      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error) {
      API.handleRequestError(error as AxiosError);
      throw error;
    }
  }

  static async get<T>(path: string, params?: any, headers?: any): Promise<T> {
    return API.request<T>("get", path, undefined, params, headers);
  }

  static async post<T>(path: string, data?: any, headers?: any): Promise<T> {
    return API.request<T>("post", path, data, undefined, headers);
  }

  static async put<T>(path: string, data?: any, headers?: any): Promise<T> {
    return API.request<T>("put", path, data, undefined, headers);
  }

  static async delete<T>(path: string, headers?: any): Promise<T> {
    return API.request<T>("delete", path, undefined, undefined, headers);
  }

  private static handleRequestError(error: AxiosError): void {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error(
        "Response Error",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request Error", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error", error.message);
    }
  }
}

API.base_url = Config.baseUrl;

console.log(API.base_url);

export { API };
