"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Users,
    Calendar,
    DollarSign,
    TrendingUp,
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
} from "lucide-react"

const ManageServices = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterCategory, setFilterCategory] = useState("all")
    const [sortBy, setSortBy] = useState("name")
    const [showFilters, setShowFilters] = useState(false)
    const [selectedServices, setSelectedServices] = useState([])
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Mock data
    const [stats, setStats] = useState({
        totalServices: 24,
        activeServices: 20,
        totalBookings: 1847,
        averageRating: 4.6,
        totalRevenue: 89500000,
        popularCategory: "Dân sự",
    })

    const [services, setServices] = useState([
        {
            id: 1,
            name: "Tư vấn hôn nhân và gia đình",
            category: "Dân sự",
            description: "Tư vấn các vấn đề về hôn nhân, ly hôn, quyền nuôi con",
            price: 500000,
            duration: 60,
            bookings: 234,
            rating: 4.8,
            status: "active",
            image: "../public/images/service.png",
            lawyers: ["Luật sư Nguyễn Văn A", "Luật sư Trần Thị B"],
            createdAt: "2024-01-10",
            updatedAt: "2024-01-15",
        },
        {
            id: 2,
            name: "Tư vấn tranh chấp lao động",
            category: "Lao động",
            description: "Giải quyết tranh chấp giữa người lao động và người sử dụng lao động",
            price: 600000,
            duration: 90,
            bookings: 189,
            rating: 4.7,
            status: "active",
            image: "../public/images/service.png",
            lawyers: ["Luật sư Lê Văn C"],
            createdAt: "2024-01-08",
            updatedAt: "2024-01-12",
        },
        {
            id: 3,
            name: "Tư vấn hình sự",
            category: "Hình sự",
            description: "Bào chữa và tư vấn các vụ án hình sự",
            price: 800000,
            duration: 120,
            bookings: 156,
            rating: 4.9,
            status: "active",
            image: "../public/images/service.png",
            lawyers: ["Luật sư Phạm Văn D", "Luật sư Hoàng Thị E"],
            createdAt: "2024-01-05",
            updatedAt: "2024-01-14",
        },
        {
            id: 4,
            name: "Tư vấn bất động sản",
            category: "Dân sự",
            description: "Tư vấn mua bán, chuyển nhượng bất động sản",
            price: 700000,
            duration: 75,
            bookings: 298,
            rating: 4.6,
            status: "active",
            image: "../public/images/service.png",
            lawyers: ["Luật sư Vũ Văn F"],
            createdAt: "2024-01-03",
            updatedAt: "2024-01-13",
        },
        {
            id: 5,
            name: "Tư vấn doanh nghiệp",
            category: "Doanh nghiệp",
            description: "Tư vấn thành lập, hoạt động doanh nghiệp",
            price: 900000,
            duration: 90,
            bookings: 167,
            rating: 4.5,
            status: "paused",
            image: "../public/images/service.png",
            lawyers: ["Luật sư Đỗ Thị G", "Luật sư Bùi Văn H"],
            createdAt: "2024-01-01",
            updatedAt: "2024-01-11",
        },
    ])

    const [newService, setNewService] = useState({
        name: "",
        category: "Dân sự",
        description: "",
        price: "",
        duration: "",
        status: "active",
        image: "",
    })

    const categories = [
        { id: "dan-su", name: "Dân sự", icon: Scale, color: "blue" },
        { id: "hinh-su", name: "Hình sự", icon: Gavel, color: "red" },
        { id: "lao-dong", name: "Lao động", icon: Briefcase, color: "green" },
        { id: "doanh-nghiep", name: "Doanh nghiệp", icon: Building, color: "purple" },
        { id: "gia-dinh", name: "Gia đình", icon: Heart, color: "pink" },
        { id: "giao-thong", name: "Giao thông", icon: Car, color: "yellow" },
    ]

    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin" },
        { id: "users", label: "Quản lý người dùng", icon: Users, path: "/admin/manageCustomer" },
        { id: "lawyers", label: "Quản lý luật sư", icon: UserCheck, path: "/admin/lawyers" },
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
                return "text-green-400 bg-green-400/10"
            case "paused":
                return "text-yellow-400 bg-yellow-400/10"
            case "inactive":
                return "text-red-400 bg-red-400/10"
            default:
                return "text-gray-400 bg-gray-400/10"
        }
    }

    const getCategoryIcon = (category) => {
        const cat = categories.find((c) => c.name === category)
        return cat ? cat.icon : FileText
    }

    const getCategoryColor = (category) => {
        const cat = categories.find((c) => c.name === category)
        return cat ? cat.color : "gray"
    }

    const handleSelectService = (serviceId) => {
        setSelectedServices((prev) =>
            prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
        )
    }

    const handleSelectAll = () => {
        if (selectedServices.length === filteredServices.length) {
            setSelectedServices([])
        } else {
            setSelectedServices(filteredServices.map((service) => service.id))
        }
    }

    const handleBulkAction = (action) => {
        if (selectedServices.length === 0) return

        switch (action) {
            case "activate":
                setServices((prev) =>
                    prev.map((service) => (selectedServices.includes(service.id) ? { ...service, status: "active" } : service)),
                )
                break
            case "pause":
                setServices((prev) =>
                    prev.map((service) => (selectedServices.includes(service.id) ? { ...service, status: "paused" } : service)),
                )
                break
            case "delete":
                setServices((prev) => prev.filter((service) => !selectedServices.includes(service.id)))
                break
        }
        setSelectedServices([])
    }

    const handleStatusChange = (serviceId, newStatus) => {
        setServices((prev) =>
            prev.map((service) => (service.id === serviceId ? { ...service, status: newStatus } : service)),
        )
    }

    const handleAddService = () => {
        if (!newService.name || !newService.price || !newService.duration) return

        const service = {
            id: Date.now(),
            ...newService,
            price: Number.parseInt(newService.price),
            duration: Number.parseInt(newService.duration),
            bookings: 0,
            rating: 0,
            lawyers: [],
            createdAt: new Date().toISOString().split("T")[0],
            updatedAt: new Date().toISOString().split("T")[0],
        }

        setServices((prev) => [service, ...prev])
        setNewService({
            name: "",
            category: "Dân sự",
            description: "",
            price: "",
            duration: "",
            status: "active",
            image: "",
        })
        setShowAddModal(false)
    }

    const handleDeleteService = (serviceId) => {
        setServices((prev) => prev.filter((service) => service.id !== serviceId))
        setShowDetailModal(false)
    }

    // Filter and sort services
    const filteredServices = services
        .filter((service) => {
            const matchesSearch =
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus = filterStatus === "all" || service.status === filterStatus
            const matchesCategory = filterCategory === "all" || service.category === filterCategory
            return matchesSearch && matchesStatus && matchesCategory
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name)
                case "price":
                    return b.price - a.price
                case "bookings":
                    return b.bookings - a.bookings
                case "rating":
                    return b.rating - a.rating
                case "created":
                    return new Date(b.createdAt) - new Date(a.createdAt)
                default:
                    return 0
            }
        })

    // Pagination
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage)

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
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${item.id === "services"
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
                                <h1 className="text-2xl font-bold text-white">Quản lý dịch vụ</h1>
                                <p className="text-gray-400">Quản lý các dịch vụ tư vấn pháp lý</p>
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

                {/* Content */}
                <main className="p-6">
                    <div className="space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                            <StatCard title="Tổng dịch vụ" value={stats.totalServices} icon={FileText} change={8.2} color="blue" />
                            <StatCard title="Đang hoạt động" value={stats.activeServices} icon={Check} change={5.1} color="green" />
                            <StatCard
                                title="Tổng đặt lịch"
                                value={stats.totalBookings.toLocaleString()}
                                icon={Calendar}
                                change={12.3}
                                color="purple"
                            />
                            <StatCard title="Đánh giá TB" value={stats.averageRating} icon={Star} change={2.1} color="yellow" />
                            <StatCard
                                title="Doanh thu"
                                value={formatCurrency(stats.totalRevenue)}
                                icon={DollarSign}
                                change={15.8}
                                color="green"
                            />
                            <StatCard title="Danh mục hot" value={stats.popularCategory} icon={TrendingUp} change={7.4} color="red" />
                        </div>

                        {/* Controls */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm dịch vụ..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
                                    >
                                        <Filter className="w-4 h-4" />
                                        <span>Bộ lọc</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                                    </button>

                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Thêm dịch vụ</span>
                                    </button>
                                </div>
                            </div>

                            {/* Filters */}
                            {showFilters && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-700/30 rounded-lg">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="all">Tất cả trạng thái</option>
                                        <option value="active">Hoạt động</option>
                                        
                                        <option value="inactive">Không hoạt động</option>
                                    </select>

                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="all">Tất cả danh mục</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="name">Sắp xếp theo tên</option>
                                        <option value="price">Sắp xếp theo giá</option>
                                        <option value="bookings">Sắp xếp theo lượt đặt</option>
                                        <option value="rating">Sắp xếp theo đánh giá</option>
                                        <option value="created">Sắp xếp theo ngày tạo</option>
                                    </select>
                                </div>
                            )}

                            {/* Bulk Actions */}
                            {selectedServices.length > 0 && (
                                <div className="flex items-center justify-between p-4 bg-blue-600/10 border border-blue-500/30 rounded-lg mt-4">
                                    <span className="text-blue-400 font-medium">Đã chọn {selectedServices.length} dịch vụ</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleBulkAction("activate")}
                                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors"
                                        >
                                            Kích hoạt
                                        </button>
                                    
                                        <button
                                            onClick={() => handleBulkAction("delete")}
                                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Services Table */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-700/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedServices.length === filteredServices.length && filteredServices.length > 0}
                                                    onChange={handleSelectAll}
                                                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                                />
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Dịch vụ
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Danh mục
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Giá
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Thời gian
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Lượt đặt
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Đánh giá
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Trạng thái
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Thao tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700/50">
                                        {paginatedServices.map((service) => {
                                            const CategoryIcon = getCategoryIcon(service.category)
                                            const categoryColor = getCategoryColor(service.category)
                                            return (
                                                <tr key={service.id} className="hover:bg-gray-700/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedServices.includes(service.id)}
                                                            onChange={() => handleSelectService(service.id)}
                                                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={service.image || "/placeholder.svg?height=60&width=60"}
                                                                alt={service.name}
                                                                className="w-12 h-12 rounded-lg object-cover"
                                                            />
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-white">{service.name}</div>
                                                                <div className="text-sm text-gray-400 max-w-xs truncate">{service.description}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <CategoryIcon className={`w-4 h-4 text-${categoryColor}-400 mr-2`} />
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-medium text-${categoryColor}-400 bg-${categoryColor}-400/10`}
                                                            >
                                                                {service.category}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                                                        {formatCurrency(service.price)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{service.duration} phút</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                        {service.bookings.toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                                            <span className="text-sm text-white">{service.rating}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <select
                                                            value={service.status}
                                                            onChange={(e) => handleStatusChange(service.id, e.target.value)}
                                                            className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(
                                                                service.status,
                                                            )}`}
                                                        >
                                                            <option value="active">Hoạt động</option>
                                                          
                                                            <option value="inactive">Không hoạt động</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedService(service)
                                                                    setShowDetailModal(true)
                                                                }}
                                                                className="text-blue-400 hover:text-blue-300 p-1"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button className="text-green-400 hover:text-green-300 p-1">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteService(service.id)}
                                                                className="text-red-400 hover:text-red-300 p-1"
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
                            <div className="bg-gray-700/30 px-6 py-3 flex items-center justify-between">
                                <div className="text-sm text-gray-400">
                                    Hiển thị {startIndex + 1} đến {Math.min(startIndex + itemsPerPage, filteredServices.length)} trong tổng
                                    số {filteredServices.length} dịch vụ
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors"
                                    >
                                        Trước
                                    </button>
                                    <span className="text-sm text-gray-400">
                                        Trang {currentPage} / {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors"
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
            {showDetailModal && selectedService && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-white">Chi tiết dịch vụ</h3>
                                <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex items-start space-x-4">
                                <img
                                    src={selectedService.image || "/placeholder.svg?height=80&width=80"}
                                    alt={selectedService.name}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-white mb-2">{selectedService.name}</h4>
                                    <p className="text-gray-400 mb-3">{selectedService.description}</p>
                                    <div className="flex items-center space-x-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedService.status)}`}
                                        >
                                           {selectedService.status === "active"
                                           ? "Hoạt động"
                                           : "Không hoạt động"}
                                        </span>
                                        <span className="text-sm text-gray-400">Danh mục: {selectedService.category}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-400">Giá dịch vụ</label>
                                        <p className="text-lg font-semibold text-white">{formatCurrency(selectedService.price)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">Thời gian</label>
                                        <p className="text-lg font-semibold text-white">{selectedService.duration} phút</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">Lượt đặt</label>
                                        <p className="text-lg font-semibold text-white">{selectedService.bookings.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-400">Đánh giá</label>
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                            <p className="text-lg font-semibold text-white">{selectedService.rating}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">Ngày tạo</label>
                                        <p className="text-lg font-semibold text-white">{selectedService.createdAt}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">Cập nhật lần cuối</label>
                                        <p className="text-lg font-semibold text-white">{selectedService.updatedAt}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Luật sư phụ trách</label>
                                <div className="space-y-2">
                                    {selectedService.lawyers.map((lawyer, index) => (
                                        <div key={index} className="flex items-center space-x-2 p-2 bg-gray-700/30 rounded-lg">
                                            <UserCheck className="w-4 h-4 text-blue-400" />
                                            <span className="text-white">{lawyer}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Đóng
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                Chỉnh sửa
                            </button>
                            <button
                                onClick={() => handleDeleteService(selectedService.id)}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Service Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-white">Thêm dịch vụ mới</h3>
                                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Tên dịch vụ</label>
                                <input
                                    type="text"
                                    value={newService.name}
                                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                    placeholder="Nhập tên dịch vụ"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Danh mục</label>
                                <select
                                    value={newService.category}
                                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                >
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Mô tả</label>
                                <textarea
                                    value={newService.description}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                    placeholder="Nhập mô tả dịch vụ"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Giá (VNĐ)</label>
                                    <input
                                        type="number"
                                        value={newService.price}
                                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                        placeholder="500000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Thời gian (phút)</label>
                                    <input
                                        type="number"
                                        value={newService.duration}
                                        onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                        placeholder="60"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Trạng thái</label>
                                <select
                                    value={newService.status}
                                    onChange={(e) => setNewService({ ...newService, status: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="active">Hoạt động</option>
                                    
                                    <option value="inactive">Không hoạt động</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Hình ảnh</label>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={newService.image}
                                            onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                            placeholder="URL hình ảnh"
                                        />
                                    </div>
                                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2">
                                        <Upload className="w-4 h-4" />
                                        <span>Upload</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleAddService}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Thêm dịch vụ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageServices