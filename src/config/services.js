import axios from 'axios';
import config from './index';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = config.apiUrl;
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

const defaultPrefix = '';

export default {
  get: (url, params, prefix) => axiosInstance({
    method: 'get',
    url: `${prefix || defaultPrefix}${url}`,
    params,
  }),
  post: (url, data, params, prefix) => axiosInstance({
    method: 'post',
    url: `${prefix || defaultPrefix}${url}`,
    data,
    params,
  }),
  put: (url, data, params, prefix) => axiosInstance({
    method: 'put',
    url: `${prefix || defaultPrefix}${url}`,
    data,
    params,
  }),
  delete: (url, prefix) => axiosInstance({
    method: 'delete',
    url: `${prefix || defaultPrefix}${url}`,
  }),
  setToken: (token, callback) => {
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  },
};
