import axios from "axios";

// Base URL của backend API
const BASE_URL = ""; // Sử dụng proxy của Vite thay vì direct URL

// Tạo axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // Tăng timeout lên 15s
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // Tắt credentials để tránh CORS phức tạp
});

// Request interceptor - Thêm token vào header nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý lỗi chung
api.interceptors.response.use(
  (response) => {
    // Backend trả về format {code, status, message, data}
    return response.data;
  },
  (error) => {
    // Xử lý lỗi 401 - Token hết hạn
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }

    // Xử lý các loại lỗi khác nhau
    let errorMessage = "Có lỗi xảy ra";

    // Kiểm tra lỗi network/connection
    if (error.code === "ERR_NETWORK" || error.code === "NETWORK_ERROR") {
      errorMessage =
        "Không thể kết nối đến server. Vui lòng kiểm tra:\n" +
        "1. Server backend có đang chạy trên http://localhost:5067?\n" +
        "2. Kết nối mạng có ổn định không?\n" +
        "3. Firewall có chặn kết nối không?";
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Yêu cầu quá thời gian chờ. Vui lòng thử lại.";
    } else if (error.response?.status === 0) {
      errorMessage = "Server không phản hồi. Vui lòng kiểm tra server backend.";
    } else if (
      !error.response &&
      error.message.toLowerCase().includes("cors")
    ) {
      errorMessage =
        "Lỗi CORS: Server backend chưa được cấu hình để nhận request từ frontend.\n" +
        "Vui lòng kiểm tra cấu hình CORS trên server.";
    } else if (error.response?.status >= 500) {
      errorMessage = "Lỗi server. Vui lòng thử lại sau.";
    } else if (error.response?.status === 400) {
      errorMessage = error.response?.data?.message || "Dữ liệu không hợp lệ.";
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }

    console.error("API Error:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        headers: error.config?.headers,
      },
    });

    return Promise.reject(new Error(errorMessage));
  }
);

// Function to test API connection
export const testConnection = async () => {
  try {
    await api.get("/api/Auth/register");
    return { success: true, message: "Kết nối thành công" };
  } catch (error) {
    console.error("Connection test failed:", error);
    return {
      success: false,
      message: error.message,
      details: {
        baseURL: BASE_URL || "proxy",
        timeout: api.defaults.timeout,
        error: error.code || error.message,
      },
    };
  }
};

export default api;
