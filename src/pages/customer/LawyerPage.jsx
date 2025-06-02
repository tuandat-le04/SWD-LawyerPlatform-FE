"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { lawyerService } from "../../services/lawyerService"

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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [lawyers, setLawyers] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [faqs, setFaqs] = useState([])
  const [specialties, setSpecialties] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const [lawyersData, testimonialsData, faqsData, specialtiesData, locationsData] = await Promise.all([
          lawyerService.getAllLawyers(),
          lawyerService.getAllTestimonials(),
          lawyerService.getAllFaqs(),
          lawyerService.getAllSpecialties(),
          lawyerService.getAllLocations()
        ])
        
        setLawyers(lawyersData)
        setTestimonials(testimonialsData)
        setFaqs(faqsData)
        setSpecialties(specialtiesData)
        setLocations(locationsData)
        setIsVisible(true)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [testimonials])

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value)
  }

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value)
  }

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialty = !selectedSpecialty || lawyer.specialties.includes(selectedSpecialty)
    const matchesLocation = !selectedLocation || lawyer.location === selectedLocation

    return matchesSearch && matchesSpecialty && matchesLocation
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
          <p className="text-white mt-4">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-white text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  if (!lawyers.length) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <p className="text-white text-lg">Không tìm thấy dữ liệu luật sư</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      
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
