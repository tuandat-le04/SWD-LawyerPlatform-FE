"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
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
    EyeOff,
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
    const [showPassword, setShowPassword] = useState(false)

    // Validation schemas
    const profileValidationSchema = Yup.object({
        name: Yup.string()
            .required("Họ và tên là bắt buộc")
            .min(2, "Họ và tên phải có ít nhất 2 ký tự")
            .max(100, "Họ và tên không được vượt quá 100 ký tự")
            .matches(/^[a-zA-ZÀ-ỹ\s]+$/, "Họ và tên chỉ được chứa chữ cái và khoảng trắng"),
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Email là bắt buộc"),
        phone: Yup.string()
            .required("Số điện thoại là bắt buộc")
            .matches(/^[0-9]{10}$/, "Số điện thoại phải có đúng 10 chữ số"),
    })

    const passwordValidationSchema = Yup.object({
        currentPassword: Yup.string()
            .required("Mật khẩu hiện tại là bắt buộc"),
        newPassword: Yup.string()
            .required("Mật khẩu mới là bắt buộc")
            .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"),
        confirmPassword: Yup.string()
            .required("Xác nhận mật khẩu là bắt buộc")
            .oneOf([Yup.ref('newPassword')], "Mật khẩu xác nhận không khớp")
    })

    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin" },
        { id: "users", label: "Quản lý khách", icon: Users, path: "/admin/manageCustomer" },
        { id: "lawyers", label: "Quản lý luật sư", icon: Users, path: "/admin/lawyers" },
        { id: "appointments", label: "Quản lý lịch hẹn", icon: Calendar, path: "/admin/appointments" },
        { id: "services", label: "Quản lý dịch vụ", icon: FileText, path: "/admin/services" },
        { id: "reports", label: "Báo cáo", icon: BarChart3, path: "/admin/reports" },
        { id: "settings", label: "Cài đặt", icon: Settings, path: "/admin/settings" },
    ]

    const [profileData, setProfileData] = useState({
        name: "Admin User",
        email: "admin@system.com",
        phone: "0123456789",
    })

    const handleProfileUpdate = (values, { setSubmitting }) => {
        // Simulate API call
        console.log("Updating profile data:", values)

        setTimeout(() => {
            setProfileData(values)
            setSubmitting(false)
            alert("Thông tin đã được cập nhật thành công!")
        }, 1000)
    }

    const handlePasswordChange = (values, { setSubmitting, resetForm }) => {
        // Simulate API call
        console.log("Changing password:", values)

        setTimeout(() => {
            setSubmitting(false)
            resetForm()
            alert("Mật khẩu đã được thay đổi thành công!")
        }, 1000)
    }

    const tabs = [
        { id: "profile", label: "Thông tin cá nhân", icon: User },
        { id: "security", label: "Bảo mật", icon: Lock },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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
                            src="../public/images/avatar.png"
                            alt="Admin"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-white font-medium">{profileData.name}</p>
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

                                    <Formik
                                        initialValues={profileData}
                                        validationSchema={profileValidationSchema}
                                        onSubmit={handleProfileUpdate}
                                        enableReinitialize={true}
                                    >
                                        {({ errors, touched, isSubmitting }) => (
                                            <Form className="space-y-4">
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Họ và tên <span className="text-red-400">*</span>
                                                    </label>
                                                    <Field
                                                        name="name"
                                                        type="text"
                                                        className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-500 ${errors.name && touched.name
                                                            ? 'border-red-500'
                                                            : 'border-gray-600'
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        name="name"
                                                        component="p"
                                                        className="text-red-400 text-sm mt-1"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Email <span className="text-red-400">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                        <Field
                                                            name="email"
                                                            type="email"
                                                            className={`w-full pl-10 pr-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-500 ${errors.email && touched.email
                                                                ? 'border-red-500'
                                                                : 'border-gray-600'
                                                                }`}
                                                        />
                                                    </div>
                                                    <ErrorMessage
                                                        name="email"
                                                        component="p"
                                                        className="text-red-400 text-sm mt-1"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Số điện thoại <span className="text-red-400">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                        <Field
                                                            name="phone"
                                                            type="tel"
                                                            placeholder="0901234567"
                                                            maxLength="10"
                                                            className={`w-full pl-10 pr-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-500 ${errors.phone && touched.phone
                                                                ? 'border-red-500'
                                                                : 'border-gray-600'
                                                                }`}
                                                            onKeyPress={(e) => {
                                                                // Chỉ cho phép nhập số
                                                                if (!/[0-9]/.test(e.key)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <ErrorMessage
                                                        name="phone"
                                                        component="p"
                                                        className="text-red-400 text-sm mt-1"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                                                >
                                                    <Save className="w-4 h-4" />
                                                    <span>{isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}</span>
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Password & Security */}
                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-6">Đổi mật khẩu</h3>

                                    <Formik
                                        initialValues={{
                                            currentPassword: "",
                                            newPassword: "",
                                            confirmPassword: ""
                                        }}
                                        validationSchema={passwordValidationSchema}
                                        onSubmit={handlePasswordChange}
                                    >
                                        {({ errors, touched, isSubmitting }) => (
                                            <Form className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Mật khẩu hiện tại <span className="text-red-400">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <Field
                                                            name="currentPassword"
                                                            type={showPassword ? "text" : "password"}
                                                            className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-500 pr-10 ${errors.currentPassword && touched.currentPassword
                                                                ? 'border-red-500'
                                                                : 'border-gray-600'
                                                                }`}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                                        >
                                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                    <ErrorMessage
                                                        name="currentPassword"
                                                        component="p"
                                                        className="text-red-400 text-sm mt-1"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Mật khẩu mới <span className="text-red-400">*</span>
                                                    </label>
                                                    <Field
                                                        name="newPassword"
                                                        type="password"
                                                        className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-500 ${errors.newPassword && touched.newPassword
                                                            ? 'border-red-500'
                                                            : 'border-gray-600'
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        name="newPassword"
                                                        component="p"
                                                        className="text-red-400 text-sm mt-1"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Xác nhận mật khẩu mới <span className="text-red-400">*</span>
                                                    </label>
                                                    <Field
                                                        name="confirmPassword"
                                                        type="password"
                                                        className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-500 ${errors.confirmPassword && touched.confirmPassword
                                                            ? 'border-red-500'
                                                            : 'border-gray-600'
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        name="confirmPassword"
                                                        component="p"
                                                        className="text-red-400 text-sm mt-1"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                                >
                                                    <Lock className="w-4 h-4" />
                                                    <span>{isSubmitting ? "Đang cập nhật..." : "Đổi mật khẩu"}</span>
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ManageProfile