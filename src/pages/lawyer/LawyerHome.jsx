"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    Calendar,
    Users,
    MessageCircle,
    FileText,
    Clock,
    DollarSign,
    TrendingUp,
    Bell,
    Video,
    Phone,
    Star,
    User,
    Settings,
    Search,
} from "lucide-react"

// Mock data for lawyer dashboard
const mockData = {
    stats: {
        totalConsultations: 156,
        monthlyRevenue: 45600000,
        activeClients: 23,
        averageRating: 4.8,
        completedCases: 89,
        pendingAppointments: 7,
    },
    recentAppointments: [
        {
            id: 1,
            clientName: "Nguyễn Văn An",
            clientAvatar: "../public/images/avatar.png",
            type: "Tư vấn trực tuyến",
            date: "2025-01-17",
            time: "14:00",
            duration: "60 phút",
            status: "confirmed",
            topic: "Luật Dân sự - Tranh chấp hợp đồng",
            fee: "500,000 VNĐ",
        },
        {
            id: 2,
            clientName: "Trần Thị Bình",
            clientAvatar: "../public/images/avatar.png",
            type: "Gặp trực tiếp",
            date: "2025-01-17",
            time: "16:30",
            duration: "90 phút",
            status: "pending",
            topic: "Luật Hôn nhân - Thủ tục ly hôn",
            fee: "750,000 VNĐ",
        },
        {
            id: 3,
            clientName: "Lê Minh Cường",
            clientAvatar: "../public/images/avatar.png",
            type: "Tư vấn điện thoại",
            date: "2025-01-18",
            time: "09:00",
            duration: "30 phút",
            status: "confirmed",
            topic: "Luật Bất động sản - Mua bán nhà đất",
            fee: "300,000 VNĐ",
        },
        {
            id: 4,
            clientName: "Phạm Thị Dung",
            clientAvatar: "../public/images/avatar.png",
            type: "Tư vấn trực tuyến",
            date: "2025-01-18",
            time: "15:00",
            duration: "60 phút",
            status: "completed",
            topic: "Luật Lao động - Chấm dứt hợp đồng",
            fee: "500,000 VNĐ",
        },
    ],

    notifications: [
        {
            id: 1,
            type: "appointment",
            title: "Lịch hẹn mới",
            message: "Bạn có lịch hẹn mới với Nguyễn Văn An vào 14:00 hôm nay",
            time: "5 phút trước",
            read: false,
        },
        {
            id: 2,
            type: "payment",
            title: "Thanh toán thành công",
            message: "Đã nhận thanh toán 500,000 VNĐ từ Trần Thị Bình",
            time: "1 giờ trước",
            read: false,
        },
        {
            id: 3,
            type: "review",
            title: "Đánh giá mới",
            message: "Lê Minh Cường đã đánh giá 5 sao cho buổi tư vấn",
            time: "3 giờ trước",
            read: true,
        },
    ],
    weeklySchedule: [
        { day: "T2", appointments: 3, revenue: 1500000 },
        { day: "T3", appointments: 5, revenue: 2500000 },
        { day: "T4", appointments: 2, revenue: 1000000 },
        { day: "T5", appointments: 4, revenue: 2000000 },
        { day: "T6", appointments: 6, revenue: 3000000 },
        { day: "T7", appointments: 1, revenue: 500000 },
        { day: "CN", appointments: 0, revenue: 0 },
    ],
}

export default function LawyerHome() {
    const navigate = useNavigate()
    const [currentTime, setCurrentTime] = useState(new Date())
    const [selectedTab, setSelectedTab] = useState("overview")
    const [notifications, setNotifications] = useState(mockData.notifications)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-500/20 text-green-400 border-green-500/30"
            case "pending":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            case "completed":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30"
            case "cancelled":
                return "bg-red-500/20 text-red-400 border-red-500/30"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30"
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "confirmed":
                return "Đã xác nhận"
            case "pending":
                return "Chờ xác nhận"
            case "completed":
                return "Hoàn thành"
            case "cancelled":
                return "Đã hủy"
            default:
                return "Không xác định"
        }
    }

    const handleNavigation = (path) => {
        navigate(path)
    }

    const unreadNotifications = notifications.filter((n) => !n.read).length

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-2 rounded-lg">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">BASICO</h1>
                                    <p className="text-xs text-gray-400">Lawyer Dashboard</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Profile */}
                            <div className="flex items-center space-x-3">
                                <img
                                    src="../public/images/avatar.png"
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full border-2 border-amber-500"
                                />
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-white">Luật sư Nguyễn Thị Mai</p>
                                    <p className="text-xs text-gray-400">Luật sư Trưởng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
                    <nav className="p-4 space-y-2">
                        {[
                            { id: "overview", label: "Tổng quan", icon: TrendingUp, path: "/lawyer/home" },
                            { id: "appointments", label: "Lịch hẹn", icon: Calendar, path: "/lawyer/appointments" },
                            { id: "clients", label: "Khách hàng", icon: Users, path: "/lawyer/clients" },
                            { id: "settings", label: "Cài đặt", icon: Settings, path: "/lawyer/settings" },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item.path)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${selectedTab === item.id
                                    ? "bg-amber-500 text-gray-900"
                                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Dashboard */}
                <main className="flex-1 p-6">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Chào mừng trở lại, Luật sư Mai! 👋</h2>
                                <p className="text-gray-400">
                                    Hôm nay là{" "}
                                    {currentTime.toLocaleDateString("vi-VN", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}{" "}
                                    - {currentTime.toLocaleTimeString("vi-VN")}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-400">Trạng thái hoạt động</p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 font-medium">Đang online</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Tổng tư vấn</p>
                                    <p className="text-2xl font-bold text-white mt-1">{mockData.stats.totalConsultations}</p>
                                    <p className="text-green-400 text-sm mt-2">+12% so với tháng trước</p>
                                </div>
                                <div className="bg-blue-500/20 p-3 rounded-xl">
                                    <Users className="h-6 w-6 text-blue-400" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Doanh thu tháng</p>
                                    <p className="text-2xl font-bold text-white mt-1">{formatCurrency(mockData.stats.monthlyRevenue)}</p>
                                    <p className="text-green-400 text-sm mt-2">+8% so với tháng trước</p>
                                </div>
                                <div className="bg-green-500/20 p-3 rounded-xl">
                                    <DollarSign className="h-6 w-6 text-green-400" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Khách hàng đang hoạt động</p>
                                    <p className="text-2xl font-bold text-white mt-1">{mockData.stats.activeClients}</p>
                                    <p className="text-amber-400 text-sm mt-2">+3 khách hàng mới</p>
                                </div>
                                <div className="bg-amber-500/20 p-3 rounded-xl">
                                    <User className="h-6 w-6 text-amber-400" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Đánh giá trung bình</p>
                                    <div className="flex items-center mt-1">
                                        <p className="text-2xl font-bold text-white">{mockData.stats.averageRating}</p>
                                        <Star className="h-5 w-5 text-yellow-500 ml-2 fill-current" />
                                    </div>
                                    <p className="text-yellow-400 text-sm mt-2">Từ 127 đánh giá</p>
                                </div>
                                <div className="bg-yellow-500/20 p-3 rounded-xl">
                                    <Star className="h-6 w-6 text-yellow-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Appointments */}
                        <div className="lg:col-span-2">
                            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white">Lịch hẹn gần đây</h3>
                                    <button
                                        onClick={() => handleNavigation("/lawyer/appointments")}
                                        className="text-amber-400 hover:text-amber-300 text-sm font-medium"
                                    >
                                        Xem tất cả
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {mockData.recentAppointments.map((appointment) => (
                                        <div
                                            key={appointment.id}
                                            className="bg-gray-700/50 border border-gray-600 rounded-xl p-4 hover:bg-gray-700 transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={appointment.clientAvatar || "/placeholder.svg"}
                                                        alt={appointment.clientName}
                                                        className="w-12 h-12 rounded-full border-2 border-gray-600"
                                                    />
                                                    <div>
                                                        <h4 className="font-semibold text-white">{appointment.clientName}</h4>
                                                        <p className="text-sm text-gray-400">{appointment.topic}</p>
                                                        <div className="flex items-center space-x-4 mt-2">
                                                            <div className="flex items-center text-sm text-gray-400">
                                                                <Calendar className="h-4 w-4 mr-1" />
                                                                {appointment.date}
                                                            </div>
                                                            <div className="flex items-center text-sm text-gray-400">
                                                                <Clock className="h-4 w-4 mr-1" />
                                                                {appointment.time} ({appointment.duration})
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}
                                                    >
                                                        {getStatusText(appointment.status)}
                                                    </div>
                                                    <p className="text-amber-400 font-semibold mt-2">{appointment.fee}</p>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        {appointment.type === "Tư vấn trực tuyến" && <Video className="h-4 w-4 text-blue-400" />}
                                                        {appointment.type === "Tư vấn điện thoại" && <Phone className="h-4 w-4 text-green-400" />}
                                                        {appointment.type === "Gặp trực tiếp" && <User className="h-4 w-4 text-amber-400" />}
                                                        <span className="text-xs text-gray-400">{appointment.type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4">Thao tác nhanh</h3>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => handleNavigation("/lawyer/appointments")}
                                        className="w-full flex items-center space-x-3 p-3 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-lg transition-colors"
                                    >
                                        <Calendar className="h-5 w-5" />
                                        <span className="font-medium">Quản lý lịch hẹn</span>
                                    </button>
                                    <button
                                        onClick={() => handleNavigation("/lawyer/clients")}
                                        className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                    >
                                        <Users className="h-5 w-5" />
                                        <span className="font-medium">Quản lý khách hàng</span>
                                    </button>
                                </div>
                            </div>

                            {/* Weekly Overview */}
                            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4">Tổng quan tuần này</h3>
                                <div className="space-y-3">
                                    {mockData.weeklySchedule.map((day, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${day.appointments > 0 ? "bg-amber-500 text-gray-900" : "bg-gray-700 text-gray-400"
                                                        }`}
                                                >
                                                    {day.day}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white">{day.appointments} lịch hẹn</p>
                                                    <p className="text-xs text-gray-400">{formatCurrency(day.revenue)}</p>
                                                </div>
                                            </div>
                                            <div className="w-16 bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${Math.min((day.appointments / 6) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
