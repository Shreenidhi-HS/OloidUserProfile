import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Request interceptor
axios.interceptors.request.use(
  (config: any) => {
    const user = JSON.parse(localStorage.getItem('authContext') || '{}');
    config.headers['Authorization'] = user?.token;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


axios.interceptors.response.use(
  (response: AxiosResponse) => {

    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {

        localStorage.clear();

        window.location.href = '/';
      }
    return Promise.reject(error);
  }
);