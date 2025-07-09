"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    ArrowLeft,
    User,
    Bell,
    Shield,
    Calendar,
    CreditCard,
    Globe,
    Moon,
    Sun,
    Save,
    Eye,
    EyeOff,
    Camera,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    DollarSign,
} from "lucide-react"

export default function LawyerSettings() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("profile")
    const [showPassword, setShowPassword] = useState(false)
    const [darkMode, setDarkMode] = useState(true)
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false,
        appointments: true,
        messages: true,
        payments: true,
    })

    const [profile, setProfile] = useState({
        firstName: "Nguyễn",
        lastName: "Văn An",
        email: "nguyenvanan@lawfirm.com",
        phone: "+84 901 234 567",
        address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
        specialization: "Luật Dân sự, Luật Thương mại",
        experience: "8 năm",
        license: "LS001234",
        bio: "Luật sư có 8 năm kinh nghiệm trong lĩnh vực luật dân sự và thương mại...",
        hourlyRate: "500000",
        consultationFee: "200000",
    })

    const [workingHours, setWorkingHours] = useState({
        monday: { start: "09:00", end: "17:00", enabled: true },
        tuesday: { start: "09:00", end: "17:00", enabled: true },
        wednesday: { start: "09:00", end: "17:00", enabled: true },
        thursday: { start: "09:00", end: "17:00", enabled: true },
        friday: { start: "09:00", end: "17:00", enabled: true },
        saturday: { start: "09:00", end: "12:00", enabled: false },
        sunday: { start: "09:00", end: "12:00", enabled: false },
    })

    const tabs = [
        { id: "profile", label: "Hồ sơ cá nhân", icon: User },
        { id: "security", label: "Bảo mật", icon: Shield },
        { id: "schedule", label: "Lịch làm việc", icon: Calendar },
        { id: "billing", label: "Thanh toán", icon: CreditCard },
    ]

    const handleSave = () => {
        // Simulate API call
        console.log("Saving settings...")
        alert("Cài đặt đã được lưu thành công!")
    }

    const handleProfileChange = (field, value) => {
        setProfile((prev) => ({ ...prev, [field]: value }))
    }

    const handleWorkingHoursChange = (day, field, value) => {
        setWorkingHours((prev) => ({
            ...prev,
            [day]: { ...prev[day], [field]: value },
        }))
    }

    const renderProfileTab = () => (
        <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {profile.firstName[0]}
                        {profile.lastName[0]}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white">
                        {profile.firstName} {profile.lastName}
                    </h3>
                    <p className="text-gray-400">{profile.specialization}</p>
                    <p className="text-sm text-gray-500">Giấy phép hành nghề: {profile.license}</p>
                </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Họ</label>
                    <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => handleProfileChange("firstName", e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tên</label>
                    <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => handleProfileChange("lastName", e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => handleProfileChange("email", e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Số điện thoại</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => handleProfileChange("phone", e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Chuyên môn</label>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={profile.specialization}
                            onChange={(e) => handleProfileChange("specialization", e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Kinh nghiệm</label>
                    <input
                        type="text"
                        value={profile.experience}
                        onChange={(e) => handleProfileChange("experience", e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phí tư vấn (VNĐ/giờ)</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="number"
                            value={profile.hourlyRate}
                            onChange={(e) => handleProfileChange("hourlyRate", e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phí tư vấn ban đầu (VNĐ)</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="number"
                            value={profile.consultationFee}
                            onChange={(e) => handleProfileChange("consultationFee", e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Bio */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Giới thiệu bản thân</label>
                <textarea
                    value={profile.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mô tả về kinh nghiệm, chuyên môn và thành tích của bạn..."
                />
            </div>
        </div>
    )

    const renderSecurityTab = () => (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Đổi mật khẩu</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Mật khẩu hiện tại</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Mật khẩu mới</label>
                        <input
                            type="password"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Xác nhận mật khẩu mới</label>
                        <input
                            type="password"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Cập nhật mật khẩu
                    </button>
                </div>
            </div>
        </div>
    )

    const renderScheduleTab = () => (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Lịch làm việc</h3>
                <div className="space-y-4">
                    {Object.entries({
                        monday: "Thứ Hai",
                        tuesday: "Thứ Ba",
                        wednesday: "Thứ Tư",
                        thursday: "Thứ Năm",
                        friday: "Thứ Sáu",
                        saturday: "Thứ Bảy",
                        sunday: "Chủ Nhật",
                    }).map(([day, label]) => (
                        <div key={day} className="flex items-center space-x-4">
                            <div className="w-20">
                                <span className="text-gray-300">{label}</span>
                            </div>
                            <button
                                onClick={() => handleWorkingHoursChange(day, "enabled", !workingHours[day].enabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${workingHours[day].enabled ? "bg-blue-600" : "bg-gray-600"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${workingHours[day].enabled ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                            {workingHours[day].enabled && (
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="time"
                                        value={workingHours[day].start}
                                        onChange={(e) => handleWorkingHoursChange(day, "start", e.target.value)}
                                        className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="time"
                                        value={workingHours[day].end}
                                        onChange={(e) => handleWorkingHoursChange(day, "end", e.target.value)}
                                        className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderBillingTab = () => (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Thông tin thanh toán</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Số tài khoản</label>
                        <input
                            type="text"
                            placeholder="1234567890"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Ngân hàng</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option>Vietcombank</option>
                            <option>BIDV</option>
                            <option>VietinBank</option>
                            <option>Techcombank</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Tên chủ tài khoản</label>
                        <input
                            type="text"
                            placeholder="NGUYEN VAN AN"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Mã số thuế</label>
                        <input
                            type="text"
                            placeholder="0123456789"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Lịch sử giao dịch</h3>
                <div className="space-y-3">
                    {[
                        { date: "15/01/2024", amount: "2,500,000", type: "Tư vấn pháp lý", status: "Hoàn thành" },
                        { date: "10/01/2024", amount: "1,800,000", type: "Soạn thảo hợp đồng", status: "Hoàn thành" },
                        { date: "05/01/2024", amount: "3,200,000", type: "Đại diện tố tụng", status: "Đang xử lý" },
                    ].map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                            <div>
                                <p className="text-white font-medium">{transaction.type}</p>
                                <p className="text-sm text-gray-400">{transaction.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white font-semibold">{transaction.amount} VNĐ</p>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${transaction.status === "Hoàn thành"
                                        ? "bg-green-900 text-green-300"
                                        : "bg-yellow-900 text-yellow-300"
                                        }`}
                                >
                                    {transaction.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderPreferencesTab = () => (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Giao diện</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {darkMode ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-yellow-400" />}
                        <span className="text-gray-300">Chế độ tối</span>
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? "bg-blue-600" : "bg-gray-600"
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"
                                }`}
                        />
                    </button>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Ngôn ngữ</h3>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Tiếng Việt</option>
                    <option>English</option>
                </select>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Múi giờ</h3>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>GMT+7 (Việt Nam)</option>
                    <option>GMT+0 (UTC)</option>
                    <option>GMT-5 (EST)</option>
                </select>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/lawyer/home")}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-xl font-semibold text-white">Cài đặt</h1>
                        </div>
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            <span>Lưu thay đổi</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64">
                        <div className="bg-gray-800 rounded-lg p-4">
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === tab.id
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span>{tab.label}</span>
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-gray-800 rounded-lg p-6">
                            {activeTab === "profile" && renderProfileTab()}
                            {activeTab === "notifications" && renderNotificationsTab()}
                            {activeTab === "security" && renderSecurityTab()}
                            {activeTab === "schedule" && renderScheduleTab()}
                            {activeTab === "billing" && renderBillingTab()}
                            {activeTab === "preferences" && renderPreferencesTab()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
