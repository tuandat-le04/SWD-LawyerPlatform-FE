import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu';

const AuthButton = () => {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-orange-300 border-t-transparent"></div>
            </div>
        );
    }

    const handleLoginClick = () => {
        navigate('/login');
    };

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
