"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Shield,
  Menu,
  X,
  Bell,
  Home,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react"

const ManageCustomer = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("") // 'add', 'edit', 'view', 'delete'
  const [selectedUser, setSelectedUser] = useState(null)

  // Mock data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "an.nguyen@email.com",
      phone: "0901234567",
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
      role: "client",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-20 14:30",
      totalSpent: 2500000,
      totalAppointments: 5,
      rating: 4.8,
      avatar: "../public/images/avatar.png",
      specialization: "Luật dân sự",
      verified: true,
    },
    {
      id: 2,
      name: "Luật sư Trần Thị Bình",
      email: "binh.tran@email.com",
      phone: "0912345678",
      address: "456 Lê Lợi, Q3, TP.HCM",
      role: "lawyer",
      status: "active",
      joinDate: "2024-01-14",
      lastLogin: "2024-01-20 16:45",
      totalSpent: 0,
      totalAppointments: 25,
      rating: 4.9,
      avatar: "../public/images/avatar.png",
      specialization: "Luật hôn nhân gia đình",
      verified: true,
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      email: "cuong.le@email.com",
      phone: "0923456789",
      address: "789 Võ Văn Tần, Q3, TP.HCM",
      role: "client",
      status: "pending",
      joinDate: "2024-01-13",
      lastLogin: "2024-01-19 09:15",
      totalSpent: 800000,
      totalAppointments: 2,
      rating: 4.5,
      avatar: "../public/images/avatar.png",
      specialization: "Luật doanh nghiệp",
      verified: false,
    },
    {
      id: 4,
      name: "Phạm Thị Dung",
      email: "dung.pham@email.com",
      phone: "0934567890",
      address: "321 Hai Bà Trưng, Q1, TP.HCM",
      role: "client",
      status: "inactive",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-18 11:20",
      totalSpent: 1200000,
      totalAppointments: 3,
      rating: 4.2,
      avatar: "../public/images/avatar.png",
      specialization: "Luật lao động",
      verified: true,
    },
    {
      id: 5,
      name: "Luật sư Hoàng Văn Em",
      email: "em.hoang@email.com",
      phone: "0945678901",
      address: "654 Nguyễn Thị Minh Khai, Q3, TP.HCM",
      role: "lawyer",
      status: "active",
      joinDate: "2024-01-12",
      lastLogin: "2024-01-20 13:10",
      totalSpent: 0,
      totalAppointments: 18,
      rating: 4.7,
      avatar: "../public/images/avatar.png",
      specialization: "Luật hình sự",
      verified: true,
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

  // Filter and sort users
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      const matchesRole = filterRole === "all" || user.role === filterRole
      const matchesStatus = filterStatus === "all" || user.status === filterStatus
      return matchesSearch && matchesRole && matchesStatus
    })
    .sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "totalSpent" || sortBy === "totalAppointments" || sortBy === "rating") {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "pending":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "inactive":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "lawyer":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "client":
        return "text-purple-400 bg-purple-400/10 border-purple-400/20"
      case "admin":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.id))
    }
  }

  const handleAction = (action, user = null) => {
    setSelectedUser(user)
    setModalType(action)
    setShowModal(true)
  }

  const handleStatusChange = (userId, newStatus) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  const handleDeleteUser = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    setShowModal(false)
  }

  const UserModal = () => {
    if (!showModal) return null

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                {modalType === "add" && "Thêm người dùng mới"}
                {modalType === "edit" && "Chỉnh sửa người dùng"}
                {modalType === "view" && "Chi tiết người dùng"}
                {modalType === "delete" && "Xác nhận xóa"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {modalType === "delete" ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Xóa người dùng</h4>
                <p className="text-gray-400 mb-6">
                  Bạn có chắc chắn muốn xóa người dùng{" "}
                  <span className="text-white font-medium">{selectedUser?.name}</span>? Hành động này không thể hoàn
                  tác.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleDeleteUser(selectedUser?.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ) : modalType === "view" && selectedUser ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedUser.avatar || "/placeholder.svg"}
                    alt={selectedUser.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-white">{selectedUser.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(selectedUser.role)}`}
                      >
                        {selectedUser.role === "lawyer" ? "Luật sư" : "Khách hàng"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedUser.status)}`}
                      >
                        {selectedUser.status === "active"
                          ? "Hoạt động"
                          : selectedUser.status === "pending"
                            ? "Chờ duyệt"
                            : "Không hoạt động"}
                      </span>
                      {selectedUser.verified && (
                        <span className="text-blue-400">
                          <UserCheck className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-white">Thông tin liên hệ</h5>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{selectedUser.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{selectedUser.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{selectedUser.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-white">Thống kê</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Ngày tham gia:</span>
                        <span className="text-white">{selectedUser.joinDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Lần cuối truy cập:</span>
                        <span className="text-white">{selectedUser.lastLogin}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Tổng lịch hẹn:</span>
                        <span className="text-white">{selectedUser.totalAppointments}</span>
                      </div>
                      {selectedUser.role === "client" && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Tổng chi tiêu:</span>
                          <span className="text-white">{formatCurrency(selectedUser.totalSpent)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Đánh giá:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white">{selectedUser.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-white mb-3">Chuyên môn</h5>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                    {selectedUser.specialization}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      defaultValue={modalType === "edit" ? selectedUser?.name : ""}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={modalType === "edit" ? selectedUser?.email : ""}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="Nhập email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      defaultValue={modalType === "edit" ? selectedUser?.phone : ""}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Vai trò</label>
                    <select
                      defaultValue={modalType === "edit" ? selectedUser?.role : "client"}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="client">Khách hàng</option>
                      <option value="lawyer">Luật sư</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Địa chỉ</label>
                  <textarea
                    defaultValue={modalType === "edit" ? selectedUser?.address : ""}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    rows="3"
                    placeholder="Nhập địa chỉ"
                  />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    {modalType === "add" ? "Thêm" : "Lưu"}
                  </button>
                </div>
              </div>
            )}
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
              const isActive = item.path === "/admin/manageCustomer"
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
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Quản lý người dùng</h1>
                <p className="text-gray-400">Quản lý tất cả người dùng trong hệ thống</p>
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
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Tổng người dùng</p>
                  <p className="text-2xl font-bold text-white">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Luật sư</p>
                  <p className="text-2xl font-bold text-white">{users.filter((u) => u.role === "lawyer").length}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Khách hàng</p>
                  <p className="text-2xl font-bold text-white">{users.filter((u) => u.role === "client").length}</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Đang hoạt động</p>
                  <p className="text-2xl font-bold text-white">{users.filter((u) => u.status === "active").length}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Tất cả vai trò</option>
                  <option value="client">Khách hàng</option>
                  <option value="lawyer">Luật sư</option>
                </select>
               
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAction("add")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm người dùng</span>
                </button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Người dùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Vai trò
                    </th>
                    
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Lịch hẹn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Chi tiêu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Đánh giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-white">{user.name}</span>
                              {user.verified && <UserCheck className="w-4 h-4 text-blue-400" />}
                            </div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                            <div className="text-sm text-gray-400">{user.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}
                        >
                          {user.role === "lawyer" ? "Luật sư" : user.role === "client" ? "Khách hàng" : "Admin"}
                        </span>
                      </td>
                     
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.totalAppointments}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.role === "client" ? formatCurrency(user.totalSpent) : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-300">{user.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAction("view", user)}
                            className="text-blue-400 hover:text-blue-300 p-1"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAction("edit", user)}
                            className="text-green-400 hover:text-green-300 p-1"
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAction("delete", user)}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-gray-700/30 px-6 py-3 flex items-center justify-between border-t border-gray-700/50">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Hiển thị</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-400">trên tổng số {filteredUsers.length} người dùng</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

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
                        className={`px-3 py-1 rounded text-sm ${currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-700"
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
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      <UserModal />
    </div>
  )
}

export default ManageCustomer
