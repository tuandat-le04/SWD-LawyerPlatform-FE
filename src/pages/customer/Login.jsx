import React, { useState } from 'react';
import { Scale, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth'; // Import authService

export default function LoginPage() {
    const [userType, setUserType] = useState('customer');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(''); // Thêm state để hiển thị lỗi
    const navigate = useNavigate();

    // ...existing code...

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleBackClick = () => {
        navigate('/');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        // Validate form
        if (!formData.email || !formData.password) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }

        setIsLoading(true);
        setError(''); // Clear previous errors

        try {
            console.log('Attempting login with:', formData);

            // Call authService login
            const result = await authService.login({
                email: formData.email,
                password: formData.password
            });

            console.log('Login result:', result);

            if (result.success) {
                console.log('Login thành công:', result.message);

                // Trigger custom event để cập nhật AuthButton
                window.dispatchEvent(new Event('loginSuccess'));

                // Force update localStorage event (vì storage event không trigger trong cùng tab)
                setTimeout(() => {
                    window.dispatchEvent(new Event('loginSuccess'));
                }, 100);

                // Multiple retry để đảm bảo event được trigger
                setTimeout(() => {
                    window.dispatchEvent(new Event('loginSuccess'));
                }, 300);

                // Redirect về trang home
                console.log('Redirecting to home page...');

                // Delay redirect để đảm bảo event được xử lý
                setTimeout(() => {
                    navigate('/');
                }, 500);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-md w-full">
                {/* Login Card */}
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="bg-gradient-to-r from-orange-300 to-orange-200 p-3 rounded-xl">
                                <Scale className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-left">
                                <h1 className="text-2xl font-bold text-white">BASICO</h1>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Chào Mừng Trở Lại</h2>
                        <p className="text-gray-400">Đăng nhập để tiếp tục sử dụng dịch vụ</p>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-xl">
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200 bg-gray-800 text-white"
                                    placeholder="Nhập địa chỉ email của bạn"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200 bg-gray-800 text-white"
                                    placeholder="Nhập mật khẩu của bạn"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                    Đang đăng nhập...
                                </>
                            ) : (
                                'Đăng nhập'
                            )}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-900 text-gray-400">Hoặc</span>
                            </div>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Chưa có tài khoản?{' '}
                            <a onClick={handleRegisterClick} href="#" className="font-medium text-orange-300 hover:text-orange-200 hover:underline">
                                Đăng ký ngay
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>
                        © 2025 BASICO Lawyer Booking System. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}