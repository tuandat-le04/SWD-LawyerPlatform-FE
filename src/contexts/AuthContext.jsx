import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const initializeAuth = () => {
      try {
        if (authService.isAuthenticated()) {
          const userInfo = authService.getUserInfo();
          setUser(userInfo);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid tokens
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password);
      if (result.success) {
        const userInfo = authService.getUserInfo();
        setUser(userInfo);
      }
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, errors: ['Có lỗi xảy ra khi đăng nhập'] };
    }
  };

  const register = async (userData) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        message: 'Có lỗi xảy ra khi đăng ký',
        errors: ['Có lỗi xảy ra khi đăng ký'] 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (updatedUserInfo) => {
    setUser(updatedUserInfo);
  };

  const hasRole = (requiredRole) => {
    return user && user.role === requiredRole;
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    updateUser,
    hasRole,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
