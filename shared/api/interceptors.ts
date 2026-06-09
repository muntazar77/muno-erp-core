import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { apiClient } from './apiClient';

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  // 1. Request Interceptor: يرفق التوكن كـ Bearer للباك اند فوراً
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token_access');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`; // هذا يطابق الباك اند تماماً
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 2. Response Interceptor: يلتقط الـ 401 وينظف دون عمل Loop
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          // امسح التوكن والكوكيز لكسر الـ Loop فوراً
          localStorage.removeItem('token_access');
          document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          
          // التوجيه إلى صفحة تسجيل الدخول
          window.location.href = '/auth/login?expired=true';
        }
      }
      return Promise.reject(error);
    }
  );
};

setupInterceptors(apiClient);
