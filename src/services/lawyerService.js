
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

// Mock data for testimonials
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

// Mock data for FAQs
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

// Mock API functions
export const lawyerService = {
  // Get all lawyers
  getAllLawyers: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return lawyers
  },

  // Get lawyer by ID
  getLawyerById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return lawyers.find((lawyer) => lawyer.id === id)
  },

  // Search lawyers
  searchLawyers: async (params) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    return lawyers.filter((lawyer) => {
      const matchesSearch =
        !params.searchTerm ||
        lawyer.name.toLowerCase().includes(params.searchTerm.toLowerCase()) ||
        lawyer.specialties.some((specialty) => specialty.toLowerCase().includes(params.searchTerm?.toLowerCase() || ""))
      const matchesSpecialty = !params.specialty || lawyer.specialties.includes(params.specialty)
      const matchesLocation = !params.location || lawyer.location === params.location

      return matchesSearch && matchesSpecialty && matchesLocation
    })
  },

  // Get all testimonials
  getAllTestimonials: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return testimonials
  },

  // Get all FAQs
  getAllFaqs: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return faqs
  },

  // Get all specialties
  getAllSpecialties: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const specialties = new Set()
    lawyers.forEach((lawyer) => {
      lawyer.specialties.forEach((specialty) => specialties.add(specialty))
    })
    return Array.from(specialties)
  },

  // Get all locations
  getAllLocations: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const locations = new Set()
    lawyers.forEach((lawyer) => locations.add(lawyer.location))
    return Array.from(locations)
  },
} 