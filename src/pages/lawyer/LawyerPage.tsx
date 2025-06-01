"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface Lawyer {
  id: number
  name: string
  title: string
  specialties: string[]
  experience: string
  rating: number
  reviews: number
  location: string
  education: string
  languages: string[]
  consultationFee: string
  avatar: string
  description: string
  successRate: string
  cases: number
  verified: boolean
  online: boolean
}

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

interface FAQ {
  question: string
  answer: string
}

// Mock data for lawyers
const lawyers = [
  {
    id: 1,
    name: "Luật sư Nguyễn Ngọc Quỳnh Như",
    title: "Luật sư Trưởng",
    specialties: ["Luật Dân sự", "Luật Hôn nhân & Gia đình", "Luật Bất động sản"],
    experience: "15 năm kinh nghiệm",
    rating: 4.9,
    reviews: 127,
    location: "TP. Hồ Chí Minh",
    education: "Thạc sĩ Luật - Đại học Luật TP.HCM",
    languages: ["Tiếng Việt", "English", "Tiếng Hàn"],
    consultationFee: "500.000 VNĐ/giờ",
    avatar: "../src/assets/images/sofia.jpg",
    description:
      "Chuyên gia trong lĩnh vực luật dân sự với hơn 15 năm kinh nghiệm. Đã xử lý thành công hơn 500 vụ việc.",
    successRate: "98%",
    cases: 500,
    verified: true,
    online: true,
  },
  {
    id: 2,
    name: "Luật sư Trần Hoàng Yến Nhung",
    title: "Luật sư Chính",
    specialties: ["Luật Lao động", "Luật Doanh nghiệp", "Luật Thuế"],
    experience: "12 năm kinh nghiệm",
    rating: 4.8,
    reviews: 89,
    location: "Hà Nội",
    education: "Tiến sĩ Luật - Đại học Luật Hà Nội",
    languages: ["Tiếng Việt", "English", "中文"],
    consultationFee: "600.000 VNĐ/giờ",
    avatar: "../src/assets/images/sofia.jpg",
    description: "Chuyên gia tư vấn pháp lý cho doanh nghiệp, có kinh nghiệm làm việc tại các công ty luật hàng đầu.",
    successRate: "96%",
    cases: 320,
    verified: true,
    online: false,
  },
  {
    id: 3,
    name: "Luật sư Phạm Hữu Nhật Minh",
    title: "Luật sư",
    specialties: ["Luật Hình sự", "Luật Tố tụng", "Bào chữa"],
    experience: "8 năm kinh nghiệm",
    rating: 4.7,
    reviews: 64,
    location: "Đà Nẵng",
    education: "Cử nhân Luật - Đại học Luật Huế",
    languages: ["Tiếng Việt", "English"],
    consultationFee: "400.000 VNĐ/giờ",
    avatar: "../src/assets/images/sofia.jpg",
    description: "Luật sư trẻ năng động, chuyên về luật hình sự và bào chữa. Tỷ lệ thành công cao trong các vụ án.",
    successRate: "94%",
    cases: 180,
    verified: true,
    online: true,
  },
  {
    id: 4,
    name: "Luật sư Lê Trần Tuấn Đạt",
    title: "Luật sư Chính",
    specialties: ["Luật Sở hữu trí tuệ", "Luật Công nghệ", "Luật Thương mại"],
    experience: "10 năm kinh nghiệm",
    rating: 4.9,
    reviews: 156,
    location: "TP. Hồ Chí Minh",
    education: "Thạc sĩ Luật - Đại học Quốc gia TP.HCM",
    languages: ["Tiếng Việt", "English", "日本語"],
    consultationFee: "700.000 VNĐ/giờ",
    avatar: "../src/assets/images/sofia.jpg",
    description:
      "Chuyên gia hàng đầu về luật sở hữu trí tuệ và công nghệ, từng làm việc cho các tập đoàn công nghệ lớn.",
    successRate: "99%",
    cases: 280,
    verified: true,
    online: true,
  },
  {
    id: 5,
    name: "Luật sư Võ Minh Tuấn",
    title: "Luật sư Trưởng",
    specialties: ["Luật Đầu tư", "Luật Ngân hàng", "M&A"],
    experience: "18 năm kinh nghiệm",
    rating: 5.0,
    reviews: 203,
    location: "Hà Nội",
    education: "Tiến sĩ Luật - Đại học Luật Hà Nội, LLM - Harvard Law School",
    languages: ["Tiếng Việt", "English", "Français"],
    consultationFee: "1.000.000 VNĐ/giờ",
    avatar: "../src/assets/images/sofia.jpg",
    description: "Luật sư hàng đầu trong lĩnh vực đầu tư và M&A, có bằng LLM từ Harvard Law School.",
    successRate: "100%",
    cases: 450,
    verified: true,
    online: false,
  },
  {
    id: 6,
    name: "Luật sư Đặng Thị Mai",
    title: "Luật sư",
    specialties: ["Luật Y tế", "Luật Bảo hiểm", "Luật Tiêu dùng"],
    experience: "6 năm kinh nghiệm",
    rating: 4.6,
    reviews: 42,
    location: "Cần Thơ",
    education: "Cử nhân Luật - Đại học Cần Thơ",
    languages: ["Tiếng Việt", "English"],
    consultationFee: "350.000 VNĐ/giờ",
    avatar: "../src/assets/images/sofia.jpg",
    description: "Luật sư trẻ chuyên về luật y tế và bảo vệ quyền lợi người tiêu dùng.",
    successRate: "92%",
    cases: 95,
    verified: true,
    online: true,
  },
]

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    role: "Giám đốc công ty",
    content:
      "Dịch vụ tư vấn pháp lý rất chuyên nghiệp. Luật sư đã giúp tôi giải quyết vấn đề phức tạp một cách hiệu quả.",
    rating: 5,
    avatar: "../src/assets/images/sofia.jpg",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    role: "Chủ doanh nghiệp",
    content: "Tôi rất hài lòng với chất lượng dịch vụ. Luật sư tận tâm và có kinh nghiệm thực tế cao.",
    rating: 5,
    avatar: "../src/assets/images/sofia.jpg",
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    role: "Khách hàng cá nhân",
    content: "Quy trình tư vấn rõ ràng, minh bạch. Giá cả hợp lý và kết quả vượt mong đợi.",
    rating: 4,
    avatar: "../src/assets/images/sofia.jpg",
  },
]

const faqs = [
  {
    question: "Làm thế nào để đặt lịch tư vấn với luật sư?",
    answer:
      "Bạn có thể đặt lịch trực tiếp qua website, gọi hotline hoặc nhắn tin cho luật sư. Chúng tôi sẽ sắp xếp lịch phù hợp trong vòng 24h.",
  },
  {
    question: "Chi phí tư vấn pháp lý như thế nào?",
    answer:
      "Chi phí tùy thuộc vào từng luật sư và loại vụ việc. Bạn có thể xem phí tư vấn của từng luật sư trên profile. Buổi tư vấn đầu tiên thường có giá ưu đãi.",
  },
  {
    question: "Thông tin cá nhân có được bảo mật không?",
    answer:
      "Chúng tôi cam kết bảo mật tuyệt đối thông tin khách hàng theo quy định pháp luật và đạo đức nghề nghiệp luật sư.",
  },
  {
    question: "Có thể tư vấn trực tuyến không?",
    answer:
      "Có, chúng tôi hỗ trợ tư vấn trực tuyến qua video call, điện thoại hoặc chat. Đặc biệt thuận tiện cho khách hàng ở xa.",
  },
]

export default function LawyersPage() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  }
  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value)
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value)
  }

  const specialties = [
    "Luật Dân sự",
    "Luật Hình sự",
    "Luật Lao động",
    "Luật Doanh nghiệp",
    "Luật Bất động sản",
    "Luật Hôn nhân & Gia đình",
    "Luật Sở hữu trí tuệ",
    "Luật Đầu tư",
    "Luật Y tế",
    "Luật Thuế",
  ]

  const locations = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng"]

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialty = !selectedSpecialty || lawyer.specialties.includes(selectedSpecialty)
    const matchesLocation = !selectedLocation || lawyer.location === selectedLocation

    return matchesSearch && matchesSpecialty && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-gray-900/95 backdrop-blur-sm shadow-2xl sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-2 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                  BASICO
                </h1>
                <p className="text-sm text-gray-400 group-hover:text-amber-300 transition-colors duration-300">
                  DỊCH VỤ PHÁP LÝ CHUYÊN NGHIỆP
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-400 hover:text-amber-400 transition-all duration-300 relative group">
                TRANG CHỦ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="/lawyer"
                className="text-white hover:text-amber-400 transition-all duration-300 font-medium relative group"
              >
                ĐỘI NGŨ
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400"></span>
              </a>
              <a
                href="/#services"
                className="text-gray-400 hover:text-amber-400 transition-all duration-300 relative group"
              >
                DỊCH VỤ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="/#contact"
                className="text-gray-400 hover:text-amber-400 transition-all duration-300 relative group"
              >
                LIÊN HỆ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>

              <button onClick={handleLoginClick} className="bg-amber-500 text-gray-900 px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors font-semibold">
                                Đăng nhập
                            </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-800 py-4 animate-in slide-in-from-top duration-300">
              <div className="flex flex-col space-y-4">
                <a href="/" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  TRANG CHỦ
                </a>
                <a href="/lawyer" className="text-white hover:text-amber-400 transition-colors duration-300">
                  ĐỘI NGŨ
                </a>
                <a href="/#services" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  DỊCH VỤ
                </a>
                <a href="/#contact" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  LIÊN HỆ
                </a>
                <button className="bg-amber-500 text-gray-900 px-6 py-2 rounded-lg hover:bg-amber-600 w-fit transition-all duration-300">
                  Đăng nhập
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
              Đội Ngũ Luật Sư Chuyên Nghiệp
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Kết nối với các luật sư giàu kinh nghiệm, chuyên môn cao để nhận được
              <span className="text-amber-400 font-semibold"> tư vấn pháp lý tốt nhất</span>
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[
              { number: "50+", label: "Luật sư chuyên nghiệp" },
              { number: "24/7", label: "Tư vấn trực tuyến" },
              { number: "100%", label: "Bảo mật thông tin" },
              { number: "1000+", label: "Khách hàng tin tưởng" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${isVisible ? "animate-in slide-in-from-bottom duration-700" : ""}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-3xl font-bold text-amber-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group">
              <div className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform group-hover:scale-105">
                Tư vấn ngay
              </div>
            </button>
            <button className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Xem thêm dịch vụ
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="relative py-12 bg-gray-900/50 backdrop-blur-sm border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Tìm kiếm luật sư phù hợp</h3>
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="relative flex-1 group">
                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Tìm kiếm luật sư hoặc chuyên môn..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="relative w-full lg:w-64 group">
                  <div className="relative">
                    <select
                      value={selectedSpecialty}
                      onChange={handleSpecialtyChange}
                      className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none appearance-none transition-all duration-300"
                    >
                      <option value="">Tất cả chuyên môn</option>
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="relative w-full lg:w-48 group">
                  <div className="relative">
                    <select
                      value={selectedLocation}
                      onChange={handleLocationChange}
                      className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none appearance-none transition-all duration-300"
                    >
                      <option value="">Tất cả địa điểm</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lawyers Grid */}
      <section className="relative py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              <span className="text-amber-400">{filteredLawyers.length}</span> luật sư được tìm thấy
            </h3>
            <p className="text-gray-400 text-lg">Chọn luật sư phù hợp với nhu cầu của bạn</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLawyers.map((lawyer, index) => (
              <div
                key={lawyer.id}
                className="group relative bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Online Status */}
                {lawyer.online && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-green-400 text-xs font-medium">Online</span>
                    </div>
                  </div>
                )}

                {/* Card Header */}
                <div className="relative p-8 pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img
                        src={lawyer.avatar || "/placeholder.svg"}
                        alt={lawyer.name}
                        className="relative w-20 h-20 rounded-full object-cover border-2 border-amber-500/30 group-hover:border-amber-500/70 transition-all duration-300 group-hover:scale-110"
                      />
                      {lawyer.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm px-2 py-1 rounded-full font-bold shadow-lg">
                        {lawyer.rating}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">
                        {lawyer.name}
                      </h3>
                      <p className="text-amber-400 font-medium text-sm mb-2 group-hover:text-amber-300 transition-colors duration-300">
                        {lawyer.title}
                      </p>
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium text-white">{lawyer.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{lawyer.reviews} đánh giá</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{lawyer.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-8 pb-8 space-y-4">
                  {/* Success Rate & Cases */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 rounded-xl p-3 text-center border border-gray-600 group-hover:border-amber-500/30 transition-all duration-300">
                      <div className="text-lg font-bold text-amber-400">{lawyer.successRate}</div>
                      <div className="text-xs text-gray-400">Tỷ lệ thành công</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-xl p-3 text-center border border-gray-600 group-hover:border-amber-500/30 transition-all duration-300">
                      <div className="text-lg font-bold text-amber-400">{lawyer.cases}+</div>
                      <div className="text-xs text-gray-400">Vụ việc</div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h4 className="font-medium text-white mb-2 text-sm group-hover:text-amber-400 transition-colors duration-300">
                      Chuyên môn
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {lawyer.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-amber-500/10 text-amber-400 text-xs px-2 py-1 rounded-full border border-amber-500/20 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-300"
                        >
                          {specialty}
                        </span>
                      ))}
                      {lawyer.specialties.length > 3 && (
                        <span className="bg-gray-600/50 text-gray-300 text-xs px-2 py-1 rounded-full border border-gray-500/20">
                          +{lawyer.specialties.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Experience & Education */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{lawyer.experience}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      <svg
                        className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                      </svg>
                      <span className="line-clamp-2">{lawyer.education}</span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h4 className="font-medium text-white mb-1 text-sm group-hover:text-amber-400 transition-colors duration-300">
                      Ngôn ngữ
                    </h4>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {lawyer.languages.join(", ")}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
                      {lawyer.description}
                    </p>
                  </div>

                  {/* Consultation Fee */}
                  <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 p-4 rounded-xl border border-gray-600 group-hover:border-amber-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Phí tư vấn
                      </span>
                      <span className="font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300">
                        {lawyer.consultationFee}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 px-4 py-2 border border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500/10 transition-all duration-300 text-sm font-medium flex items-center justify-center transform hover:scale-105 group-hover:border-amber-400">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Nhắn tin
                    </button>
                    <button className="flex-1">
                      <div className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center transform hover:scale-105">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z"
                          />
                        </svg>
                        Đặt lịch
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLawyers.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-500 mb-6">
                <svg className="w-24 h-24 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Không tìm thấy luật sư</h3>
              <p className="text-gray-400 text-lg">Vui lòng thử lại với từ khóa khác hoặc điều chỉnh bộ lọc</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Khách hàng nói gì về chúng tôi</h3>
            <p className="text-gray-400 text-lg">Những phản hồi chân thực từ khách hàng</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl">
              <div className="text-center">
                <img
                  src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-amber-500"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-gray-300 mb-6 italic">"{testimonials[currentTestimonial].content}"</p>
                <h4 className="text-xl font-bold text-white">{testimonials[currentTestimonial].name}</h4>
                <p className="text-amber-400">{testimonials[currentTestimonial].role}</p>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-amber-500" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Câu hỏi thường gặp</h3>
            <p className="text-gray-400 text-lg">Những thắc mắc phổ biến về dịch vụ của chúng tôi</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/50 transition-colors duration-300"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-amber-400 transform transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Sẵn sàng nhận tư vấn pháp lý?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Đừng để vấn đề pháp lý trở thành gánh nặng. Hãy để chúng tôi hỗ trợ bạn ngay hôm nay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group">
              <div className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform group-hover:scale-105">
                Liên hệ ngay
              </div>
            </button>
            <button className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Gọi hotline: 1900-xxxx
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-2 rounded-lg">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">BASICO</h4>
                    <p className="text-sm text-gray-400">DỊCH VỤ PHÁP LÝ CHUYÊN NGHIỆP</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  Chúng tôi cung cấp dịch vụ tư vấn pháp lý chuyên nghiệp với đội ngũ luật sư giàu kinh nghiệm, cam kết
                  mang lại giải pháp tối ưu cho mọi vấn đề pháp lý của bạn.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-white mb-4">Dịch vụ</h5>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                      Tư vấn pháp lý
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                      Đại diện tố tụng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                      Soạn thảo hợp đồng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                      Tư vấn doanh nghiệp
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-white mb-4">Liên hệ</h5>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +84 686 868 686
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    contactforwork@basico.vn
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    123 Đường ABC, Quận 1, TP.HCM
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 mb-4 md:mb-0">Copyright © 2025 BASICO. All rights reserved.</p>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                    Chính sách bảo mật
                  </a>
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                    Điều khoản sử dụng
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
