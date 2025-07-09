"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    ArrowLeft,
    Search,
    Plus,
    MoreHorizontal,
    Phone,
    Mail,
    MapPin,
    DollarSign,
    Star,
    Edit,
    Trash2,
    Eye,
    Users,
    Activity,
} from "lucide-react"

// Mock data for clients
const mockClients = [
    {
        id: 1,
        name: "Nguyễn Văn An",
        avatar: "../public/images/avatar.png",
        email: "nguyenvanan@email.com",
        phone: "0901234567",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        joinDate: "2024-01-15",
        lastContact: "2025-01-16",
        status: "active",
        totalCases: 5,
        totalSpent: 2500000,
        rating: 4.8,
        category: "Dân sự",
        notes: "Khách hàng thân thiết, thường xuyên cần tư vấn về hợp đồng",
        upcomingAppointments: 2,
        completedCases: 3,
    },
    {
        id: 2,
        name: "Trần Thị Bình",
        avatar: "../public/images/avatar.png",
        email: "tranthibinh@email.com",
        phone: "0912345678",
        address: "456 Đường XYZ, Quận 3, TP.HCM",
        joinDate: "2024-02-20",
        lastContact: "2025-01-15",
        status: "active",
        totalCases: 3,
        totalSpent: 1800000,
        rating: 4.9,
        category: "Hôn nhân",
        notes: "Đang trong quá trình ly hôn, cần hỗ trợ thủ tục pháp lý",
        upcomingAppointments: 1,
        completedCases: 2,
    },
    {
        id: 3,
        name: "Lê Minh Cường",
        avatar: "../public/images/avatar.png",
        email: "leminhcuong@email.com",
        phone: "0923456789",
        address: "789 Đường DEF, Quận 7, TP.HCM",
        joinDate: "2024-03-10",
        lastContact: "2025-01-14",
        status: "inactive",
        totalCases: 2,
        totalSpent: 1200000,
        rating: 4.5,
        category: "Bất động sản",
        notes: "Khách hàng mua bán nhà đất, cần tư vấn về thủ tục chuyển nhượng",
        upcomingAppointments: 0,
        completedCases: 2,
    },
    {
        id: 4,
        name: "Phạm Thị Dung",
        avatar: "../public/images/avatar.png",
        email: "phamthidung@email.com",
        phone: "0934567890",
        address: "321 Đường GHI, Quận 5, TP.HCM",
        joinDate: "2024-04-05",
        lastContact: "2025-01-13",
        status: "active",
        totalCases: 4,
        totalSpent: 2100000,
        rating: 4.7,
        category: "Lao động",
        notes: "Nhân viên công ty, thường cần tư vấn về quyền lợi lao động",
        upcomingAppointments: 1,
        completedCases: 3,
    },
    {
        id: 5,
        name: "Hoàng Văn Em",
        avatar: "../public/images/avatar.png",
        email: "hoangvanem@email.com",
        phone: "0945678901",
        address: "654 Đường JKL, Quận 2, TP.HCM",
        joinDate: "2024-05-12",
        lastContact: "2025-01-12",
        status: "pending",
        totalCases: 1,
        totalSpent: 500000,
        rating: 4.3,
        category: "Hình sự",
        notes: "Vụ án hình sự, cần hỗ trợ pháp lý khẩn cấp",
        upcomingAppointments: 3,
        completedCases: 0,
    },
    {
        id: 6,
        name: "Võ Thị Phương",
        avatar: "../public/images/avatar.png",
        email: "vothiphuong@email.com",
        phone: "0956789012",
        address: "987 Đường MNO, Quận 4, TP.HCM",
        joinDate: "2024-06-18",
        lastContact: "2025-01-11",
        status: "active",
        totalCases: 6,
        totalSpent: 3200000,
        rating: 4.9,
        category: "Doanh nghiệp",
        notes: "Chủ doanh nghiệp, cần tư vấn về luật doanh nghiệp và thuế",
        upcomingAppointments: 2,
        completedCases: 4,
    },
]

const clientStats = {
    totalClients: 156,
    activeClients: 89,
    newThisMonth: 12,
    totalRevenue: 45600000,
    averageRating: 4.7,
    completedCases: 234,
}

export default function LawyerClients() {
    const navigate = useNavigate()
    const [clients, setClients] = useState(mockClients)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [viewMode, setViewMode] = useState("grid") // grid or list
    const [selectedClient, setSelectedClient] = useState(null)
    const [showClientModal, setShowClientModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)

    const categories = ["all", "Dân sự", "Hôn nhân", "Bất động sản", "Lao động", "Hình sự", "Doanh nghiệp"]
    const statuses = ["all", "active", "inactive", "pending"]

    const filteredClients = clients.filter((client) => {
        const matchesSearch =
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.phone.includes(searchTerm)
        const matchesCategory = selectedCategory === "all" || client.category === selectedCategory
        const matchesStatus = selectedStatus === "all" || client.status === selectedStatus
        return matchesSearch && matchesCategory && matchesStatus
    })

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-green-500/20 text-green-400 border-green-500/30"
            case "inactive":
                return "bg-gray-500/20 text-gray-400 border-gray-500/30"
            case "pending":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30"
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "active":
                return "Đang hoạt động"
            case "inactive":
                return "Không hoạt động"
            case "pending":
                return "Chờ xử lý"
            default:
                return "Không xác định"
        }
    }

    const getCategoryColor = (category) => {
        const colors = {
            "Dân sự": "bg-blue-500/20 text-blue-400",
            "Hôn nhân": "bg-pink-500/20 text-pink-400",
            "Bất động sản": "bg-green-500/20 text-green-400",
            "Lao động": "bg-purple-500/20 text-purple-400",
            "Hình sự": "bg-red-500/20 text-red-400",
            "Doanh nghiệp": "bg-amber-500/20 text-amber-400",
        }
        return colors[category] || "bg-gray-500/20 text-gray-400"
    }

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/lawyer/home")}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Quản lý Khách hàng</h1>
                                <p className="text-sm text-gray-400">Quản lý thông tin và lịch sử khách hàng</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-lg font-medium transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Thêm khách hàng</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-6">

                {/* Filters and Search */}
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm khách hàng..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none w-full sm:w-64"
                                />
                            </div>

                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category === "all" ? "Tất cả lĩnh vực" : category}
                                    </option>
                                ))}
                            </select>

                            {/* Status Filter */}
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                            >
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status === "all" ? "Tất cả trạng thái" : getStatusText(status)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-400">Hiển thị:</span>
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                                        ? "bg-amber-500 text-gray-900"
                                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                                        }`}
                                >
                                    <div className="grid grid-cols-2 gap-1 w-4 h-4">
                                        <div className="bg-current rounded-sm"></div>
                                        <div className="bg-current rounded-sm"></div>
                                        <div className="bg-current rounded-sm"></div>
                                        <div className="bg-current rounded-sm"></div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                                        ? "bg-amber-500 text-gray-900"
                                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                                        }`}
                                >
                                    <div className="space-y-1 w-4 h-4">
                                        <div className="bg-current h-1 rounded-sm"></div>
                                        <div className="bg-current h-1 rounded-sm"></div>
                                        <div className="bg-current h-1 rounded-sm"></div>
                                    </div>
                                </button>
                            </div>
                            <p className="text-sm text-gray-400">
                                Hiển thị {filteredClients.length} / {clients.length} khách hàng
                            </p>
                        </div>
                    </div>
                </div>

                {/* Clients Grid/List */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClients.map((client) => (
                            <div
                                key={client.id}
                                className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-amber-500/50 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={client.avatar || "/placeholder.svg"}
                                            alt={client.name}
                                            className="w-12 h-12 rounded-full border-2 border-gray-600"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-white">{client.name}</h3>
                                            <div
                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(client.category)}`}
                                            >
                                                {client.category}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center text-sm text-gray-400">
                                        <Mail className="h-4 w-4 mr-2" />
                                        {client.email}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <Phone className="h-4 w-4 mr-2" />
                                        {client.phone}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        <span className="truncate">{client.address}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-white">{client.totalCases}</p>
                                        <p className="text-xs text-gray-400">Tổng vụ việc</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-amber-400">{formatCurrency(client.totalSpent)}</p>
                                        <p className="text-xs text-gray-400">Tổng chi tiêu</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}
                                    >
                                        {getStatusText(client.status)}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                        <span className="text-sm text-white">{client.rating}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 mt-4">
                                    <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-lg text-sm font-medium transition-colors">
                                        <Eye className="h-4 w-4" />
                                        <span>Xem chi tiết</span>
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Khách hàng
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Liên hệ
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Lĩnh vực
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Vụ việc
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Tổng chi tiêu
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Đánh giá
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {filteredClients.map((client) => (
                                        <tr key={client.id} className="hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={client.avatar || "/placeholder.svg"}
                                                        alt={client.name}
                                                        className="w-10 h-10 rounded-full border-2 border-gray-600"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-white">{client.name}</p>
                                                        <p className="text-sm text-gray-400">ID: #{client.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <p className="text-sm text-white">{client.email}</p>
                                                    <p className="text-sm text-gray-400">{client.phone}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(client.category)}`}
                                                >
                                                    {client.category}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}
                                                >
                                                    {getStatusText(client.status)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-white">{client.totalCases}</p>
                                                    <p className="text-xs text-gray-400">vụ việc</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <p className="text-sm font-medium text-amber-400">{formatCurrency(client.totalSpent)}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                    <span className="text-sm text-white">{client.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {filteredClients.length === 0 && (
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center">
                        <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">Không tìm thấy khách hàng</h3>
                        <p className="text-gray-400 mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                        <button
                            onClick={() => {
                                setSearchTerm("")
                                setSelectedCategory("all")
                                setSelectedStatus("all")
                            }}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-lg font-medium transition-colors"
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
