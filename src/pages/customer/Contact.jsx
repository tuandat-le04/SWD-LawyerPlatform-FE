"use client"

import { useState, useEffect } from "react"

// Mock API Data
const officesData = [
  {
    id: 1,
    name: "Văn phòng TP. Hồ Chí Minh",
    address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    phone: "+84 28 3822 1234",
    email: "hcm@basico.vn",
    hours: "Thứ 2 - Thứ 6: 8:00 - 18:00\nThứ 7: 8:00 - 12:00",
    image: "/placeholder.svg?height=300&width=400",
    manager: "Luật sư Nguyễn Ngọc Quỳnh Như",
    specialties: ["Luật Dân sự", "Luật Doanh nghiệp", "Luật Bất động sản"],
    coordinates: { lat: 10.7769, lng: 106.7009 },
  },
  {
    id: 2,
    name: "Văn phòng Hà Nội",
    address: "456 Đường Hoàn Kiếm, Quận Hoàn Kiếm, Hà Nội",
    phone: "+84 24 3936 5678",
    email: "hanoi@basico.vn",
    hours: "Thứ 2 - Thứ 6: 8:00 - 18:00\nThứ 7: 8:00 - 12:00",
    image: "/placeholder.svg?height=300&width=400",
    manager: "Luật sư Võ Minh Tuấn",
    specialties: ["Luật Đầu tư", "Luật Ngân hàng", "M&A"],
    coordinates: { lat: 21.0285, lng: 105.8542 },
  },
  {
    id: 3,
    name: "Văn phòng Đà Nẵng",
    address: "789 Đường Trần Phú, Quận Hải Châu, Đà Nẵng",
    phone: "+84 236 3888 9999",
    email: "danang@basico.vn",
    hours: "Thứ 2 - Thứ 6: 8:00 - 18:00\nThứ 7: 8:00 - 12:00",
    image: "/placeholder.svg?height=300&width=400",
    manager: "Luật sư Phạm Hữu Nhật Minh",
    specialties: ["Luật Hình sự", "Luật Tố tụng", "Bào chữa"],
    coordinates: { lat: 16.0544, lng: 108.2022 },
  },
]

const contactMethodsData = [
  {
    id: 2,
    icon: "email",
    title: "Gửi email",
    description: "Mô tả chi tiết vấn đề của bạn",
    value: "contact@basico.vn",
    action: "Gửi email",
    available: "Phản hồi trong 2h",
  },
  {
    id: 2,
    icon: "video",
    title: "Video call",
    description: "Tư vấn trực tiếp qua video",
    value: "Đặt lịch",
    action: "Đặt cuộc gọi",
    available: "Theo lịch hẹn",
  },
]

const faqsData = [
  {
    id: 1,
    question: "Làm thế nào để đặt lịch tư vấn trực tiếp?",
    answer:
      "Bạn có thể đặt lịch qua form liên hệ, gọi hotline, hoặc đến trực tiếp văn phòng. Chúng tôi sẽ xác nhận lịch hẹn trong vòng 2 giờ làm việc.",
  },
  {
    id: 2,
    question: "Chi phí tư vấn ban đầu là bao nhiêu?",
    answer:
      "Buổi tư vấn đầu tiên (30 phút) hoàn toàn miễn phí. Các buổi tư vấn tiếp theo sẽ có mức phí tùy theo từng luật sư và loại vụ việc.",
  },
  {
    id: 3,
    question: "Có thể tư vấn trực tuyến không?",
    answer:
      "Có, chúng tôi hỗ trợ tư vấn qua video call, điện thoại và email. Đặc biệt phù hợp cho khách hàng ở xa hoặc bận rộn.",
  },
  {
    id: 4,
    question: "Thời gian phản hồi là bao lâu?",
    answer:
      "Chúng tôi cam kết phản hồi trong vòng 24 giờ đối với email và trong vòng 2 giờ đối với cuộc gọi trong giờ làm việc.",
  },
]

const serviceTypesData = [
  { id: "civil", name: "Luật Dân sự" },
  { id: "criminal", name: "Luật Hình sự" },
  { id: "business", name: "Luật Doanh nghiệp" },
  { id: "labor", name: "Luật Lao động" },
  { id: "family", name: "Luật Hôn nhân & Gia đình" },
  { id: "real-estate", name: "Luật Bất động sản" },
  { id: "other", name: "Lĩnh vực khác" },
]

// Utility Functions
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePhone = (phone) => {
  const re = /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/
  return re.test(phone)
}

const getContactIcon = (iconType) => {
  switch (iconType) {
    case "email":
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      )
    case "video":
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      )
    default:
      return null
  }
}

// -------------------Mock API Functions
const contactApi = {
  getOffices: async () => {
    await delay(500)
    return officesData
  },

  getContactMethods: async () => {
    await delay(400)
    return contactMethodsData
  },

  getFaqs: async () => {
    await delay(600)
    return faqsData
  },

  getServiceTypes: async () => {
    await delay(200)
    return serviceTypesData
  },

  submitContactForm: async (formData) => {
    await delay(1500)

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc")
    }

    return {
      success: true,
      message: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
      reference: `REF-${Date.now().toString().slice(-6)}`,
    }
  },
}

export default function ContactPage() {
  // State Management
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [contactMethods, setContactMethods] = useState([])
  const [offices, setOffices] = useState([])
  const [faqs, setFaqs] = useState([])
  const [serviceTypes, setServiceTypes] = useState([])
  const [selectedOffice, setSelectedOffice] = useState(1)
  const [openFaq, setOpenFaq] = useState(null)

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    serviceType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [submitResult, setSubmitResult] = useState(null)

  // Load Data on Mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        const [methodsData, officesData, faqsData, typesData] = await Promise.all([
          contactApi.getContactMethods(),
          contactApi.getOffices(),
          contactApi.getFaqs(),
          contactApi.getServiceTypes(),
        ])

        setContactMethods(methodsData)
        setOffices(officesData)
        setFaqs(faqsData)
        setServiceTypes(typesData)
        setError(null)
      } catch (err) {
        console.error("Error fetching contact data:", err)
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Vui lòng nhập họ tên"
    }

    if (!formData.email.trim()) {
      errors.email = "Vui lòng nhập email"
    } else if (!validateEmail(formData.email)) {
      errors.email = "Email không hợp lệ"
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = "Số điện thoại không hợp lệ"
    }

    if (!formData.subject.trim()) {
      errors.subject = "Vui lòng nhập tiêu đề"
    }

    if (!formData.message.trim()) {
      errors.message = "Vui lòng nhập nội dung"
    } else if (formData.message.trim().length < 20) {
      errors.message = "Nội dung quá ngắn, vui lòng mô tả chi tiết hơn"
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const result = await contactApi.submitContactForm(formData)

      setSubmitResult({
        success: true,
        message: result.message,
        reference: result.reference,
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        serviceType: "",
      })
    } catch (err) {
      setSubmitResult({
        success: false,
        message: err.message || "Có lỗi xảy ra. Vui lòng thử lại sau.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>



      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">Liên Hệ</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn với mọi vấn đề pháp lý. Hãy chọn cách thức liên hệ phù hợp
              nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
          <p className="text-gray-400">Đang tải thông tin liên hệ...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="py-20 text-center">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 max-w-md mx-auto">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      )}

      {/* Content when loaded */}
      {!loading && !error && (
        <>
          {/* Contact Methods */}
          <section className="relative py-20 bg-gray-800/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {contactMethods.map((method) => (
                  <div
                    key={method.id}
                    className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-6 group-hover:bg-amber-500/20 transition-colors duration-300">
                        <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {getContactIcon(method.icon)}
                        </svg>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                        {method.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{method.description}</p>

                      <div className="mb-4">
                        <p className="text-amber-400 font-semibold text-lg">{method.value}</p>
                        <p className="text-gray-500 text-xs">{method.available}</p>
                      </div>

                      <button className="w-full px-4 py-2 border border-amber-500/50 text-amber-400 rounded-lg hover:bg-amber-500/10 transition-all duration-300 text-sm font-medium group-hover:border-amber-400">
                        {method.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form & Info */}
          <section className="relative py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Form - 2/3 width */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-3xl p-10">
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-white mb-4">Gửi yêu cầu tư vấn</h3>
                      <p className="text-gray-400">Điền thông tin chi tiết để chúng tôi có thể hỗ trợ bạn tốt nhất</p>
                    </div>

                    {/* Success Message */}
                    {submitResult && submitResult.success && (
                      <div className="mb-8 bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                        <svg
                          className="w-12 h-12 text-green-500 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <h4 className="text-xl font-bold text-white mb-2">Gửi yêu cầu thành công!</h4>
                        <p className="text-gray-300 mb-2">{submitResult.message}</p>
                        {submitResult.reference && (
                          <p className="text-green-400 font-medium">Mã tham chiếu: {submitResult.reference}</p>
                        )}
                      </div>
                    )}

                    {/* Error Message */}
                    {submitResult && !submitResult.success && (
                      <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
                        <svg
                          className="w-12 h-12 text-red-500 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <h4 className="text-xl font-bold text-white mb-2">Gửi yêu cầu thất bại</h4>
                        <p className="text-gray-300">{submitResult.message}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">Họ và tên *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-700/50 border ${formErrors.name ? "border-red-500" : "border-gray-600"
                              } rounded-xl text-white placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300`}
                            placeholder="Nhập họ và tên của bạn"
                          />
                          {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-700/50 border ${formErrors.email ? "border-red-500" : "border-gray-600"
                              } rounded-xl text-white placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300`}
                            placeholder="email@example.com"
                          />
                          {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">Số điện thoại</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-700/50 border ${formErrors.phone ? "border-red-500" : "border-gray-600"
                              } rounded-xl text-white placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300`}
                            placeholder="0123 456 789"
                          />
                          {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">Lĩnh vực cần tư vấn</label>
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none appearance-none transition-all duration-300"
                          >
                            <option value="">Chọn lĩnh vực</option>
                            {serviceTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Tiêu đề *</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-gray-700/50 border ${formErrors.subject ? "border-red-500" : "border-gray-600"
                            } rounded-xl text-white placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300`}
                          placeholder="Tóm tắt vấn đề cần tư vấn"
                        />
                        {formErrors.subject && <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Mô tả chi tiết *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className={`w-full px-4 py-3 bg-gray-700/50 border ${formErrors.message ? "border-red-500" : "border-gray-600"
                            } rounded-xl text-white placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 resize-none`}
                          placeholder="Mô tả chi tiết tình huống, vấn đề pháp lý bạn đang gặp phải. Thông tin càng chi tiết, chúng tôi càng có thể hỗ trợ bạn tốt hơn."
                        />
                        {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Đang gửi...
                          </div>
                        ) : (
                          "Gửi yêu cầu tư vấn"
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Quick Info Sidebar - 1/3 width */}
                <div className="space-y-8">
                  {/* Emergency Contact */}
                  <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                      <svg
                        className="w-6 h-6 text-amber-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Hỗ trợ ưu tiên
                    </h4>
                    <p className="text-gray-300 text-sm mb-4">Cần tư vấn gấp? Hãy sử dụng:</p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-amber-400 font-bold text-lg">Email & Video Call</span>
                      </div>
                      <div className="text-gray-400 text-sm">
                        <p>• Email ưu tiên: urgent@basico.vn</p>
                        <p>• Video call khẩn cấp</p>
                        <p>• Phản hồi trong 30 phút</p>
                      </div>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4">Giờ làm việc</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Thứ 2 - Thứ 6:</span>
                        <span className="text-white font-medium">8:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Thứ 7:</span>
                        <span className="text-white font-medium">8:00 - 12:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Chủ nhật:</span>
                        <span className="text-amber-400 font-medium">Chỉ khẩn cấp</span>
                      </div>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4">Thời gian phản hồi</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        <span className="text-gray-300">Email: Trong 2 giờ</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        <span className="text-gray-300">Video call: Theo lịch hẹn</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="relative py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h3 className="text-4xl font-bold text-white mb-4">Câu hỏi thường gặp</h3>
                  <p className="text-gray-400 text-lg">Những thắc mắc phổ biến về dịch vụ liên hệ</p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={faq.id}
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-700/30 transition-colors duration-300"
                      >
                        <span className="font-semibold text-white text-lg">{faq.question}</span>
                        <svg
                          className={`w-6 h-6 text-amber-400 transform transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openFaq === index && (
                        <div className="px-8 pb-6">
                          <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>


        </>
      )}


      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}
