import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  // Axios,
} from '@libs/axios';
import { toast} from 'react-toastify';
import i18n from '@libs/i18next';
import { Config } from '@shared/config';
import { supportedLanguages } from '@shared/libs/languages/config';

type ParamsType = Record<string, unknown>;
type HeadersType = Record<string, unknown>;
class API {
  static base_url: string;
  static fetchProvider: typeof axios;

  private static async request<T, K>(
    method: string,
    path: string,
    data?: T,
    params?: ParamsType,
    headers?: HeadersType
  ): Promise<K> {
    // console.log('HEADERS', headers);
    
    const url = API.base_url + path;
    // console.log(this.fetchProvider);
    
    // const localHeaders = this.fetchProvider.getDefaultConfig().headers;
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      headers: {
        ...headers,
        'Accept-Language': supportedLanguages[i18n.language as keyof typeof supportedLanguages],
        // 'Origin': window.location.origin,
      },
    };

    try {
      const response: AxiosResponse<K> = await axios(config);
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      const message = e.message;
      toast(message, {
        toastId: message,
      });
      throw API.handleRequestError<T>(error as AxiosError<T>);
    }
  }

  static async get<T, K>(path: string, params?: ParamsType, headers?: HeadersType): Promise<K> {
    return API.request<T, K>('get', path, undefined, params, headers);
  }

  static async post<T, K>(path: string, data?: T, headers?: HeadersType): Promise<K> {
    return API.request<T, K>('post', path, data, undefined, headers);
  }

  static async patch<T, K>(path: string, data?: T, headers?: HeadersType): Promise<K> {
    return API.request<T, K>('patch', path, data, undefined, headers);
  }

  static async delete<T, K>(path: string, headers?: HeadersType): Promise<K> {
    return API.request<T, K>('delete', path, undefined, undefined, headers);
  }

  static setFetchProvider(provider: typeof axios) {
    API.fetchProvider = provider;
  }

  private static handleRequestError<T>(error: AxiosError<T>): AxiosError<T, unknown> {
    if (error.response) {
      console.error(
        'Response Error',
        error.response.status,
        error.response.data
      );
      return error;
    } else if (error.request) {
      console.error('Request Error', error.request);
      return error;
    } else {
      console.error('Error', error.message);
      return error;
    }
  }
}

API.base_url = Config.baseUrl;
// API.setFetchProvider(axios);

export { API };
