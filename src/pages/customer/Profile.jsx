"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
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

    const [profile, setProfile] = useState({
        name: "Nguyễn Văn An",
        email: "nguyenvanan@lawfirm.com",
        phone: "0901234567",
    })



    const tabs = [
        { id: "profile", label: "Hồ sơ cá nhân", icon: User },
        { id: "security", label: "Bảo mật", icon: Shield },
        { id: "billing", label: "Lịch sử", icon: CreditCard },
    ]

    const handleSave = (values, { setSubmitting }) => {
        // Simulate API call
        console.log("Saving profile data:", values)

        setTimeout(() => {
            setProfile(values)
            setSubmitting(false)
            alert("Cài đặt đã được lưu thành công!")
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

    const renderProfileTab = () => (
        <Formik
            initialValues={profile}
            validationSchema={profileValidationSchema}
            onSubmit={handleSave}
            enableReinitialize={true}
        >
            {({ values, errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {values.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                {values.name}
                            </h3>
                            <p className="text-gray-400">Khách hàng</p>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Họ và tên <span className="text-red-400">*</span>
                            </label>
                            <Field
                                name="name"
                                type="text"
                                className={`w-full bg-gray-800 border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name && touched.name
                                    ? 'border-red-500'
                                    : 'border-gray-700'
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
                                    className={`w-full bg-gray-800 border rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email && touched.email
                                        ? 'border-red-500'
                                        : 'border-gray-700'
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
                                    className={`w-full bg-gray-800 border rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone && touched.phone
                                        ? 'border-red-500'
                                        : 'border-gray-700'
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
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            <span>{isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}</span>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )

    const renderSecurityTab = () => (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Đổi mật khẩu</h3>
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
                                        className={`w-full bg-gray-700 border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${errors.currentPassword && touched.currentPassword
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
                                    className={`w-full bg-gray-700 border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.newPassword && touched.newPassword
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
                                    className={`w-full bg-gray-700 border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmPassword && touched.confirmPassword
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
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                {isSubmitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )


    const renderBillingTab = () => (
        <div className="space-y-6">
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

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/")}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-xl font-semibold text-white">Cài đặt</h1>
                        </div>
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
                            {activeTab === "security" && renderSecurityTab()}
                            {activeTab === "billing" && renderBillingTab()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
