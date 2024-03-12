// import axios from 'axios';

import axios from '@libs/axios';
import { store } from '../store';
export const registerAxiosInterceptors = (instance: typeof axios) => {
  instance.interceptors.request.use(
    (config) => {
      const accessToken = store.getState().session.accessToken;
      if (accessToken) {       
        // config.headers['FOO'] = 'window.location.origin';
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        // config.headers['Origin'] = window.location.origin + '123';
      }
      // apply access token to every request

      return config;
    });

  // instance.interceptors.response.use((value) => value, (error) => {
  //   if (error.response.status === 401) {
  //     // refresh token
  //     // call initial request
  //   }
  // });

  return instance;
};
