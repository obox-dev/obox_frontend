import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
  } from "@libs/axios";
  import { Config } from "@shared/config";
  
  class menuAPI {
    static base_url: string;
  
    static async createMenu<T, K>(
      method: string,
      path: string,
      data?: T,
      params?: any,
      headers?: any
    ): Promise<K> {
      const url = menuAPI.base_url + path;
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
        menuAPI.handleRequestError(error as AxiosError); // Handle the error here
        throw error;
      }
    }
  
    // Define the handleRequestError method
    static handleRequestError(error: AxiosError): void {
      // Your error handling logic here
      console.error("API Request Error:", error.message);
    }
  }
  
  menuAPI.base_url = Config.baseUrl;
  
  export { menuAPI };
  