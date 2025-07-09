"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Users,
    Calendar,
    DollarSign,
    TrendingUp,
    UserCheck,
    Clock,
    Settings,
    FileText,
    BarChart3,
    Shield,
    Bell,
    Search,
    Plus,
    Eye,
    Edit,
    Trash2,
    ChevronRight,
    Home,
    Menu,
    X,
} from "lucide-react"

const AdminHome = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // Mock data
    const [stats, setStats] = useState({
        totalUsers: 1247,
        totalLawyers: 89,
        totalClients: 1158,
        totalAppointments: 2341,
        pendingAppointments: 23,
        completedAppointments: 2318,
        totalRevenue: 125000000,
        monthlyGrowth: 12.5,
    })

    const [recentUsers, setRecentUsers] = useState([
        {
            id: 1,
            name: "Nguyễn Văn An",
            email: "an.nguyen@email.com",
            role: "client",
            status: "active",
            joinDate: "2024-01-15",
            avatar: "/images/avatar.png",
        },
        {
            id: 2,
            name: "Luật sư Trần Thị Bình",
            email: "binh.tran@email.com",
            role: "lawyer",
            status: "active",
            joinDate: "2024-01-14",
            avatar: "/images/avatar.png",
        },
        {
            id: 3,
            name: "Lê Văn Cường",
            email: "cuong.le@email.com",
            role: "client",
            status: "pending",
            joinDate: "2024-01-13",
            avatar: "/images/avatar.png",
        },
    ])

    const [recentAppointments, setRecentAppointments] = useState([
        {
            id: 1,
            client: "Nguyễn Văn An",
            lawyer: "Luật sư Trần Thị Bình",
            service: "Tư vấn hôn nhân",
            date: "2024-01-16",
            time: "09:00",
            status: "confirmed",
            fee: 500000,
        },
        {
            id: 2,
            client: "Lê Văn Cường",
            lawyer: "Luật sư Phạm Văn Đức",
            service: "Tư vấn doanh nghiệp",
            date: "2024-01-16",
            time: "14:00",
            status: "pending",
            fee: 800000,
        },
    ])

    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin" },
        { id: "users", label: "Quản lý người dùng", icon: Users, path: "/admin/manageCustomer" },
        { id: "lawyers", label: "Quản lý luật sư", icon: Users, path: "/admin/lawyers" },
        { id: "appointments", label: "Quản lý lịch hẹn", icon: Calendar, path: "/admin/appointments" },
        { id: "services", label: "Quản lý dịch vụ", icon: FileText, path: "/admin/services" },
        { id: "reports", label: "Báo cáo", icon: BarChart3, path: "/admin/reports" },
        { id: "settings", label: "Cài đặt", icon: Settings, path: "/admin/settings" },
    ]

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
            case "confirmed":
                return "text-green-400 bg-green-400/10"
            case "pending":
                return "text-yellow-400 bg-yellow-400/10"
            case "inactive":
            case "cancelled":
                return "text-red-400 bg-red-400/10"
            default:
                return "text-gray-400 bg-gray-400/10"
        }
    }

    const getRoleColor = (role) => {
        switch (role) {
            case "lawyer":
                return "text-blue-400 bg-blue-400/10"
            case "client":
                return "text-purple-400 bg-purple-400/10"
            case "admin":
                return "text-red-400 bg-red-400/10"
            default:
                return "text-gray-400 bg-gray-400/10"
        }
    }

    const StatCard = ({ title, value, icon: Icon, change, color = "blue" }) => (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold text-white mt-2">{value}</p>
                    {change && (
                        <div className="flex items-center mt-2">
                            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                            <span className="text-green-400 text-sm">+{change}%</span>
                            <span className="text-gray-400 text-sm ml-1">so với tháng trước</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-lg bg-${color}-500/10`}>
                    <Icon className={`w-6 h-6 text-${color}-400`} />
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full w-64 bg-gray-800/95 backdrop-blur-sm border-r border-gray-700/50 transform transition-transform duration-300 z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                                <p className="text-gray-400 text-sm">Quản trị hệ thống</p>
                            </div>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        if (item.path) {
                                            navigate(item.path)
                                        }
                                        setSidebarOpen(false)
                                    }}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${item.id === "dashboard"
                                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            )
                        })}
                    </nav>
                </div>

                {/* User Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50">
                    <div className="flex items-center space-x-3">
                        <img
                            src="/images/avatar.png"
                            alt="Admin"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-white font-medium">Admin User</p>
                            <p className="text-gray-400 text-sm">admin@system.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Header */}
                <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
                                <Menu className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                                <p className="text-gray-400">Quản lý và giám sát hệ thống</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content - Only Dashboard */}
                <main className="p-6">
                    <div className="space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Tổng người dùng"
                                value={stats.totalUsers.toLocaleString()}
                                icon={Users}
                                change={8.2}
                                color="blue"
                            />
                            <StatCard title="Luật sư" value={stats.totalLawyers} icon={UserCheck} change={5.1} color="green" />
                            <StatCard
                                title="Lịch hẹn"
                                value={stats.totalAppointments.toLocaleString()}
                                icon={Calendar}
                                change={12.3}
                                color="purple"
                            />
                            <StatCard
                                title="Doanh thu"
                                value={formatCurrency(stats.totalRevenue)}
                                icon={DollarSign}
                                change={stats.monthlyGrowth}
                                color="yellow"
                            />
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent Users */}
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-white">Người dùng mới</h3>
                                    <button
                                        onClick={() => navigate("/admin/manageCustomer")}
                                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
                                    >
                                        Xem tất cả <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {recentUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={user.avatar || "/placeholder.svg"}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="text-white font-medium">{user.name}</p>
                                                    <p className="text-gray-400 text-sm">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                                    {user.role === "lawyer" ? "Luật sư" : "Khách hàng"}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                                    {user.status === "active" ? "Hoạt động" : "Chờ duyệt"}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Appointments */}
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-white">Lịch hẹn gần đây</h3>
                                    <button
                                        onClick={() => navigate("/admin/appointments")}
                                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
                                    >
                                        Xem tất cả <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {recentAppointments.map((appointment) => (
                                        <div
                                            key={appointment.id}
                                            className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <span className="text-white font-medium">
                                                        {appointment.date} - {appointment.time}
                                                    </span>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                                    {appointment.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-1">
                                                <span className="font-medium">{appointment.client}</span> - {appointment.service}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                Luật sư: {appointment.lawyer} • {formatCurrency(appointment.fee)}
                                            </p>
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

export default AdminHome