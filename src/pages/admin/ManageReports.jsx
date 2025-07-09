"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Users,
    Calendar,
    DollarSign,
    TrendingUp,
    TrendingDown,
    FileText,
    Settings,
    BarChart3,
    Bell,
    Search,
    Plus,
    Eye,
    Edit,
    Trash2,
    Home,
    Menu,
    X,
    Filter,
    ChevronDown,
    Star,
    Briefcase,
    Scale,
    Building,
    Heart,
    Car,
    Gavel,
    UserCheck,
    Check,
    Upload,
    Shield,
    Download,
    Calendar as CalendarIcon,
    PieChart,
    LineChart,
    Activity,
    Target,
    Clock,
    MapPin,
    Phone,
    Mail,
} from "lucide-react"

const ManageReports = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState("month")
    const [selectedChart, setSelectedChart] = useState("revenue")
    const [dateRange, setDateRange] = useState({
        from: "2024-01-01",
        to: "2024-12-31"
    })

    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin" },
        { id: "users", label: "Quản lý người dùng", icon: Users, path: "/admin/manageCustomer" },
        { id: "lawyers", label: "Quản lý luật sư", icon: UserCheck, path: "/admin/lawyers" },
        { id: "appointments", label: "Quản lý lịch hẹn", icon: Calendar, path: "/admin/appointments" },
        { id: "services", label: "Quản lý dịch vụ", icon: FileText, path: "/admin/services" },
        { id: "reports", label: "Báo cáo", icon: BarChart3, path: "/admin/reports" },
        { id: "settings", label: "Cài đặt", icon: Settings, path: "/admin/settings" },
    ]

    // Mock data cho báo cáo
    const [reportsData, setReportsData] = useState({
        overview: {
            totalRevenue: 2450000000,
            totalBookings: 8947,
            totalUsers: 12456,
            totalLawyers: 184,
            averageRating: 4.7,
            completionRate: 94.2,
        },
        revenueData: [
            { month: "Jan", revenue: 180000000, bookings: 650 },
            { month: "Feb", revenue: 220000000, bookings: 780 },
            { month: "Mar", revenue: 195000000, bookings: 690 },
            { month: "Apr", revenue: 275000000, bookings: 890 },
            { month: "May", revenue: 310000000, bookings: 950 },
            { month: "Jun", revenue: 285000000, bookings: 840 },
            { month: "Jul", revenue: 340000000, bookings: 1020 },
            { month: "Aug", revenue: 365000000, bookings: 1150 },
            { month: "Sep", revenue: 320000000, bookings: 980 },
            { month: "Oct", revenue: 290000000, bookings: 860 },
            { month: "Nov", revenue: 275000000, bookings: 820 },
            { month: "Dec", revenue: 315000000, bookings: 920 },
        ],
        categoryData: [
            { category: "Dân sự", bookings: 2847, revenue: 980000000, percentage: 35.2 },
            { category: "Hình sự", bookings: 1925, revenue: 720000000, percentage: 26.8 },
            { category: "Lao động", bookings: 1654, revenue: 540000000, percentage: 18.3 },
            { category: "Doanh nghiệp", bookings: 1234, revenue: 450000000, percentage: 12.4 },
            { category: "Gia đình", bookings: 987, revenue: 280000000, percentage: 7.3 },
        ],
        topLawyers: [
            { id: 1, name: "Luật sư Nguyễn Văn A", bookings: 234, revenue: 78000000, rating: 4.9 },
            { id: 2, name: "Luật sư Trần Thị B", bookings: 198, revenue: 65000000, rating: 4.8 },
            { id: 3, name: "Luật sư Lê Văn C", bookings: 167, revenue: 58000000, rating: 4.7 },
            { id: 4, name: "Luật sư Phạm Thị D", bookings: 145, revenue: 52000000, rating: 4.8 },
            { id: 5, name: "Luật sư Hoàng Văn E", bookings: 132, revenue: 48000000, rating: 4.6 },
        ],
        recentBookings: [
            { id: 1, client: "Nguyễn Văn Nam", lawyer: "Luật sư Trần Văn A", service: "Tư vấn hôn nhân", amount: 500000, date: "2024-01-15", status: "completed" },
            { id: 2, client: "Lê Thị Mai", lawyer: "Luật sư Phạm Thị B", service: "Tranh chấp lao động", amount: 800000, date: "2024-01-14", status: "pending" },
            { id: 3, client: "Trần Văn Hùng", lawyer: "Luật sư Nguyễn Văn C", service: "Tư vấn bất động sản", amount: 1200000, date: "2024-01-13", status: "completed" },
            { id: 4, client: "Phạm Thị Lan", lawyer: "Luật sư Lê Thị D", service: "Tư vấn doanh nghiệp", amount: 1500000, date: "2024-01-12", status: "cancelled" },
            { id: 5, client: "Vũ Văn Đức", lawyer: "Luật sự Hoàng Văn E", service: "Tư vấn hình sự", amount: 2000000, date: "2024-01-11", status: "in_progress" },
        ]
    })

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "text-green-400 bg-green-400/10"
            case "pending":
                return "text-yellow-400 bg-yellow-400/10"
            case "in_progress":
                return "text-blue-400 bg-blue-400/10"
            case "cancelled":
                return "text-red-400 bg-red-400/10"
            default:
                return "text-gray-400 bg-gray-400/10"
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "completed":
                return "Hoàn thành"
            case "pending":
                return "Chờ xử lý"
            case "in_progress":
                return "Đang thực hiện"
            case "cancelled":
                return "Đã hủy"
            default:
                return "Không xác định"
        }
    }

    const exportReport = (type) => {
        // Logic export báo cáo
        console.log(`Exporting ${type} report...`)
    }

    const StatCard = ({ title, value, icon: Icon, change, color = "blue", format = "number" }) => {
        const formattedValue = format === "currency" ? formatCurrency(value)
            : format === "percentage" ? `${value}%`
                : typeof value === "number" ? value.toLocaleString()
                    : value

        return (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">{title}</p>
                        <p className="text-2xl font-bold text-white mt-2">{formattedValue}</p>
                        {change && (
                            <div className="flex items-center mt-2">
                                {change > 0 ? (
                                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                                ) : (
                                    <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                                )}
                                <span className={`text-sm ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {change > 0 ? '+' : ''}{change}%
                                </span>
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
    }

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
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${item.id === "reports"
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
                                <h1 className="text-2xl font-bold text-white">Báo cáo & Thống kê</h1>
                                <p className="text-gray-400">Theo dõi hiệu suất và phân tích dữ liệu kinh doanh</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => exportReport('excel')}
                                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                <span>Export Excel</span>
                            </button>
                            <button
                                onClick={() => exportReport('pdf')}
                                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                <span>Export PDF</span>
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6">
                    <div className="space-y-6">
                        {/* Time Period Filter */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Khoảng thời gian</h3>
                                    <p className="text-gray-400 text-sm">Chọn khoảng thời gian để xem báo cáo</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                    <select
                                        value={selectedPeriod}
                                        onChange={(e) => setSelectedPeriod(e.target.value)}
                                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="week">Tuần này</option>
                                        <option value="month">Tháng này</option>
                                        <option value="quarter">Quý này</option>
                                        <option value="year">Năm này</option>
                                        <option value="custom">Tùy chỉnh</option>
                                    </select>
                                    {selectedPeriod === 'custom' && (
                                        <div className="flex gap-2">
                                            <input
                                                type="date"
                                                value={dateRange.from}
                                                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                                                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="date"
                                                value={dateRange.to}
                                                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                                                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Overview Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                            <StatCard
                                title="Tổng doanh thu"
                                value={reportsData.overview.totalRevenue}
                                icon={DollarSign}
                                change={12.5}
                                color="green"
                                format="currency"
                            />
                            <StatCard
                                title="Tổng lịch hẹn"
                                value={reportsData.overview.totalBookings}
                                icon={Calendar}
                                change={8.3}
                                color="blue"
                            />
                            <StatCard
                                title="Người dùng"
                                value={reportsData.overview.totalUsers}
                                icon={Users}
                                change={15.2}
                                color="purple"
                            />
                            <StatCard
                                title="Luật sư"
                                value={reportsData.overview.totalLawyers}
                                icon={UserCheck}
                                change={5.1}
                                color="indigo"
                            />
                            <StatCard
                                title="Đánh giá TB"
                                value={reportsData.overview.averageRating}
                                icon={Star}
                                change={2.1}
                                color="yellow"
                            />
                            <StatCard
                                title="Tỷ lệ hoàn thành"
                                value={reportsData.overview.completionRate}
                                icon={Target}
                                change={1.8}
                                color="green"
                                format="percentage"
                            />
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {/* Revenue Chart */}
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-white">Doanh thu theo tháng</h3>
                                    <select
                                        value={selectedChart}
                                        onChange={(e) => setSelectedChart(e.target.value)}
                                        className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="revenue">Doanh thu</option>
                                        <option value="bookings">Lượt đặt</option>
                                    </select>
                                </div>

                                {/* Simple Chart Placeholder */}
                                <div className="h-80 bg-gray-700/30 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-400">Biểu đồ {selectedChart === 'revenue' ? 'doanh thu' : 'lượt đặt'}</p>
                                        <p className="text-gray-500 text-sm mt-2">Tích hợp thư viện chart để hiển thị</p>
                                    </div>
                                </div>

                                {/* Data Table */}
                                <div className="mt-6 overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-700">
                                                <th className="text-left text-gray-300 pb-2">Tháng</th>
                                                <th className="text-right text-gray-300 pb-2">Doanh thu</th>
                                                <th className="text-right text-gray-300 pb-2">Lượt đặt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportsData.revenueData.slice(-6).map((item, index) => (
                                                <tr key={index} className="border-b border-gray-700/50">
                                                    <td className="py-2 text-white">{item.month}</td>
                                                    <td className="py-2 text-right text-green-400 font-medium">
                                                        {formatCurrency(item.revenue)}
                                                    </td>
                                                    <td className="py-2 text-right text-blue-400 font-medium">
                                                        {item.bookings.toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Category Distribution */}
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-6">Phân bố theo danh mục</h3>

                                {/* Pie Chart Placeholder */}
                                <div className="h-48 bg-gray-700/30 rounded-lg flex items-center justify-center mb-6">
                                    <div className="text-center">
                                        <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                                        <p className="text-gray-400 text-sm">Biểu đồ tròn danh mục</p>
                                    </div>
                                </div>

                                {/* Category List */}
                                <div className="space-y-3">
                                    {reportsData.categoryData.map((category, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                                            <div>
                                                <p className="text-white font-medium">{category.category}</p>
                                                <p className="text-gray-400 text-sm">{category.bookings} lượt đặt</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-green-400 font-medium">{formatCurrency(category.revenue)}</p>
                                                <p className="text-gray-400 text-sm">{category.percentage}%</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Top Lawyers & Recent Bookings */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {/* Top Lawyers */}
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-6">Top luật sư</h3>
                                <div className="space-y-4">
                                    {reportsData.topLawyers.map((lawyer, index) => (
                                        <div key={lawyer.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-yellow-500' :
                                                        index === 1 ? 'bg-gray-400' :
                                                            index === 2 ? 'bg-orange-500' : 'bg-gray-600'
                                                    }`}>
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{lawyer.name}</p>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                        <span>{lawyer.bookings} lịch hẹn</span>
                                                        <div className="flex items-center">
                                                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                                            <span>{lawyer.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-green-400 font-medium">{formatCurrency(lawyer.revenue)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Bookings */}
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-6">Lịch hẹn gần đây</h3>
                                <div className="space-y-4">
                                    {reportsData.recentBookings.map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                            <div>
                                                <p className="text-white font-medium">{booking.client}</p>
                                                <p className="text-gray-400 text-sm">{booking.lawyer}</p>
                                                <p className="text-gray-500 text-xs">{booking.service}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-green-400 font-medium">{formatCurrency(booking.amount)}</p>
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                    {getStatusText(booking.status)}
                                                </span>
                                                <p className="text-gray-400 text-xs mt-1">{booking.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Summary Reports */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-6">Báo cáo tổng hợp</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                                    <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                    <p className="text-white font-medium">Thời gian TB/buổi</p>
                                    <p className="text-2xl font-bold text-blue-400">72 phút</p>
                                </div>
                                <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                                    <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                    <p className="text-white font-medium">Tăng trưởng</p>
                                    <p className="text-2xl font-bold text-green-400">+15.3%</p>
                                </div>
                                <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                                    <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                    <p className="text-white font-medium">Mục tiêu tháng</p>
                                    <p className="text-2xl font-bold text-purple-400">87%</p>
                                </div>
                                <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                                    <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                                    <p className="text-white font-medium">Xu hướng</p>
                                    <p className="text-2xl font-bold text-yellow-400">↗ Tăng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ManageReports