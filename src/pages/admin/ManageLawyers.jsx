"use client"
import api from "../../services/api"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link, useLocation } from "react-router-dom"
import {
    Home,
    Calendar,
    FileText,
    Users,
    UserCheck,
    BarChart3,
    Settings,
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    Eye,
    ChevronDown,
    ChevronUp,
    X,
    Star,
    MapPin,
    Phone,
    Mail,
    Briefcase,
    Award,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Menu,
    Shield,
    GraduationCap,
    Scale,
} from "lucide-react"

export default function ManageLawyers() {
    const location = useLocation()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [selectedLawyers, setSelectedLawyers] = useState([])
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedLawyer, setSelectedLawyer] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [specializationFilter, setSpecializationFilter] = useState("all")
    const [sortBy, setSortBy] = useState("name")
    const [sortOrder, setSortOrder] = useState("asc")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // API state
    const [lawyers, setLawyers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch lawyers from API
    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await api.get("/api/Lawyer")
                setLawyers(response.data || [])
            } catch (err) {
                console.error("Error fetching lawyers:", err)
                setError("Không thể tải danh sách luật sư. Vui lòng thử lại.")
            } finally {
                setLoading(false)
            }
        }

        fetchLawyers()
    }, [])

    // Statistics data
    const stats = [
        {
            title: "Tổng luật sư",
            value: "24",
            change: "+12%",
            trend: "up",
            icon: UserCheck,
            color: "bg-blue-500",
        },
        {
            title: "Đang hoạt động",
            value: "18",
            change: "+8%",
            trend: "up",
            icon: Users,
            color: "bg-green-500",
        },
        {
            title: "Tổng vụ việc",
            value: "1,247",
            change: "+15%",
            trend: "up",
            icon: Briefcase,
            color: "bg-purple-500",
        },
        {
            title: "Đánh giá TB",
            value: "4.7",
            change: "+0.2",
            trend: "up",
            icon: Star,
            color: "bg-yellow-500",
        },
        {
            title: "Tỷ lệ thành công",
            value: "89%",
            change: "+3%",
            trend: "up",
            icon: Award,
            color: "bg-indigo-500",
        },
        {
            title: "Doanh thu/tháng",
            value: "2.8B",
            change: "+18%",
            trend: "up",
            icon: DollarSign,
            color: "bg-emerald-500",
        },
    ]

    // Navigation items
    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin" },
        { id: "users", label: "Quản lý khách", icon: Users, path: "/admin/manageCustomer" },
        { id: "lawyers", label: "Quản lý luật sư", icon: Users, path: "/admin/lawyers" },
        { id: "appointments", label: "Quản lý lịch hẹn", icon: Calendar, path: "/admin/appointments" },
        { id: "services", label: "Quản lý dịch vụ", icon: FileText, path: "/admin/services" },
        { id: "reports", label: "Báo cáo", icon: BarChart3, path: "/admin/reports" },
        { id: "settings", label: "Cài đặt", icon: Settings, path: "/admin/settings" },
    ]

    // Specialization options
    const specializations = ["Dân sự", "Hình sự", "Lao động", "Thương mại", "Gia đình", "Bất động sản", "Sở hữu trí tuệ"]

    // Filter and search logic
    const filteredLawyers = lawyers.filter((lawyer) => {
        const matchesSearch =
            lawyer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lawyer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lawyer.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || lawyer.status === statusFilter
        const matchesSpecialization = specializationFilter === "all" || lawyer.specialization === specializationFilter

        return matchesSearch && matchesStatus && matchesSpecialization
    })

    // Sort logic
    const sortedLawyers = [...filteredLawyers].sort((a, b) => {
        let aValue = a[sortBy]
        let bValue = b[sortBy]

        if (typeof aValue === "string") {
            aValue = aValue.toLowerCase()
            bValue = bValue.toLowerCase()
        }

        if (sortOrder === "asc") {
            return aValue > bValue ? 1 : -1
        } else {
            return aValue < bValue ? 1 : -1
        }
    })

    // Pagination
    const totalPages = Math.ceil(sortedLawyers.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedLawyers = sortedLawyers.slice(startIndex, startIndex + itemsPerPage)

    // Handle checkbox selection
    const handleSelectLawyer = (lawyerId) => {
        setSelectedLawyers((prev) => (prev.includes(lawyerId) ? prev.filter((id) => id !== lawyerId) : [...prev, lawyerId]))
    }

    const handleSelectAll = () => {
        if (selectedLawyers.length === paginatedLawyers.length) {
            setSelectedLawyers([])
        } else {
            setSelectedLawyers(paginatedLawyers.map((lawyer) => lawyer.id))
        }
    }

    // Handle bulk actions
    const handleBulkAction = (action) => {
        console.log(`Bulk ${action} for lawyers:`, selectedLawyers)
        setSelectedLawyers([])
    }

    // Handle status change
    const handleStatusChange = (lawyerId, newStatus) => {
        setLawyers((prev) => prev.map((lawyer) => (lawyer.id === lawyerId ? { ...lawyer, status: newStatus } : lawyer)))
    }

    // Get specialization icon
    const getSpecializationIcon = (specialization) => {
        const icons = {
            "Dân sự": Scale,
            "Hình sự": Shield,
            "Lao động": Briefcase,
            "Thương mại": DollarSign,
            "Gia đình": Users,
            "Bất động sản": Home,
            "Sở hữu trí tuệ": GraduationCap,
        }
        return icons[specialization] || Scale
    }

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Đang tải dữ liệu...</div>
            </div>
        )
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-red-400 text-xl">{error}</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Mobile sidebar overlay */}
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
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${item.id === "lawyers"
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

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Header */}
                <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-400 hover:text-white"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Quản lý luật sư</h1>
                                <p className="text-gray-400">Quản lý và giám sát luật sư trong hệ thống</p>
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

                {/* Main content area */}
                <main className="p-6">
                    <div className="space-y-6">
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon
                                const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

                                return (
                                    <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
                                        <div className="flex items-center justify-between">
                                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div
                                                className={`flex items-center text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"
                                                    }`}
                                            >
                                                <TrendIcon className="w-4 h-4 mr-1" />
                                                {stat.change}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                            <p className="text-gray-400 text-sm">{stat.title}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Search and Filters */}
                        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div className="flex-1 max-w-md">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm luật sư..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        <Filter className="w-4 h-4 mr-2" />
                                        Bộ lọc
                                        {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                                    </button>

                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Thêm luật sư
                                    </button>
                                </div>
                            </div>

                            {/* Filters */}
                            {showFilters && (
                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Trạng thái</label>
                                            <select
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="all">Tất cả</option>
                                                <option value="active">Hoạt động</option>
                                                <option value="inactive">Tạm dừng</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Chuyên môn</label>
                                            <select
                                                value={specializationFilter}
                                                onChange={(e) => setSpecializationFilter(e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="all">Tất cả</option>
                                                {specializations.map((spec) => (
                                                    <option key={spec} value={spec}>
                                                        {spec}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Sắp xếp theo</label>
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="name">Tên</option>
                                                <option value="experience">Kinh nghiệm</option>
                                                <option value="rating">Đánh giá</option>
                                                <option value="totalCases">Số vụ việc</option>
                                                <option value="hourlyRate">Phí dịch vụ</option>
                                                <option value="joinDate">Ngày tham gia</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Thứ tự</label>
                                            <select
                                                value={sortOrder}
                                                onChange={(e) => setSortOrder(e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="asc">Tăng dần</option>
                                                <option value="desc">Giảm dần</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bulk Actions */}
                        {selectedLawyers.length > 0 && (
                            <div className="bg-blue-600 rounded-lg p-4 mb-6 flex items-center justify-between">
                                <span className="text-white">Đã chọn {selectedLawyers.length} luật sư</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleBulkAction("activate")}
                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                    >
                                        Kích hoạt
                                    </button>
                                    <button
                                        onClick={() => handleBulkAction("deactivate")}
                                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                                    >
                                        Tạm dừng
                                    </button>
                                    <button
                                        onClick={() => handleBulkAction("delete")}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Lawyers Table */}
                        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLawyers.length === paginatedLawyers.length && paginatedLawyers.length > 0}
                                                    onChange={handleSelectAll}
                                                    className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                                                />
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Luật sư
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Chuyên môn
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Kinh nghiệm
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Đánh giá
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Vụ việc
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Phí/giờ
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Thao tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {paginatedLawyers.map((lawyer) => {
                                            const SpecIcon = getSpecializationIcon(lawyer.specialization)

                                            return (
                                                <tr key={lawyer.id} className="hover:bg-gray-700 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedLawyers.includes(lawyer.id)}
                                                            onChange={() => handleSelectLawyer(lawyer.id)}
                                                            className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={lawyer.avatar || "/placeholder.svg"}
                                                                alt={lawyer.name}
                                                                className="w-10 h-10 rounded-full mr-3"
                                                            />
                                                            <div>
                                                                <div className="text-sm font-medium text-white">{lawyer.name}</div>
                                                                <div className="text-sm text-gray-400">{lawyer.email}</div>
                                                                <div className="text-xs text-gray-500 flex items-center mt-1">
                                                                    <MapPin className="w-3 h-3 mr-1" />
                                                                    {lawyer.location}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <SpecIcon className="w-4 h-4 mr-2 text-blue-400" />
                                                            <span className="text-sm text-white">{lawyer.specialization}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-white">{lawyer.experience} năm</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                                            <span className="text-sm text-white">{lawyer.rating}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <div className="text-sm text-white">{lawyer.totalCases}</div>
                                                            <div className="text-xs text-green-400">{lawyer.successRate}% thành công</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-white">{lawyer.hourlyRate?.toLocaleString("vi-VN")}đ</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedLawyer(lawyer)
                                                                    setShowDetailModal(true)
                                                                }}
                                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                                                title="Xem chi tiết"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedLawyer(lawyer)
                                                                    setShowAddModal(true)
                                                                }}
                                                                className="text-green-400 hover:text-green-300 transition-colors"
                                                                title="Chỉnh sửa"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => console.log("Delete lawyer:", lawyer.id)}
                                                                className="text-red-400 hover:text-red-300 transition-colors"
                                                                title="Xóa"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="bg-gray-700 px-6 py-3 flex items-center justify-between border-t border-gray-600">
                                <div className="flex items-center text-sm text-gray-300">
                                    Hiển thị {startIndex + 1} đến {Math.min(startIndex + itemsPerPage, sortedLawyers.length)} trong tổng
                                    số {sortedLawyers.length} luật sư
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Trước
                                    </button>
                                    <span className="text-sm text-gray-300">
                                        Trang {currentPage} / {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Sau
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedLawyer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-700">
                            <h3 className="text-lg font-semibold text-white">Chi tiết luật sư</h3>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="text-gray-400 hover:text-gray-200 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex items-start space-x-6 mb-6">
                                <img
                                    src={selectedLawyer.avatar || "/placeholder.svg"}
                                    alt={selectedLawyer.name}
                                    className="w-20 h-20 rounded-full"
                                />
                                <div className="flex-1">
                                    <h4 className="text-xl font-semibold text-white mb-2">{selectedLawyer.name}</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center text-gray-300">
                                            <Mail className="w-4 h-4 mr-2" />
                                            {selectedLawyer.email}
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <Phone className="w-4 h-4 mr-2" />
                                            {selectedLawyer.phone}
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {selectedLawyer.location}
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <GraduationCap className="w-4 h-4 mr-2" />
                                            {selectedLawyer.education}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-white">{selectedLawyer.experience}</div>
                                    <div className="text-sm text-gray-400">Năm kinh nghiệm</div>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-white flex items-center justify-center">
                                        <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                        {selectedLawyer.rating}
                                    </div>
                                    <div className="text-sm text-gray-400">Đánh giá</div>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-white">{selectedLawyer.totalCases}</div>
                                    <div className="text-sm text-gray-400">Tổng vụ việc</div>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-green-400">{selectedLawyer.successRate}%</div>
                                    <div className="text-sm text-gray-400">Tỷ lệ thành công</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Chuyên môn</label>
                                    <div className="flex items-center">
                                        {React.createElement(getSpecializationIcon(selectedLawyer.specialization), {
                                            className: "w-4 h-4 mr-2 text-blue-400",
                                        })}
                                        <span className="text-white">{selectedLawyer.specialization}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Số giấy phép</label>
                                    <p className="text-white">{selectedLawyer.license}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Phí dịch vụ</label>
                                    <p className="text-white">{selectedLawyer.hourlyRate?.toLocaleString("vi-VN")}đ/giờ</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Ngày tham gia</label>
                                        <p className="text-white">{selectedLawyer.joinDate ? new Date(selectedLawyer.joinDate).toLocaleDateString("vi-VN") : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Hoạt động cuối</label>
                                        <p className="text-white">{selectedLawyer.lastActive || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
                            <button
                                onClick={() => {
                                    setShowDetailModal(false)
                                    setSelectedLawyer({ ...selectedLawyer })
                                    setShowAddModal(true)
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Chỉnh sửa
                            </button>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-700">
                            <h3 className="text-lg font-semibold text-white">
                                {selectedLawyer ? "Chỉnh sửa luật sư" : "Thêm luật sư mới"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false)
                                    setSelectedLawyer(null)
                                }}
                                className="text-gray-400 hover:text-gray-200 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Họ tên *</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedLawyer?.name || ""}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập họ tên"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        defaultValue={selectedLawyer?.email || ""}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập email"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Số điện thoại *</label>
                                    <input
                                        type="tel"
                                        defaultValue={selectedLawyer?.phone || ""}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Chuyên môn *</label>
                                    <select
                                        defaultValue={selectedLawyer?.specialization || ""}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Chọn chuyên môn</option>
                                        {specializations.map((spec) => (
                                            <option key={spec} value={spec}>
                                                {spec}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Kinh nghiệm (năm) *</label>
                                    <input
                                        type="number"
                                        defaultValue={selectedLawyer?.experience || ""}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập số năm kinh nghiệm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phí dịch vụ (đ/giờ) *</label>
                                    <input
                                        type="number"
                                        defaultValue={selectedLawyer?.hourlyRate || ""}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập phí dịch vụ"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Địa điểm *</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedLawyer?.location || ""}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập địa điểm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Số giấy phép *</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedLawyer?.license || ""}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập số giấy phép"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Học vấn *</label>
                                <input
                                    type="text"
                                    defaultValue={selectedLawyer?.education || ""}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập thông tin học vấn"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Trạng thái</label>
                                <select
                                    defaultValue={selectedLawyer?.status || "active"}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Tạm dừng</option>
                                </select>
                            </div>
                        </form>

                        <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
                            <button
                                onClick={() => {
                                    setShowAddModal(false)
                                    setSelectedLawyer(null)
                                }}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => {
                                    console.log("Save lawyer")
                                    setShowAddModal(false)
                                    setSelectedLawyer(null)
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {selectedLawyer ? "Cập nhật" : "Thêm mới"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}