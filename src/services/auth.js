import api from "./api.js";

// Auth service cho các API liên quan đến authentication
const authService = {
  // Đăng ký tài khoản
  register: async (userData) => {
    console.log("Register request data:", userData);

    const requestData = {
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      name: userData.name,
      phone: userData.phone,
    };

    console.log("Sending to API:", requestData);

    try {
      const response = await api.post("/api/Auth/register", requestData);
      console.log("Register response:", response);

      // Backend trả về {code, status, message, data}
      if (response.status === true || response.code === 200) {
        return {
          success: true,
          message: response.message || "Đăng ký thành công",
          user: response.data,
        };
      } else {
        throw new Error(response.message || "Đăng ký thất bại");
      }
    } catch (error) {
      console.error("Register error:", error);

      // Log chi tiết lỗi để debug
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        response: error.response,
        stack: error.stack,
      });

      throw error;
    }
  },

  // Đăng nhập
  login: async (credentials) => {
    try {
      console.log("Login request data:", credentials);

      const response = await api.post("/api/Auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      console.log(
        "Login response full object:",
        JSON.stringify(response, null, 2)
      );
      console.log("Login response.data:", response.data);
      console.log("Response status:", response.status);
      console.log("Response.data.status:", response.data?.status);
      console.log("Response code:", response.code);
      console.log("Response.data.code:", response.data?.code);

      // Kiểm tra nhiều điều kiện có thể
      const isSuccess =
        response.status === 200 ||
        response.status === true ||
        response.code === 200 ||
        response.data?.status === true ||
        response.data?.code === 200 ||
        response.data?.success === true;

      console.log("Is success:", isSuccess);

      // Backend trả về {code, status, message, data}
      if (isSuccess) {
        console.log("Login success condition met");

        // Debug access token
        console.log("Raw token:", response.data?.token);
        console.log("Raw accessToken:", response.data?.accessToken);
        console.log("Raw user:", response.data?.user);

        // Lưu token vào localStorage
        if (response.data?.token) {
          console.log("Saving token as accessToken:", response.data.token);
          localStorage.setItem("accessToken", response.data.token);

          // Verify token saved
          const savedToken = localStorage.getItem("accessToken");
          console.log("Token verification after save:", savedToken);
        } else if (response.data?.accessToken) {
          console.log("Saving accessToken:", response.data.accessToken);
          localStorage.setItem("accessToken", response.data.accessToken);

          // Verify token saved
          const savedToken = localStorage.getItem("accessToken");
          console.log("Token verification after save:", savedToken);
        } else {
          console.log("No token or accessToken in response.data");
        }
        if (response.data?.refreshToken) {
          console.log("Saving refreshToken:", response.data.refreshToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
        if (response.data?.user) {
          console.log("Saving user:", response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          // Nếu backend không trả user data, tạo mock user từ email
          const mockUser = {
            email: credentials.email,
            name: credentials.email.split("@")[0],
          };
          console.log("Creating mock user:", mockUser);
          localStorage.setItem("user", JSON.stringify(mockUser));
        }

        // Không redirect ở đây, để component xử lý
        return {
          success: true,
          message: response.message || "Đăng nhập thành công",
          user: response.data?.user,
          accessToken: response.data?.token || response.data?.accessToken, // Backend trả về "token" field
        };
      } else {
        console.log("Login condition NOT met - throwing error");
        throw new Error(response.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Log chi tiết lỗi để debug
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        response: error.response,
        stack: error.stack,
      });

      throw error;
    }
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Trigger custom event để cập nhật AuthButton
    window.dispatchEvent(new Event("logoutSuccess"));

    // Chuyển về trang login sau khi logout
    window.location.href = "/login";
  },

  // Kiểm tra xem user đã đăng nhập chưa
  isAuthenticated: () => {
    const token = localStorage.getItem("accessToken");
    console.log("authService.isAuthenticated - token:", token);
    console.log("authService.isAuthenticated - result:", !!token);
    return !!token;
  },

  // Lấy token hiện tại
  getToken: () => {
    return localStorage.getItem("accessToken");
  },
};

export default authService;
