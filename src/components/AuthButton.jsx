import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';

const AuthButton = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0); // Force re-render
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập
        const checkAuthStatus = () => {
            const token = localStorage.getItem('accessToken');
            const authenticated = !!token;
            console.log('AuthButton - checkAuthStatus:', authenticated);
            console.log('AuthButton - token in localStorage:', token);
            console.log('AuthButton - user in localStorage:', localStorage.getItem('user'));
            setIsAuthenticated(authenticated);
        };

        // Kiểm tra ngay khi component mount
        checkAuthStatus();

        // Lắng nghe sự thay đổi localStorage
        const handleStorageChange = () => {
            console.log('AuthButton - storage changed');
            checkAuthStatus();
        };

        window.addEventListener('storage', handleStorageChange);

        // Tạo custom event để cập nhật khi login thành công
        const handleLoginSuccess = () => {
            console.log('AuthButton - loginSuccess event received');
            // Delay một chút để đảm bảo localStorage đã được cập nhật
            setTimeout(() => {
                checkAuthStatus();
                setForceUpdate(prev => prev + 1); // Force re-render
            }, 50);
        };

        window.addEventListener('loginSuccess', handleLoginSuccess);

        // Lắng nghe logout event
        const handleLogoutSuccess = () => {
            console.log('AuthButton - logoutSuccess event received');
            checkAuthStatus();
        };

        window.addEventListener('logoutSuccess', handleLogoutSuccess);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('loginSuccess', handleLoginSuccess);
            window.removeEventListener('logoutSuccess', handleLogoutSuccess);
        };
    }, []);

    const handleLoginClick = () => {
        navigate('/login');
    };

    console.log('AuthButton rendering - isAuthenticated:', isAuthenticated, 'forceUpdate:', forceUpdate);

    return (
        <>
            {isAuthenticated ? (
                <UserMenu />
            ) : (
                <button
                    onClick={handleLoginClick}
                    className="bg-amber-500 text-gray-900 px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                >
                    Đăng nhập
                </button>
            )}
        </>
    );
};

export default AuthButton;
