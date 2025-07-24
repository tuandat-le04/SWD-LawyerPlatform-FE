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

        // Lưu accessToken vào localStorage
        const tokenToSave = response.data?.token || response.data?.accessToken;
        if (tokenToSave) {
          console.log("Saving accessToken:", tokenToSave);
          localStorage.setItem("accessToken", tokenToSave);
          // Verify token saved
          const savedToken = localStorage.getItem("accessToken");
          console.log("Token verification after save:", savedToken);

          // Giải mã token để lấy User ID
          const decodedToken = authService.decodeJwtToken(tokenToSave);
          console.log("Decoded Token:", decodedToken);
          const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
          const userEmail = decodedToken.email;
          const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

          let userProfile = {
            email: userEmail,
            id: userId, // Lưu userId vào user object
            role: userRole,
            name: userEmail.split("@")[0], // Fallback name
          };

          if (response.data?.user) {
            // Nếu backend trả về user data, ưu tiên dùng nó và thêm ID nếu chưa có
            userProfile = { ...userProfile, ...response.data.user, id: userId || response.data.user.id };
          }
          console.log("Saving user profile:", userProfile);
          localStorage.setItem("user", JSON.stringify(userProfile));

        } else {
          console.log("No token or accessToken in response.data for saving");
        }
        
        if (response.data?.refreshToken) {
          console.log("Saving refreshToken:", response.data.refreshToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        // Không redirect ở đây, để component xử lý
        return {
          success: true,
          message: response.message || "Đăng nhập thành công",
          user: JSON.parse(localStorage.getItem("user")), // Return the full user object from localStorage
          accessToken: tokenToSave,
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

  // Helper function to decode JWT
  decodeJwtToken: (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error decoding JWT token:", e);
      return null;
    }
  }
};

export default authService;
