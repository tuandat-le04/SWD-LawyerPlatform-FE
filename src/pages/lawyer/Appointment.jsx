"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    Calendar,
    Clock,
    User,
    Phone,
    Video,
    MapPin,
    Search,
    Filter,
    Plus,
    CheckCircle,
    XCircle,
    Edit,
    Eye,
    Trash2,
    ArrowLeft,
    DollarSign,
} from "lucide-react"

// Mock data for appointments
const mockAppointments = [
    {
        id: 1,
        clientName: "Nguyễn Văn An",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        clientPhone: "0901234567",
        clientEmail: "nguyenvanan@email.com",
        type: "online",
        date: "2025-01-17",
        time: "14:00",
        duration: 60,
        status: "confirmed",
        topic: "Luật Dân sự - Tranh chấp hợp đồng",
        description: "Tư vấn về tranh chấp hợp đồng mua bán nhà đất với bên thứ ba",
        fee: 500000,
        location: "Google Meet",
        notes: "Khách hàng đã chuẩn bị đầy đủ hồ sơ",
        priority: "high",
    },
    {
        id: 2,
        clientName: "Trần Thị Bình",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        clientPhone: "0912345678",
        clientEmail: "tranthib@email.com",
        type: "offline",
        date: "2025-01-17",
        time: "16:30",
        duration: 90,
        status: "pending",
        topic: "Luật Hôn nhân - Thủ tục ly hôn",
        description: "Hướng dẫn thủ tục ly hôn và phân chia tài sản",
        fee: 750000,
        location: "Văn phòng luật sư - Tầng 5",
        notes: "Cần mang theo giấy kết hôn và sổ đỏ",
        priority: "medium",
    },
    {
        id: 3,
        clientName: "Lê Minh Cường",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        clientPhone: "0923456789",
        clientEmail: "leminhcuong@email.com",
        type: "phone",
        date: "2025-01-18",
        time: "09:00",
        duration: 30,
        status: "confirmed",
        topic: "Luật Bất động sản - Mua bán nhà đất",
        description: "Tư vấn về quy trình mua bán nhà đất và các rủi ro pháp lý",
        fee: 300000,
        location: "Cuộc gọi điện thoại",
        notes: "Khách hàng mới, cần giải thích chi tiết",
        priority: "low",
    },
    {
        id: 4,
        clientName: "Phạm Thị Dung",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        clientPhone: "0934567890",
        clientEmail: "phamthidung@email.com",
        type: "online",
        date: "2025-01-18",
        time: "15:00",
        duration: 60,
        status: "completed",
        topic: "Luật Lao động - Chấm dứt hợp đồng",
        description: "Tư vấn về quyền lợi khi chấm dứt hợp đồng lao động",
        fee: 500000,
        location: "Zoom Meeting",
        notes: "Đã hoàn thành tư vấn, khách hàng hài lòng",
        priority: "medium",
    },
    {
        id: 5,
        clientName: "Hoàng Văn Đức",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        clientPhone: "0945678901",
        clientEmail: "hoangvanduc@email.com",
        type: "offline",
        date: "2025-01-19",
        time: "10:30",
        duration: 120,
        status: "confirmed",
        topic: "Luật Doanh nghiệp - Thành lập công ty",
        description: "Hướng dẫn thủ tục thành lập công ty TNHH và các vấn đề pháp lý",
        fee: 1000000,
        location: "Văn phòng luật sư - Phòng họp A",
        notes: "Khách hàng VIP, cần chuẩn bị tài liệu chi tiết",
        priority: "high",
    },
    {
        id: 6,
        clientName: "Vũ Thị Hoa",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        clientPhone: "0956789012",
        clientEmail: "vuthihoa@email.com",
        type: "phone",
        date: "2025-01-19",
        time: "14:00",
        duration: 45,
        status: "cancelled",
        topic: "Luật Gia đình - Nuôi con sau ly hôn",
        description: "Tư vấn về quyền nuôi con và nghĩa vụ cấp dưỡng",
        fee: 400000,
        location: "Cuộc gọi điện thoại",
        notes: "Khách hàng hủy do bận việc đột xuất",
        priority: "low",
    },
]

const typeConfig = {
    online: {
        label: "Trực tuyến",
        icon: Video,
        color: "text-blue-400",
        bgColor: "bg-blue-500/20",
    },
    offline: {
        label: "Trực tiếp",
        icon: User,
        color: "text-amber-400",
        bgColor: "bg-amber-500/20",
    },
    phone: {
        label: "Điện thoại",
        icon: Phone,
        color: "text-green-400",
        bgColor: "bg-green-500/20",
    },
}

const statusConfig = {
    confirmed: {
        label: "Đã xác nhận",
        color: "text-green-400",
        bgColor: "bg-green-500/20",
        borderColor: "border-green-500/30",
    },
    pending: {
        label: "Chờ xác nhận",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500/30",
    },
    completed: {
        label: "Hoàn thành",
        color: "text-blue-400",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500/30",
    },
    cancelled: {
        label: "Đã hủy",
        color: "text-red-400",
        bgColor: "bg-red-500/20",
        borderColor: "border-red-500/30",
    },
}

const priorityConfig = {
    high: {
        label: "Cao",
        color: "text-red-400",
        bgColor: "bg-red-500/20",
    },
    medium: {
        label: "Trung bình",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/20",
    },
    low: {
        label: "Thấp",
        color: "text-green-400",
        bgColor: "bg-green-500/20",
    },
}

export default function LawyerAppointments() {
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState(mockAppointments)
    const [filteredAppointments, setFilteredAppointments] = useState(mockAppointments)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [dateFilter, setDateFilter] = useState("all")
    const [viewMode, setViewMode] = useState("list") // list, calendar
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [showDetails, setShowDetails] = useState(false)

    // Filter appointments based on search and filters
    useEffect(() => {
        let filtered = appointments

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (apt) =>
                    apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    apt.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    apt.clientPhone.includes(searchTerm),
            )
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter((apt) => apt.status === statusFilter)
        }

        // Type filter
        if (typeFilter !== "all") {
            filtered = filtered.filter((apt) => apt.type === typeFilter)
        }

        // Date filter
        if (dateFilter !== "all") {
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)
            const nextWeek = new Date(today)
            nextWeek.setDate(nextWeek.getDate() + 7)

            filtered = filtered.filter((apt) => {
                const aptDate = new Date(apt.date)
                switch (dateFilter) {
                    case "today":
                        return aptDate.toDateString() === today.toDateString()
                    case "tomorrow":
                        return aptDate.toDateString() === tomorrow.toDateString()
                    case "week":
                        return aptDate >= today && aptDate <= nextWeek
                    default:
                        return true
                }
            })
        }

        setFilteredAppointments(filtered)
    }, [appointments, searchTerm, statusFilter, typeFilter, dateFilter])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const handleStatusChange = (appointmentId, newStatus) => {
        setAppointments(appointments.map((apt) => (apt.id === appointmentId ? { ...apt, status: newStatus } : apt)))
    }

    const handleDeleteAppointment = (appointmentId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa lịch hẹn này?")) {
            setAppointments(appointments.filter((apt) => apt.id !== appointmentId))
        }
    }

    const getStats = () => {
        const total = appointments.length
        const confirmed = appointments.filter((apt) => apt.status === "confirmed").length
        const pending = appointments.filter((apt) => apt.status === "pending").length
        const completed = appointments.filter((apt) => apt.status === "completed").length
        const totalRevenue = appointments.filter((apt) => apt.status === "completed").reduce((sum, apt) => sum + apt.fee, 0)

        return { total, confirmed, pending, completed, totalRevenue }
    }

    const stats = getStats()

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
                                <h1 className="text-2xl font-bold text-white">Quản lý Lịch hẹn</h1>
                                <p className="text-sm text-gray-400">Quản lý và theo dõi tất cả lịch hẹn của bạn</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-lg font-medium transition-colors">
                                <Plus className="h-4 w-4" />
                                <span>Tạo lịch hẹn mới</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-80 bg-gray-800 border-r border-gray-700 min-h-screen">
                    <div className="p-6">
                        {/* Quick Stats */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Thống kê nhanh</h3>
                            <div className="space-y-3">
                                <div className="bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-blue-500/20 p-2 rounded-lg">
                                                <Calendar className="h-4 w-4 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Tổng lịch hẹn</p>
                                                <p className="text-lg font-semibold text-white">{stats.total}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-green-500/20 p-2 rounded-lg">
                                                <CheckCircle className="h-4 w-4 text-green-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Đã xác nhận</p>
                                                <p className="text-lg font-semibold text-white">{stats.confirmed}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-yellow-500/20 p-2 rounded-lg">
                                                <Clock className="h-4 w-4 text-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Chờ xác nhận</p>
                                                <p className="text-lg font-semibold text-white">{stats.pending}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-amber-500/20 p-2 rounded-lg">
                                                <DollarSign className="h-4 w-4 text-amber-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Doanh thu</p>
                                                <p className="text-lg font-semibold text-white">{formatCurrency(stats.totalRevenue)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* View Toggle */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-400 mb-3">Chế độ xem</h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${viewMode === "list" ? "bg-amber-500 text-gray-900" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        }`}
                                >
                                    Danh sách
                                </button>
                                <button
                                    onClick={() => setViewMode("calendar")}
                                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${viewMode === "calendar"
                                        ? "bg-amber-500 text-gray-900"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        }`}
                                >
                                    Lịch
                                </button>
                            </div>
                        </div>

                        {/* Upcoming Appointments */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-3">Lịch hẹn sắp tới</h3>
                            <div className="space-y-3">
                                {appointments
                                    .filter((apt) => apt.status === "confirmed" && new Date(apt.date) >= new Date())
                                    .slice(0, 3)
                                    .map((apt) => {
                                        const TypeIcon = typeConfig[apt.type].icon
                                        return (
                                            <div key={apt.id} className="bg-gray-700/50 rounded-lg p-3">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={apt.clientAvatar || "/placeholder.svg"}
                                                        alt={apt.clientName}
                                                        className="w-8 h-8 rounded-full border border-gray-600"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-white truncate">{apt.clientName}</p>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <TypeIcon className={`h-3 w-3 ${typeConfig[apt.type].color}`} />
                                                            <span className="text-xs text-gray-400">{apt.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Filters */}
                    <div className="mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên, chủ đề, số điện thoại..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex space-x-4">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                                >
                                    <option value="all">Tất cả trạng thái</option>
                                    <option value="confirmed">Đã xác nhận</option>
                                    <option value="pending">Chờ xác nhận</option>
                                    <option value="completed">Hoàn thành</option>
                                    <option value="cancelled">Đã hủy</option>
                                </select>

                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                                >
                                    <option value="all">Tất cả loại</option>
                                    <option value="online">Trực tuyến</option>
                                    <option value="offline">Trực tiếp</option>
                                    <option value="phone">Điện thoại</option>
                                </select>

                                <select
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                                >
                                    <option value="all">Tất cả ngày</option>
                                    <option value="today">Hôm nay</option>
                                    <option value="tomorrow">Ngày mai</option>
                                    <option value="week">Tuần này</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Appointments List */}
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">Danh sách lịch hẹn ({filteredAppointments.length})</h2>
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                        <Filter className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-700">
                            {filteredAppointments.map((appointment) => {
                                const TypeIcon = typeConfig[appointment.type].icon
                                const statusConfig_ = statusConfig[appointment.status]
                                const priorityConfig_ = priorityConfig[appointment.priority]

                                return (
                                    <div key={appointment.id} className="p-6 hover:bg-gray-700/30 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={appointment.clientAvatar || "/placeholder.svg"}
                                                    alt={appointment.clientName}
                                                    className="w-12 h-12 rounded-full border-2 border-gray-600"
                                                />
                                                <div>
                                                    <div className="flex items-center space-x-3">
                                                        <h3 className="text-lg font-semibold text-white">{appointment.clientName}</h3>
                                                        <div
                                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityConfig_.bgColor} ${priorityConfig_.color}`}
                                                        >
                                                            Ưu tiên {priorityConfig_.label}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-400 mt-1">{appointment.topic}</p>
                                                    <p className="text-sm text-gray-500 mt-1">{appointment.description}</p>
                                                    <div className="flex items-center space-x-6 mt-3">
                                                        <div className="flex items-center space-x-2">
                                                            <Calendar className="h-4 w-4 text-gray-400" />
                                                            <span className="text-sm text-gray-300">{formatDate(appointment.date)}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Clock className="h-4 w-4 text-gray-400" />
                                                            <span className="text-sm text-gray-300">
                                                                {appointment.time} ({appointment.duration} phút)
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <TypeIcon className={`h-4 w-4 ${typeConfig[appointment.type].color}`} />
                                                            <span className="text-sm text-gray-300">{typeConfig[appointment.type].label}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <MapPin className="h-4 w-4 text-gray-400" />
                                                            <span className="text-sm text-gray-300">{appointment.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <div className="text-right">
                                                    <div
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusConfig_.bgColor} ${statusConfig_.color} ${statusConfig_.borderColor}`}
                                                    >
                                                        {statusConfig_.label}
                                                    </div>
                                                    <p className="text-amber-400 font-semibold mt-2">{formatCurrency(appointment.fee)}</p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center space-x-2">
                                                    {appointment.status === "pending" && (
                                                        <>
                                                            <button
                                                                onClick={() => handleStatusChange(appointment.id, "confirmed")}
                                                                className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                                                                title="Xác nhận"
                                                            >
                                                                <CheckCircle className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(appointment.id, "cancelled")}
                                                                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                                                title="Hủy"
                                                            >
                                                                <XCircle className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                    {appointment.status === "confirmed" && (
                                                        <button
                                                            onClick={() => handleStatusChange(appointment.id, "completed")}
                                                            className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                                            title="Hoàn thành"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            setSelectedAppointment(appointment)
                                                            setShowDetails(true)
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                                        title="Xem chi tiết"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAppointment(appointment.id)}
                                                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                                        title="Xóa"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {appointment.notes && (
                                            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg">
                                                <p className="text-sm text-gray-300">
                                                    <span className="font-medium text-amber-400">Ghi chú:</span> {appointment.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {filteredAppointments.length === 0 && (
                            <div className="p-12 text-center">
                                <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-400 mb-2">Không có lịch hẹn nào</h3>
                                <p className="text-gray-500">Không tìm thấy lịch hẹn phù hợp với bộ lọc hiện tại.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Appointment Details Modal */}
            {showDetails && selectedAppointment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">Chi tiết lịch hẹn</h2>
                                <button
                                    onClick={() => setShowDetails(false)}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <XCircle className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-start space-x-6">
                                <img
                                    src={selectedAppointment.clientAvatar || "/placeholder.svg"}
                                    alt={selectedAppointment.clientName}
                                    className="w-16 h-16 rounded-full border-2 border-gray-600"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-xl font-semibold text-white">{selectedAppointment.clientName}</h3>
                                        <div
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[selectedAppointment.status].bgColor} ${statusConfig[selectedAppointment.status].color} ${statusConfig[selectedAppointment.status].borderColor}`}
                                        >
                                            {statusConfig[selectedAppointment.status].label}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 mb-4">{selectedAppointment.topic}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-300">{selectedAppointment.clientPhone}</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-300">{formatDate(selectedAppointment.date)}</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Clock className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-300">
                                                    {selectedAppointment.time} ({selectedAppointment.duration} phút)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                {React.createElement(typeConfig[selectedAppointment.type].icon, {
                                                    className: `h-4 w-4 ${typeConfig[selectedAppointment.type].color}`,
                                                })}
                                                <span className="text-gray-300">{typeConfig[selectedAppointment.type].label}</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-300">{selectedAppointment.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <DollarSign className="h-4 w-4 text-gray-400" />
                                                <span className="text-amber-400 font-semibold">{formatCurrency(selectedAppointment.fee)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-gray-400 mb-2">Mô tả chi tiết</h4>
                                        <p className="text-gray-300 bg-gray-700/30 p-3 rounded-lg">{selectedAppointment.description}</p>
                                    </div>

                                    {selectedAppointment.notes && (
                                        <div className="mb-6">
                                            <h4 className="text-sm font-medium text-gray-400 mb-2">Ghi chú</h4>
                                            <p className="text-gray-300 bg-gray-700/30 p-3 rounded-lg">{selectedAppointment.notes}</p>
                                        </div>
                                    )}

                                    <div className="flex space-x-3">
                                        {selectedAppointment.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        handleStatusChange(selectedAppointment.id, "confirmed")
                                                        setShowDetails(false)
                                                    }}
                                                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                    <span>Xác nhận</span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleStatusChange(selectedAppointment.id, "cancelled")
                                                        setShowDetails(false)
                                                    }}
                                                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                    <span>Hủy</span>
                                                </button>
                                            </>
                                        )}
                                        {selectedAppointment.status === "confirmed" && (
                                            <button
                                                onClick={() => {
                                                    handleStatusChange(selectedAppointment.id, "completed")
                                                    setShowDetails(false)
                                                }}
                                                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                                <span>Hoàn thành</span>
                                            </button>
                                        )}
                                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                                            <Edit className="h-4 w-4" />
                                            <span>Chỉnh sửa</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
