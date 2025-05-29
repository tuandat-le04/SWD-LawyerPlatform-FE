import React from 'react'
import {
    Scale,
    Calendar,
    Users,
    FileText,
    MessageCircle,
    Star,
    ChevronRight,
    Phone,
    Mail,
    MapPin,
    Clock,
    Shield,
    Award,
    Search,
    User,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userType, setUserType] = useState('customer'); // 'customer' or 'lawyer'

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <header className="bg-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                                <Scale className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">BASICO</h1>
                                <p className="text-sm text-gray-600">Lawyer Booking System</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Dịch vụ</a>
                            <a href="#lawyers" className="text-gray-700 hover:text-blue-600 transition-colors">Luật sư</a>
                            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">Giới thiệu</a>
                            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Liên hệ</a>

                            <div className="flex items-center space-x-3">
                                <select
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="customer">Khách hàng</option>
                                    <option value="lawyer">Luật sư</option>
                                </select>
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Đăng nhập
                                </button>
                            </div>
                        </nav>

                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden border-t border-gray-200 py-4">
                            <div className="flex flex-col space-y-4">
                                <a href="#services" className="text-gray-700 hover:text-blue-600">Dịch vụ</a>
                                <a href="#lawyers" className="text-gray-700 hover:text-blue-600">Luật sư</a>
                                <a href="#about" className="text-gray-700 hover:text-blue-600">Giới thiệu</a>
                                <a href="#contact" className="text-gray-700 hover:text-blue-600">Liên hệ</a>
                                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                                    <select
                                        value={userType}
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                    >
                                        <option value="customer">Khách hàng</option>
                                        <option value="lawyer">Luật sư</option>
                                    </select>
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                        Đăng nhập
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Kết nối với
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Luật sư </span>
                            chuyên nghiệp
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Hệ thống đặt lịch tư vấn pháp lý trực tuyến, giúp bạn dễ dàng tìm kiếm và đặt lịch với các luật sư uy tín
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-xl shadow-lg">
                                <div className="flex-1 flex items-center">
                                    <Search className="h-5 w-5 text-gray-400 ml-3" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm dịch vụ pháp lý..."
                                        className="w-full px-3 py-3 border-0 focus:outline-none"
                                    />
                                </div>
                                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <div className="flex items-center justify-center space-x-2">
                                    <Calendar className="h-5 w-5" />
                                    <span>Đặt lịch tư vấn</span>
                                </div>
                            </button>
                            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <div className="flex items-center justify-center space-x-2">
                                    <FileText className="h-5 w-5" />
                                    <span>Tải mẫu đơn</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Dịch vụ của chúng tôi
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Cung cấp đầy đủ các dịch vụ pháp lý chuyên nghiệp cho cá nhân và doanh nghiệp
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Calendar,
                                title: "Đặt lịch tư vấn",
                                description: "Dễ dàng đặt lịch hẹn với luật sư phù hợp theo lịch trình của bạn",
                                color: "bg-blue-500"
                            },
                            {
                                icon: FileText,
                                title: "Soạn thảo văn bản",
                                description: "Hỗ trợ soạn thảo các loại hợp đồng, đơn từ pháp lý chuyên nghiệp",
                                color: "bg-green-500"
                            },
                            {
                                icon: MessageCircle,
                                title: "Tư vấn trực tuyến",
                                description: "Tư vấn pháp lý qua điện thoại, video call tiện lợi và nhanh chóng",
                                color: "bg-purple-500"
                            },
                            {
                                icon: Shield,
                                title: "Bảo mật thông tin",
                                description: "Đảm bảo tuyệt đối bảo mật thông tin khách hàng theo chuẩn pháp lý",
                                color: "bg-red-500"
                            },
                            {
                                icon: Users,
                                title: "Quản lý khách hàng",
                                description: "Hệ thống quản lý thông tin và lịch sử tư vấn của khách hàng",
                                color: "bg-indigo-500"
                            },
                            {
                                icon: Award,
                                title: "Luật sư chuyên nghiệp",
                                description: "Đội ngũ luật sư giàu kinh nghiệm, được chứng nhận bởi Đoàn Luật sư",
                                color: "bg-yellow-500"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-sm font-medium">Tìm hiểu thêm</span>
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "1000+", label: "Khách hàng tin tưởng" },
                            { number: "50+", label: "Luật sư chuyên nghiệp" },
                            { number: "5000+", label: "Vụ việc thành công" },
                            { number: "24/7", label: "Hỗ trợ khách hàng" }
                        ].map((stat, index) => (
                            <div key={index} className="text-white">
                                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                                <div className="text-blue-100">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Quy trình làm việc
                        </h3>
                        <p className="text-lg text-gray-600">
                            Chỉ với 3 bước đơn giản để bắt đầu sử dụng dịch vụ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Đăng ký tài khoản",
                                description: "Tạo tài khoản và cập nhật thông tin cá nhân để bắt đầu sử dụng dịch vụ"
                            },
                            {
                                step: "02",
                                title: "Chọn luật sư phù hợp",
                                description: "Tìm kiếm và lựa chọn luật sư phù hợp với nhu cầu và lĩnh vực pháp lý"
                            },
                            {
                                step: "03",
                                title: "Đặt lịch và tư vấn",
                                description: "Đặt lịch hẹn và nhận được tư vấn pháp lý chuyên nghiệp từ luật sư"
                            }
                        ].map((step, index) => (
                            <div key={index} className="text-center relative">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                                    {step.step}
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h4>
                                <p className="text-gray-600">{step.description}</p>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-8 left-full w-full">
                                        <ChevronRight className="h-8 w-8 text-blue-300 mx-auto" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                                    <Scale className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold">BASICO</h4>
                                    <p className="text-gray-400">Lawyer Booking System</p>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Hệ thống đặt lịch tư vấn pháp lý trực tuyến hàng đầu Việt Nam,
                                kết nối bạn với các luật sư chuyên nghiệp và uy tín.
                            </p>
                            <div className="flex space-x-4">
                                <div className="flex items-center text-gray-400">
                                    <Phone className="h-5 w-5 mr-2" />
                                    <span>+84 123 456 789</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                    <Mail className="h-5 w-5 mr-2" />
                                    <span>info@basico.vn</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-semibold mb-4">Dịch vụ</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Tư vấn pháp lý</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Soạn thảo hợp đồng</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Đại diện tố tụng</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Tư vấn doanh nghiệp</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold mb-4">Hỗ trợ</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 BASICO Lawyer Booking System. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
