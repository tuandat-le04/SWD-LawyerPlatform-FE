"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Users,
    Calendar,
    DollarSign,
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
    Home,
    Menu,
    X,
    Download,
    Upload,
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock,
    Phone,
    Video,
    MapPin,
    Filter,
    MoreHorizontal,
    ChevronDown,
    ChevronUp,
    RefreshCw,
} from "lucide-react"

const ManageAppointments = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterType, setFilterType] = useState("all")
    const [sortBy, setSortBy] = useState("date")
    const [sortOrder, setSortOrder] = useState("desc")
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedAppointments, setSelectedAppointments] = useState([])
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showFilters, setShowFilters] = useState(false)

    // Mock data - Statistics
    const [stats, setStats] = useState({
        total: 156,
        confirmed: 89,
        pending: 23,
        completed: 34,
        cancelled: 10,
        revenue: 45600000,
    })

    // Mock data - Appointments
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            client: {
                name: "Trần Văn An",
                email: "an.tran@email.com",
                phone: "0945678901",
                avatar: "../public/images/avatar.png",
            },
            lawyer: {
                name: "Luật sư Nguyễn Thị Hoa",
                email: "hoa.nguyen@lawfirm.com",
                specialization: "Luật Dân sự",
                avatar: "../public/images/avatar.png",
            },
            date: "2024-01-20",
            time: "09:30",
            duration: "60 phút",
            type: "Tư vấn trực tiếp",
            subject: "Tranh chấp hợp đồng mua bán",
            description: "Khách hàng cần tư vấn về tranh chấp hợp đồng mua bán nhà đất với bên thứ ba",
            fee: 800000,
            status: "confirmed",
            location: "Văn phòng luật sư - Tầng 5, Tòa nhà ABC",
            notes: "Khách hàng đã chuẩn bị đầy đủ hồ sơ pháp lý",
            createdAt: "2024-01-15T10:30:00Z",
            updatedAt: "2024-01-18T14:20:00Z",
        },
        {
            id: 2,
            client: {
                name: "Lê Thị Bình",
                email: "binh.le@email.com",
                phone: "0934567890",
                avatar: "../public/images/avatar.png",
            },
            lawyer: {
                name: "Luật sư Phạm Văn Cường",
                email: "cuong.pham@lawfirm.com",
                specialization: "Luật Hình sự",
                avatar: "../public/images/avatar.png",
            },
            date: "2024-01-19",
            time: "14:00",
            duration: "45 phút",
            type: "Tư vấn trực tiếp",
            subject: "Thủ tục ly hôn",
            description: "Tư vấn về thủ tục và quy trình ly hôn thuận tình",
            fee: 300000,
            status: "completed",
            location: "Tư vấn trực tiếp",
            notes: "Cuộc gọi đã hoàn thành thành công, khách hàng hài lòng",
            createdAt: "2024-01-12T09:15:00Z",
            updatedAt: "2024-01-19T14:45:00Z",
        },
        {
            id: 3,
            client: {
                name: "Hoàng Minh Đức",
                email: "duc.hoang@email.com",
                phone: "0923456789",
                avatar: "../public/images/avatar.png",
            },
            lawyer: {
                name: "Luật sư Vũ Thị Lan",
                email: "lan.vu@lawfirm.com",
                specialization: "Luật Doanh nghiệp",
                avatar: "../public/images/avatar.png",
            },
            date: "2024-01-22",
            time: "10:15",
            duration: "90 phút",
            type: "Tư vấn online",
            subject: "Thành lập công ty",
            description: "Hướng dẫn thủ tục thành lập công ty TNHH và các vấn đề pháp lý liên quan",
            fee: 600000,
            status: "pending",
            location: "Zoom Meeting",
            notes: "Chờ xác nhận từ luật sư, khách hàng đã thanh toán trước",
            createdAt: "2024-01-16T11:20:00Z",
            updatedAt: "2024-01-18T16:30:00Z",
        },
        {
            id: 4,
            client: {
                name: "Nguyễn Thị Mai",
                email: "mai.nguyen@email.com",
                phone: "0912345678",
                avatar: "../public/images/avatar.png",
            },
            lawyer: {
                name: "Luật sư Đỗ Văn Nam",
                email: "nam.do@lawfirm.com",
                specialization: "Luật Lao động",
                avatar: "../public/images/avatar.png",
            },
            date: "2024-01-18",
            time: "16:30",
            duration: "30 phút",
            type: "Tư vấn trực tiếp",
            subject: "Tranh chấp lao động",
            description: "Tư vấn về quyền lợi người lao động khi bị sa thải bất hợp pháp",
            fee: 400000,
            status: "cancelled",
            location: "Văn phòng luật sư - Tầng 3, Tòa nhà XYZ",
            notes: "Khách hàng hủy do bận việc đột xuất, sẽ đặt lịch lại",
            createdAt: "2024-01-10T08:45:00Z",
            updatedAt: "2024-01-17T12:15:00Z",
        },
        {
            id: 5,
            client: {
                name: "Trần Văn Hùng",
                email: "hung.tran@email.com",
                phone: "0987654321",
                avatar: "../public/images/avatar.png",
            },
            lawyer: {
                name: "Luật sư Lê Thị Hương",
                email: "huong.le@lawfirm.com",
                specialization: "Luật Bất động sản",
                avatar: "../public/images/avatar.png",
            },
            date: "2024-01-21",
            time: "11:00",
            duration: "120 phút",
            type: "Tư vấn trực tiếp",
            subject: "Tranh chấp bất động sản",
            description: "Tư vấn về tranh chấp quyền sở hữu đất đai và thủ tục pháp lý",
            fee: 1200000,
            status: "confirmed",
            location: "Văn phòng luật sư - Phòng họp A",
            notes: "Khách hàng mang theo đầy đủ giấy tờ pháp lý",
            createdAt: "2024-01-14T13:30:00Z",
            updatedAt: "2024-01-19T09:45:00Z",
        },
    ])

    // Sidebar items
    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin" },
        { id: "users", label: "Quản lý khách", icon: Users, path: "/admin/manageCustomer" },
        { id: "lawyers", label: "Quản lý luật sư", icon: Users, path: "/admin/lawyers" },
        { id: "appointments", label: "Quản lý lịch hẹn", icon: Calendar, path: "/admin/appointments" },
        { id: "services", label: "Quản lý dịch vụ", icon: FileText, path: "/admin/services" },
        { id: "reports", label: "Báo cáo", icon: BarChart3, path: "/admin/reports" },
        { id: "settings", label: "Cài đặt", icon: Settings, path: "/admin/settings" },
    ]

    // Helper functions
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "confirmed":
                return "text-blue-400 bg-blue-400/10 border-blue-400/20"
            case "pending":
                return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
            case "completed":
                return "text-green-400 bg-green-400/10 border-green-400/20"
            case "cancelled":
                return "text-red-400 bg-red-400/10 border-red-400/20"
            default:
                return "text-gray-400 bg-gray-400/10 border-gray-400/20"
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "confirmed":
                return "Đã xác nhận"

            case "completed":
                return "Hoàn thành"
            case "cancelled":
                return "Đã hủy"
            default:
                return status
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "confirmed":
                return CheckCircle
            case "pending":
                return Clock
            case "completed":
                return CheckCircle
            case "cancelled":
                return XCircle
            default:
                return AlertCircle
        }
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case "Tư vấn trực tiếp":
                return MapPin
            case "Tư vấn online":
                return Video
            default:
                return Calendar
        }
    }

    // Event handlers
    const handleStatusChange = (appointmentId, newStatus) => {
        setAppointments((prev) =>
            prev.map((apt) =>
                apt.id === appointmentId ? { ...apt, status: newStatus, updatedAt: new Date().toISOString() } : apt,
            ),
        )
    }

    const handleSelectAppointment = (appointmentId) => {
        setSelectedAppointments((prev) =>
            prev.includes(appointmentId) ? prev.filter((id) => id !== appointmentId) : [...prev, appointmentId],
        )
    }

    const handleSelectAll = () => {
        if (selectedAppointments.length === filteredAppointments.length) {
            setSelectedAppointments([])
        } else {
            setSelectedAppointments(filteredAppointments.map((apt) => apt.id))
        }
    }

    const handleViewDetail = (appointment) => {
        setSelectedAppointment(appointment)
        setShowDetailModal(true)
    }

    const handleDeleteAppointment = (appointmentId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa lịch hẹn này?")) {
            setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId))
            setSelectedAppointments((prev) => prev.filter((id) => id !== appointmentId))
        }
    }

    const handleBulkAction = (action) => {
        if (selectedAppointments.length === 0) return

        switch (action) {
            case "delete":
                if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedAppointments.length} lịch hẹn?`)) {
                    setAppointments((prev) => prev.filter((apt) => !selectedAppointments.includes(apt.id)))
                    setSelectedAppointments([])
                }
                break
            case "confirm":
                setAppointments((prev) =>
                    prev.map((apt) =>
                        selectedAppointments.includes(apt.id)
                            ? { ...apt, status: "confirmed", updatedAt: new Date().toISOString() }
                            : apt,
                    ),
                )
                setSelectedAppointments([])
                break
            case "cancel":
                setAppointments((prev) =>
                    prev.map((apt) =>
                        selectedAppointments.includes(apt.id)
                            ? { ...apt, status: "cancelled", updatedAt: new Date().toISOString() }
                            : apt,
                    ),
                )
                setSelectedAppointments([])
                break
        }
    }

    const handleRefresh = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    // Filter and sort appointments
    const filteredAppointments = appointments
        .filter((appointment) => {
            const matchesSearch =
                appointment.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                appointment.lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                appointment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                appointment.client.email.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = filterStatus === "all" || appointment.status === filterStatus
            const matchesType = filterType === "all" || appointment.type === filterType

            return matchesSearch && matchesStatus && matchesType
        })
        .sort((a, b) => {
            let aValue, bValue
            switch (sortBy) {
                case "date":
                    aValue = new Date(a.date + " " + a.time)
                    bValue = new Date(b.date + " " + b.time)
                    break
                case "client":
                    aValue = a.client.name
                    bValue = b.client.name
                    break
                case "lawyer":
                    aValue = a.lawyer.name
                    bValue = b.lawyer.name
                    break
                case "fee":
                    aValue = a.fee
                    bValue = b.fee
                    break
                case "status":
                    aValue = a.status
                    bValue = b.status
                    break
                default:
                    return 0
            }

            if (sortOrder === "asc") {
                return aValue > bValue ? 1 : -1
            } else {
                return aValue < bValue ? 1 : -1
            }
        })

    // Pagination
    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage)

    // Components
    const StatCard = ({ title, value, icon: Icon, color = "blue", trend }) => (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold text-white mt-2">{value}</p>
                    {trend && (
                        <p className={`text-sm mt-1 ${trend > 0 ? "text-green-400" : "text-red-400"}`}>
                            {trend > 0 ? "+" : ""}
                            {trend}% so với tháng trước
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-lg bg-${color}-500/10`}>
                    <Icon className={`w-6 h-6 text-${color}-400`} />
                </div>
            </div>
        </div>
    )

    const DetailModal = () => {
        if (!showDetailModal || !selectedAppointment) return null

        const StatusIcon = getStatusIcon(selectedAppointment.status)
        const TypeIcon = getTypeIcon(selectedAppointment.type)

        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${getStatusColor(selectedAppointment.status)}`}>
                                    <StatusIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Chi tiết lịch hẹn #{selectedAppointment.id}</h3>
                                    <p className="text-gray-400">{selectedAppointment.subject}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Client Information */}
                            <div className="bg-gray-700/30 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                    <Users className="w-5 h-5 mr-2" />
                                    Thông tin khách hàng
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={selectedAppointment.client.avatar || "/placeholder.svg"}
                                            alt={selectedAppointment.client.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-white font-medium">{selectedAppointment.client.name}</p>
                                            <p className="text-gray-400 text-sm">{selectedAppointment.client.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div>
                                            <p className="text-gray-400 text-sm">Số điện thoại</p>
                                            <p className="text-white font-medium">{selectedAppointment.client.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lawyer Information */}
                            <div className="bg-gray-700/30 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                    <Shield className="w-5 h-5 mr-2" />
                                    Thông tin luật sư
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={selectedAppointment.lawyer.avatar || "/placeholder.svg"}
                                            alt={selectedAppointment.lawyer.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-white font-medium">{selectedAppointment.lawyer.name}</p>
                                            <p className="text-gray-400 text-sm">{selectedAppointment.lawyer.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Chuyên môn</p>
                                        <p className="text-white font-medium">{selectedAppointment.lawyer.specialization}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Appointment Details */}
                            <div className="bg-gray-700/30 rounded-lg p-6 lg:col-span-2">
                                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Chi tiết lịch hẹn
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-gray-400 text-sm">Ngày hẹn</p>
                                        <p className="text-white font-medium">{formatDate(selectedAppointment.date)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Giờ hẹn</p>
                                        <p className="text-white font-medium">{selectedAppointment.time}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Thời gian</p>
                                        <p className="text-white font-medium">{selectedAppointment.duration}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Loại tư vấn</p>
                                        <div className="flex items-center space-x-2">
                                            <TypeIcon className="w-4 h-4 text-blue-400" />
                                            <p className="text-white font-medium">{selectedAppointment.type}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Phí tư vấn</p>
                                        <p className="text-green-400 font-medium">{formatCurrency(selectedAppointment.fee)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Trạng thái</p>
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedAppointment.status)}`}
                                        >
                                            <StatusIcon className="w-3 h-3 mr-1" />
                                            {getStatusText(selectedAppointment.status)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-gray-700/30 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Địa điểm
                                </h4>
                                <p className="text-white">{selectedAppointment.location}</p>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-700/30 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                    <FileText className="w-5 h-5 mr-2" />
                                    Mô tả
                                </h4>
                                <p className="text-gray-300">{selectedAppointment.description}</p>
                            </div>

                            {/* Notes */}
                            {selectedAppointment.notes && (
                                <div className="bg-gray-700/30 rounded-lg p-6 lg:col-span-2">
                                    <h4 className="text-lg font-semibold text-white mb-4">Ghi chú</h4>
                                    <p className="text-gray-300">{selectedAppointment.notes}</p>
                                </div>
                            )}

                            {/* Timestamps */}
                            <div className="bg-gray-700/30 rounded-lg p-6 lg:col-span-2">
                                <h4 className="text-lg font-semibold text-white mb-4">Thông tin hệ thống</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-400 text-sm">Ngày tạo</p>
                                        <p className="text-white font-medium">{formatDateTime(selectedAppointment.createdAt)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Cập nhật lần cuối</p>
                                        <p className="text-white font-medium">{formatDateTime(selectedAppointment.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-700">
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Đóng
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                Chỉnh sửa
                            </button>
                            <button
                                onClick={() => handleDeleteAppointment(selectedAppointment.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Xóa
                            </button>
                        </div>
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
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon
                            const isActive = item.id === "appointments"
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        navigate(item.path)
                                        setSidebarOpen(false)
                                    }}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
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
                            src="../public/images/avatar.png"
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
                <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-400 hover:text-white transition-colors"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Quản lý lịch hẹn</h1>
                                <p className="text-gray-400">Quản lý tất cả lịch hẹn trong hệ thống</p>
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
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                        <StatCard title="Tổng lịch hẹn" value={stats.total} icon={Calendar} color="blue" trend={12} />
                        <StatCard title="Đã xác nhận" value={stats.confirmed} icon={CheckCircle} color="blue" trend={8} />

                        <StatCard title="Hoàn thành" value={stats.completed} icon={CheckCircle} color="green" trend={15} />
                        <StatCard title="Đã hủy" value={stats.cancelled} icon={XCircle} color="red" trend={-3} />
                        <StatCard
                            title="Doanh thu"
                            value={formatCurrency(stats.revenue)}
                            icon={DollarSign}
                            color="green"
                            trend={20}
                        />
                    </div>

                    {/* Filters and Actions */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6">
                        <div className="flex flex-col space-y-4">
                            {/* Search and Quick Filters */}
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm theo tên khách hàng, luật sư, email hoặc chủ đề..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
                                >
                                    <Filter className="w-4 h-4" />
                                    <span>Bộ lọc</span>
                                    {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Advanced Filters */}
                            {showFilters && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="all">Tất cả trạng thái</option>
                                        <option value="confirmed">Đã xác nhận</option>

                                        <option value="completed">Hoàn thành</option>
                                        <option value="cancelled">Đã hủy</option>
                                    </select>
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="all">Tất cả loại</option>
                                        <option value="Tư vấn trực tiếp">Tư vấn trực tiếp</option>
                                        <option value="Tư vấn online">Tư vấn online</option>
                                    </select>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="date">Sắp xếp theo ngày</option>
                                        <option value="client">Sắp xếp theo khách hàng</option>
                                        <option value="lawyer">Sắp xếp theo luật sư</option>
                                        <option value="fee">Sắp xếp theo phí</option>
                                        <option value="status">Sắp xếp theo trạng thái</option>
                                    </select>
                                    <select
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="desc">Giảm dần</option>
                                        <option value="asc">Tăng dần</option>
                                    </select>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                                    <Plus className="w-4 h-4" />
                                    <span>Thêm lịch hẹn</span>
                                </button>
                                {selectedAppointments.length > 0 && (
                                    <>
                                        <button
                                            onClick={() => handleBulkAction("confirm")}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Xác nhận ({selectedAppointments.length})</span>
                                        </button>
                                        <button
                                            onClick={() => handleBulkAction("cancel")}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            <span>Hủy ({selectedAppointments.length})</span>
                                        </button>
                                        <button
                                            onClick={() => handleBulkAction("delete")}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Xóa ({selectedAppointments.length})</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
                        <span>
                            Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAppointments.length)} trong tổng số{" "}
                            {filteredAppointments.length} lịch hẹn
                        </span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value))
                                setCurrentPage(1)
                            }}
                            className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                        >
                            <option value={10}>10 / trang</option>
                            <option value={25}>25 / trang</option>
                            <option value={50}>50 / trang</option>
                            <option value={100}>100 / trang</option>
                        </select>
                    </div>

                    {/* Appointments Table */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    selectedAppointments.length === filteredAppointments.length && filteredAppointments.length > 0
                                                }
                                                onChange={handleSelectAll}
                                                className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Khách hàng
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Luật sư
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Ngày & Giờ
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Loại & Chủ đề
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Phí
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700/50">
                                    {paginatedAppointments.map((appointment) => {
                                        const StatusIcon = getStatusIcon(appointment.status)
                                        const TypeIcon = getTypeIcon(appointment.type)

                                        return (
                                            <tr key={appointment.id} className="hover:bg-gray-700/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedAppointments.includes(appointment.id)}
                                                        onChange={() => handleSelectAppointment(appointment.id)}
                                                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <img
                                                            src={appointment.client.avatar || "/placeholder.svg"}
                                                            alt={appointment.client.name}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <div className="text-sm font-medium text-white">{appointment.client.name}</div>
                                                            <div className="text-sm text-gray-400">{appointment.client.email}</div>
                                                            <div className="text-sm text-gray-400">{appointment.client.phone}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <img
                                                            src={appointment.lawyer.avatar || "/placeholder.svg"}
                                                            alt={appointment.lawyer.name}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <div className="text-sm font-medium text-white">{appointment.lawyer.name}</div>
                                                            <div className="text-sm text-gray-400">{appointment.lawyer.specialization}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-white font-medium">{formatDate(appointment.date)}</div>
                                                    <div className="text-sm text-gray-400">{appointment.time}</div>
                                                    <div className="text-sm text-gray-400">{appointment.duration}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <TypeIcon className="w-4 h-4 text-blue-400" />
                                                        <span className="text-sm text-white">{appointment.type}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-400 truncate max-w-xs">{appointment.subject}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-green-400">{formatCurrency(appointment.fee)}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        value={appointment.status}
                                                        onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium border focus:ring-2 focus:ring-blue-500 focus:outline-none ${getStatusColor(appointment.status)}`}
                                                    >

                                                        <option value="confirmed">Đã xác nhận</option>
                                                        <option value="completed">Hoàn thành</option>
                                                        <option value="cancelled">Đã hủy</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => handleViewDetail(appointment)}
                                                            className="text-blue-400 hover:text-blue-300 p-1 rounded transition-colors"
                                                            title="Xem chi tiết"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            className="text-green-400 hover:text-green-300 p-1 rounded transition-colors"
                                                            title="Chỉnh sửa"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteAppointment(appointment.id)}
                                                            className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                                                            title="Xóa"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-gray-400 hover:text-gray-300 p-1 rounded transition-colors">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {filteredAppointments.length === 0 && (
                            <div className="text-center py-12">
                                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-white mb-2">Không tìm thấy lịch hẹn</h3>
                                <p className="text-gray-400">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-400">
                                Trang {currentPage} / {totalPages}
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
                                >
                                    Trước
                                </button>

                                {/* Page Numbers */}
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum
                                        if (totalPages <= 5) {
                                            pageNum = i + 1
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i
                                        } else {
                                            pageNum = currentPage - 2 + i
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`px-3 py-2 rounded-lg transition-colors ${currentPage === pageNum
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-700 hover:bg-gray-600 text-white"
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        )
                                    })}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
                                >
                                    Sau
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Detail Modal */}
            <DetailModal />
        </div>
    )
}

export default ManageAppointments
