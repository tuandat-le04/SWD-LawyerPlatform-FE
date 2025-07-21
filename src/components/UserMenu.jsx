import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy thông tin user từ localStorage
        const userData = localStorage.getItem('user');
        console.log('UserMenu - userData from localStorage:', userData);
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        // Đóng dropdown khi click bên ngoài
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        authService.logout();
        setIsOpen(false);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        setIsOpen(false);
    };

    const handleSettingsClick = () => {
        navigate('/settings');
        setIsOpen(false);
    };

    // Lấy chữ cái đầu của tên để làm avatar
    const getAvatarText = () => {
        if (user?.name) {
            return user.name.charAt(0).toUpperCase();
        }
        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return 'U';
    };

    if (!user) {
        console.log('UserMenu - No user data, returning null');
        return null;
    }

    console.log('UserMenu - Rendering user menu for:', user);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 transition-all duration-200"
            >
                {/* Avatar */}
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getAvatarText()}
                </div>

                {/* User Name */}
                <span className="text-white text-sm font-medium hidden md:block">
                    {user?.name || user?.email?.split('@')[0] || 'User'}
                </span>

                {/* Dropdown Arrow */}
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-50">
                    <div className="py-2">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-700">
                            <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                        </div>

                        {/* Menu Items */}
                        <button
                            onClick={handleProfileClick}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2"
                        >
                            <User className="w-4 h-4" />
                            <span>Hồ sơ cá nhân</span>
                        </button>

                        <button
                            onClick={handleSettingsClick}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2"
                        >
                            <Settings className="w-4 h-4" />
                            <span>Cài đặt</span>
                        </button>

                        <hr className="border-gray-700 my-1" />

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 flex items-center space-x-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Đăng xuất</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
