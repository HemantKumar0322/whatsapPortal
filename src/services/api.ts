import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

import { API_BASE_URL, API_TIMEOUT } from '@/utils/constants';

const apiInterceptor: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

const publicApiInterceptor: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInterceptor.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInterceptor.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }

    if (error.response?.status >= 500) {
      console.error('Server error occurred');
    }

    return Promise.reject(error);
  }
);

export { apiInterceptor, publicApiInterceptor }; 