const API_BASE_URL = 'http://localhost:5067/api';

export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      console.log('Login response:', data); // Debug log
      
      if (data.status) {
        // Lưu tokens vào localStorage
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        
        // Debug: Parse token ngay sau khi login
        try {
          const payload = JSON.parse(atob(data.data.token.split('.')[1]));
          console.log('Token payload after login:', payload);
        } catch (e) {
          console.error('Cannot parse token:', e);
        }
        
        return { success: true, data: data.data };
      } else {
        return { success: false, errors: data.data || [data.message] };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, errors: ['Có lỗi xảy ra khi đăng nhập'] };
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...userData,
          role: userData.role || 'Customer' // Default role
        })
      });
      
      const data = await response.json();
      return { 
        success: data.status, 
        message: data.message, 
        errors: data.status ? [] : (data.data || [data.message])
      };
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        message: 'Có lỗi xảy ra khi đăng ký',
        errors: ['Có lỗi xảy ra khi đăng ký'] 
      };
    }
  },

  // Refresh Token
  refreshToken: async () => {
    const token = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!token || !refreshToken) {
      throw new Error('No tokens available');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/Auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, refreshToken })
      });
      
      const data = await response.json();
      
      if (data.status) {
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        return data.data;
      } else {
        // Refresh failed, user needs to login again
        authService.logout();
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Refresh token error:', error);
      authService.logout();
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    // Optionally redirect to login page
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  },

  // Get current token
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = authService.getToken();
    if (!token) return false;
    
    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  // Get user info from token
  getUserInfo: () => {
    const token = authService.getToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('JWT Payload:', payload); // Debug log
      
      return {
        userId: payload.nameid || payload.sub || payload.userId,
        email: payload.email || payload.sub,
        role: payload.role || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        name: payload.name || payload.given_name || payload.unique_name,
        exp: payload.exp
      };
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  },

  // Check if user has specific role
  hasRole: (requiredRole) => {
    const userInfo = authService.getUserInfo();
    return userInfo && userInfo.role === requiredRole;
  }
};
