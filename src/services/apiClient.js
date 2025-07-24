import axios from 'axios';
import { authService } from './authService';

const apiClient = axios.create({
  baseURL: 'http://localhost:5067/api',
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor - thêm token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - tự động refresh token khi 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await authService.refreshToken();
        // Retry request với token mới
        const newToken = authService.getToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        console.error('Token refresh failed:', refreshError);
        authService.logout();
        return Promise.reject(refreshError);
      }
    }

    // Xử lý các lỗi khác
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request Setup Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
