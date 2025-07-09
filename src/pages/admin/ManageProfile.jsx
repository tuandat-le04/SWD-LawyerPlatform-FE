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
    Download,
    Save,
    Camera,
    Lock,
    Mail,
    Phone,
    MapPin,
    User,
    Globe,
    Clock,
    Key,
    AlertCircle,
    CheckCircle,
    Smartphone,
    Monitor,
    Activity,
} from "lucide-react"

const ManageProfile = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("profile")
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [showTwoFAModal, setShowTwoFAModal] = useState(false)

    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin" },
        { id: "users", label: "Quản lý người dùng", icon: Users, path: "/admin/manageCustomer" },
        { id: "lawyers", label: "Quản lý luật sư", icon: UserCheck, path: "/admin/lawyers" },
        { id: "appointments", label: "Quản lý lịch hẹn", icon: Calendar, path: "/admin/appointments" },
        { id: "services", label: "Quản lý dịch vụ", icon: FileText, path: "/admin/services" },
        { id: "reports", label: "Báo cáo", icon: BarChart3, path: "/admin/reports" },
        { id: "settings", label: "Cài đặt", icon: Settings, path: "/admin/settings" },
    ]

    const [profileData, setProfileData] = useState({
        firstName: "Admin",
        lastName: "User",
        email: "admin@system.com",
        phone: "+84 123 456 789",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        bio: "Quản trị viên hệ thống Lawyer Platform",
        avatar: "/images/avatar.png",
        role: "Super Admin",
        department: "Quản trị hệ thống",
        joinDate: "2023-01-15",
        lastLogin: "2024-01-15 14:30:00",
    })

    const [systemSettings, setSystemSettings] = useState({
        siteName: "Lawyer Platform",
        siteDescription: "Nền tảng kết nối luật sư và khách hàng",
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        maintenanceMode: false,
        registrationEnabled: true,
        autoApproval: false,
        maxUploadSize: 10,
        sessionTimeout: 30,
        passwordExpiry: 90,
    })

    const [securitySettings, setSecuritySettings] = useState({
        twoFactorEnabled: false,
        loginNotifications: true,
        failedLoginLimit: 5,
        sessionLockout: 15,
        lastPasswordChange: "2023-12-01",
    })

    const [notifications, setNotifications] = useState([
        { id: 1, type: "success", message: "Hệ thống đã được backup thành công", time: "10 phút trước" },
        { id: 3, type: "info", message: "Cập nhật hệ thống sẽ được thực hiện vào 2:00 AM", time: "1 ngày trước" },
        { id: 4, type: "error", message: "Lỗi kết nối cơ sở dữ liệu đã được khắc phục", time: "2 ngày trước" },
    ])

    const [recentActivity, setRecentActivity] = useState([
        { id: 1, action: "Đăng nhập hệ thống", device: "Chrome trên Windows", time: "2024-01-15 14:30" },
        { id: 2, action: "Cập nhật thông tin luật sư", device: "Firefox trên macOS", time: "2024-01-15 10:15" },
        { id: 3, action: "Xuất báo cáo tháng", device: "Chrome trên Windows", time: "2024-01-14 16:45" },
        { id: 4, action: "Thay đổi cài đặt hệ thống", device: "Safari trên iOS", time: "2024-01-14 09:20" },
    ])

    const handleProfileUpdate = () => {
        // Logic cập nhật profile
        console.log("Updating profile...", profileData)
    }

    const handleSystemUpdate = () => {
        // Logic cập nhật system settings
        console.log("Updating system settings...", systemSettings)
    }

    const handlePasswordChange = () => {
        // Logic đổi mật khẩu
        setShowPasswordModal(false)
    }

    const handleTwoFAToggle = () => {
        setSecuritySettings({ ...securitySettings, twoFactorEnabled: !securitySettings.twoFactorEnabled })
        if (!securitySettings.twoFactorEnabled) {
            setShowTwoFAModal(true)
        }
    }

    const getNotificationIcon = (type) => {
        switch (type) {
            case "success": return CheckCircle
            case "warning": return AlertCircle
            case "error": return AlertCircle
            default: return Bell
        }
    }

    const getNotificationColor = (type) => {
        switch (type) {
            case "success": return "text-green-400"
            case "warning": return "text-yellow-400"
            case "error": return "text-red-400"
            default: return "text-blue-400"
        }
    }

    const tabs = [
        { id: "profile", label: "Thông tin cá nhân", icon: User },
        { id: "system", label: "Cài đặt hệ thống", icon: Settings },
        { id: "security", label: "Bảo mật", icon: Lock },
        { id: "notifications", label: "Thông báo", icon: Bell },
    ]

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
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${item.id === "settings"
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
                            src={profileData.avatar}
                            alt="Admin"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-white font-medium">{profileData.firstName} {profileData.lastName}</p>
                            <p className="text-gray-400 text-sm">{profileData.email}</p>
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
                                <h1 className="text-2xl font-bold text-white">Cài đặt & Hồ sơ</h1>
                                <p className="text-gray-400">Quản lý thông tin cá nhân và cài đặt hệ thống</p>
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
                        {/* Tabs */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                            <div className="flex flex-wrap gap-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${activeTab === tab.id
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{tab.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Tab Content */}
                        {activeTab === "profile" && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Profile Info */}
                                <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-6">Thông tin cá nhân</h3>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Họ</label>
                                                <input
                                                    type="text"
                                                    value={profileData.firstName}
                                                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Tên</label>
                                                <input
                                                    type="text"
                                                    value={profileData.lastName}
                                                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Số điện thoại</label>
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Mô tả</label>
                                            <textarea
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                rows={3}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <button
                                            onClick={handleProfileUpdate}
                                            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Lưu thay đổi</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Avatar & Quick Info */}
                                <div className="space-y-6">
                                    {/* Avatar */}
                                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">Ảnh đại diện</h3>
                                        <div className="text-center">
                                            <img
                                                src={profileData.avatar}
                                                alt="Avatar"
                                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Quick Info */}
                                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">Thông tin hệ thống</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Vai trò:</span>
                                                <span className="text-white font-medium">{profileData.role}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Phòng ban:</span>
                                                <span className="text-white font-medium">{profileData.department}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Ngày tham gia:</span>
                                                <span className="text-white font-medium">{profileData.joinDate}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Đăng nhập cuối:</span>
                                                <span className="text-white font-medium">{profileData.lastLogin}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "system" && (
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-6">Cài đặt hệ thống</h3>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Tên website</label>
                                            <input
                                                type="text"
                                                value={systemSettings.siteName}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, siteName: e.target.value })}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Mô tả website</label>
                                            <textarea
                                                value={systemSettings.siteDescription}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, siteDescription: e.target.value })}
                                                rows={3}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Kích thước upload tối đa (MB)</label>
                                            <input
                                                type="number"
                                                value={systemSettings.maxUploadSize}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, maxUploadSize: parseInt(e.target.value) })}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Thời gian hết phiên (phút)</label>
                                            <input
                                                type="number"
                                                value={systemSettings.sessionTimeout}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: parseInt(e.target.value) })}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-medium">Thông báo Email</p>
                                                <p className="text-gray-400 text-sm">Gửi thông báo qua email</p>
                                            </div>
                                            <button
                                                onClick={() => setSystemSettings({ ...systemSettings, emailNotifications: !systemSettings.emailNotifications })}
                                                className={`w-12 h-6 rounded-full ${systemSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-600'} relative transition-colors`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${systemSettings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-medium">Thông báo SMS</p>
                                                <p className="text-gray-400 text-sm">Gửi thông báo qua SMS</p>
                                            </div>
                                            <button
                                                onClick={() => setSystemSettings({ ...systemSettings, smsNotifications: !systemSettings.smsNotifications })}
                                                className={`w-12 h-6 rounded-full ${systemSettings.smsNotifications ? 'bg-blue-600' : 'bg-gray-600'} relative transition-colors`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${systemSettings.smsNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-medium">Chế độ bảo trì</p>
                                                <p className="text-gray-400 text-sm">Tạm khóa website để bảo trì</p>
                                            </div>
                                            <button
                                                onClick={() => setSystemSettings({ ...systemSettings, maintenanceMode: !systemSettings.maintenanceMode })}
                                                className={`w-12 h-6 rounded-full ${systemSettings.maintenanceMode ? 'bg-red-600' : 'bg-gray-600'} relative transition-colors`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${systemSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-medium">Cho phép đăng ký</p>
                                                <p className="text-gray-400 text-sm">Người dùng có thể tự đăng ký</p>
                                            </div>
                                            <button
                                                onClick={() => setSystemSettings({ ...systemSettings, registrationEnabled: !systemSettings.registrationEnabled })}
                                                className={`w-12 h-6 rounded-full ${systemSettings.registrationEnabled ? 'bg-blue-600' : 'bg-gray-600'} relative transition-colors`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${systemSettings.registrationEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-medium">Tự động phê duyệt</p>
                                                <p className="text-gray-400 text-sm">Tự động phê duyệt luật sư mới</p>
                                            </div>
                                            <button
                                                onClick={() => setSystemSettings({ ...systemSettings, autoApproval: !systemSettings.autoApproval })}
                                                className={`w-12 h-6 rounded-full ${systemSettings.autoApproval ? 'bg-blue-600' : 'bg-gray-600'} relative transition-colors`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${systemSettings.autoApproval ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSystemUpdate}
                                    className="w-full mt-6 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Lưu cài đặt</span>
                                </button>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Password & Security */}
                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-6">Mật khẩu & Bảo mật</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                            <div>
                                                <p className="text-white font-medium">Đổi mật khẩu</p>
                                                <p className="text-gray-400 text-sm">Thay đổi lần cuối: {securitySettings.lastPasswordChange}</p>
                                            </div>
                                            <button
                                                onClick={() => setShowPasswordModal(true)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                            >
                                                Đổi mật khẩu
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                                            <div>
                                                <p className="text-white font-medium">Thông báo đăng nhập</p>
                                                <p className="text-gray-400 text-sm">Nhận thông báo khi có đăng nhập mới</p>
                                            </div>
                                            <button
                                                onClick={() => setSecuritySettings({ ...securitySettings, loginNotifications: !securitySettings.loginNotifications })}
                                                className={`w-12 h-6 rounded-full ${securitySettings.loginNotifications ? 'bg-blue-600' : 'bg-gray-600'} relative transition-colors`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${securitySettings.loginNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-6">Thông báo hệ thống</h3>

                                <div className="space-y-4">
                                    {notifications.map((notification) => {
                                        const Icon = getNotificationIcon(notification.type)
                                        return (
                                            <div key={notification.id} className="flex items-start space-x-4 p-4 bg-gray-700/30 rounded-lg">
                                                <Icon className={`w-5 h-5 mt-0.5 ${getNotificationColor(notification.type)}`} />
                                                <div className="flex-1">
                                                    <p className="text-white">{notification.message}</p>
                                                    <p className="text-gray-400 text-sm">{notification.time}</p>
                                                </div>
                                                <button className="text-gray-400 hover:text-white">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-white">Đổi mật khẩu</h3>
                                <button onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Mật khẩu hiện tại</label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Xác nhận mật khẩu mới</label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handlePasswordChange}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageProfile