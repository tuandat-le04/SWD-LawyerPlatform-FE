"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    Building,
    Gavel,
    Heart,
    Briefcase,
    CreditCard,
    Monitor,
    Users,
    FileText,
    Scale,
    Shield,
    Award,
    Clock,
    Star,
    ArrowRight,
    CheckCircle,
    Phone,
    Mail,
    Calendar,
    Search,
    ChevronDown,
} from "lucide-react"

// Mock data for services
const servicesData = [
    {
        id: 1,
        title: "Luật Bất Động Sản",
        icon: Building,
        description: "Tư vấn chuyên sâu về giao dịch, tranh chấp và quy hoạch bất động sản",
        features: [
            "Tư vấn mua bán nhà đất",
            "Xử lý tranh chấp đất đai",
            "Thủ tục chuyển nhượng",
            "Tư vấn đầu tư BDS",
            "Giải quyết tranh chấp hợp đồng",
        ],
        price: "Từ 500,000 VNĐ",
        duration: "60-90 phút",
        rating: 4.9,
        reviews: 234,
        lawyers: 12,
        cases: 1250,
        successRate: "98%",
        color: "blue",
    },
    {
        id: 2,
        title: "Luật Hình Sự",
        icon: Gavel,
        description: "Bảo vệ quyền lợi và tự do với hỗ trợ pháp lý toàn diện trong các vụ án hình sự",
        features: ["Bào chữa hình sự", "Tư vấn điều tra", "Đại diện tại tòa", "Khiếu nại quyết định", "Tư vấn tố cáo"],
        price: "Từ 800,000 VNĐ",
        duration: "90-120 phút",
        rating: 4.8,
        reviews: 189,
        lawyers: 8,
        cases: 890,
        successRate: "95%",
        color: "red",
    },
    {
        id: 3,
        title: "Luật Hôn Nhân & Gia Đình",
        icon: Heart,
        description: "Hỗ trợ pháp lý tận tâm cho các vấn đề hôn nhân, gia đình và bảo vệ trẻ em",
        features: ["Thủ tục ly hôn", "Phân chia tài sản", "Quyền nuôi con", "Bạo lực gia đình", "Thừa kế gia đình"],
        price: "Từ 600,000 VNĐ",
        duration: "60-90 phút",
        rating: 4.9,
        reviews: 156,
        lawyers: 10,
        cases: 780,
        successRate: "97%",
        color: "pink",
    },
    {
        id: 4,
        title: "Luật Doanh Nghiệp",
        icon: Briefcase,
        description: "Tư vấn toàn diện cho doanh nghiệp về thành lập, vận hành và phát triển",
        features: [
            "Thành lập công ty",
            "Hợp đồng thương mại",
            "Tuân thủ pháp luật",
            "M&A và đầu tư",
            "Giải quyết tranh chấp",
        ],
        price: "Từ 1,000,000 VNĐ",
        duration: "90-120 phút",
        rating: 4.8,
        reviews: 298,
        lawyers: 15,
        cases: 1560,
        successRate: "99%",
        color: "green",
    },
    {
        id: 5,
        title: "Luật Lao Động",
        icon: Users,
        description: "Bảo vệ quyền lợi người lao động và tư vấn cho doanh nghiệp về quan hệ lao động",
        features: ["Hợp đồng lao động", "Chấm dứt hợp đồng", "Bảo hiểm xã hội", "Tranh chấp lao động", "An toàn lao động"],
        price: "Từ 400,000 VNĐ",
        duration: "45-60 phút",
        rating: 4.7,
        reviews: 167,
        lawyers: 9,
        cases: 920,
        successRate: "96%",
        color: "orange",
    },
    {
        id: 6,
        title: "Luật Tài Chính & Ngân Hàng",
        icon: CreditCard,
        description: "Xử lý các vấn đề tài chính phức tạp, nợ xấu và tranh chấp ngân hàng",
        features: ["Xử lý nợ xấu", "Tranh chấp tín dụng", "Bảo hiểm", "Chứng khoán", "Tư vấn đầu tư"],
        price: "Từ 700,000 VNĐ",
        duration: "60-90 phút",
        rating: 4.6,
        reviews: 134,
        lawyers: 7,
        cases: 650,
        successRate: "94%",
        color: "purple",
    },
    {
        id: 7,
        title: "Luật Hành Chính",
        icon: Scale,
        description: "Tư vấn về thủ tục hành chính, giấy phép và tranh chấp với cơ quan nhà nước",
        features: [
            "Thủ tục hành chính",
            "Giấy phép kinh doanh",
            "Khiếu nại hành chính",
            "Tố cáo tham nhũng",
            "Bồi thường nhà nước",
        ],
        price: "Từ 500,000 VNĐ",
        duration: "60-90 phút",
        rating: 4.5,
        reviews: 112,
        lawyers: 8,
        cases: 580,
        successRate: "93%",
        color: "gray",
    },
]

const processSteps = [
    {
        step: 1,
        title: "Đặt lịch tư vấn",
        description: "Chọn dịch vụ và đặt lịch với luật sư phù hợp",
        icon: Calendar,
    },
    {
        step: 2,
        title: "Tư vấn chi tiết",
        description: "Gặp gỡ luật sư và thảo luận về vấn đề của bạn",
        icon: Users,
    },
    {
        step: 3,
        title: "Nhận phương án",
        description: "Nhận được phương án giải quyết cụ thể và chi tiết",
        icon: FileText,
    },
    {
        step: 4,
        title: "Thực hiện dịch vụ",
        description: "Luật sư thực hiện các thủ tục pháp lý theo yêu cầu",
        icon: CheckCircle,
    },
]

const whyChooseUs = [
    {
        icon: Award,
        title: "Đội ngũ chuyên nghiệp",
        description: "Luật sư giàu kinh nghiệm, được đào tạo bài bản",
    },
    {
        icon: Shield,
        title: "Bảo mật tuyệt đối",
        description: "Cam kết bảo mật thông tin khách hàng 100%",
    },
    {
        icon: Clock,
        title: "Phản hồi nhanh chóng",
        description: "Tư vấn và phản hồi trong vòng 24 giờ",
    },
    {
        icon: Star,
        title: "Tỷ lệ thành công cao",
        description: "Hơn 95% khách hàng hài lòng với dịch vụ",
    },
]

const faqs = [
    {
        question: "Làm thế nào để chọn dịch vụ phù hợp?",
        answer: "Bạn có thể mô tả vấn đề của mình qua form tư vấn miễn phí, chúng tôi sẽ gợi ý dịch vụ phù hợp nhất.",
    },
    {
        question: "Chi phí dịch vụ được tính như thế nào?",
        answer: "Chi phí phụ thuộc vào độ phức tạp của vụ việc. Chúng tôi sẽ báo giá cụ thể sau buổi tư vấn đầu tiên.",
    },
    {
        question: "Thời gian xử lý vụ việc là bao lâu?",
        answer: "Thời gian xử lý tùy thuộc vào loại vụ việc và độ phức tạp. Chúng tôi sẽ thông báo timeline cụ thể.",
    },
    {
        question: "Có được hoàn tiền nếu không hài lòng?",
        answer:
            "Chúng tôi có chính sách hoàn tiền trong một số trường hợp nhất định. Vui lòng tham khảo điều khoản dịch vụ.",
    },
]

export default function ServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("rating")
    const [openFaq, setOpenFaq] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const categories = [
        { id: "all", name: "Tất cả dịch vụ" },
        { id: "personal", name: "Cá nhân" },
        { id: "business", name: "Doanh nghiệp" },
        { id: "family", name: "Gia đình" },
        { id: "property", name: "Bất động sản" },
    ]

    const getColorClasses = (color) => {
        const colors = {
            blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400",
            red: "from-red-500/20 to-red-600/10 border-red-500/30 text-red-400",
            pink: "from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-400",
            green: "from-green-500/20 to-green-600/10 border-green-500/30 text-green-400",
            orange: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400",
            purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400",
            indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400",
            gray: "from-gray-500/20 to-gray-600/10 border-gray-500/30 text-gray-400",
        }
        return colors[color] || colors.blue
    }

    const filteredServices = servicesData.filter((service) => {
        const matchesSearch =
            service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory =
            selectedCategory === "all" ||
            (selectedCategory === "personal" && [2, 3, 5, 8].includes(service.id)) ||
            (selectedCategory === "business" && [4, 6, 7].includes(service.id)) ||
            (selectedCategory === "family" && [3].includes(service.id)) ||
            (selectedCategory === "property" && [1].includes(service.id))

        return matchesSearch && matchesCategory
    })

    const sortedServices = [...filteredServices].sort((a, b) => {
        switch (sortBy) {
            case "rating":
                return b.rating - a.rating
            case "price-low":
                return Number.parseInt(a.price.replace(/\D/g, "")) - Number.parseInt(b.price.replace(/\D/g, ""))
            case "price-high":
                return Number.parseInt(b.price.replace(/\D/g, "")) - Number.parseInt(a.price.replace(/\D/g, ""))
            default:
                return 0
        }
    })

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5"></div>
                <div className="relative container mx-auto px-4 text-center">
                    <div
                        className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Dịch Vụ Pháp Lý
                            <span className="text-amber-400"> Chuyên Nghiệp</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Cung cấp giải pháp pháp lý toàn diện với đội ngũ luật sư giàu kinh nghiệm, cam kết mang đến kết quả tốt
                            nhất cho khách hàng
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {[
                                { number: "8+", label: "Lĩnh vực chuyên môn" },
                                { number: "50+", label: "Luật sư chuyên nghiệp" },
                                { number: "5000+", label: "Vụ việc thành công" },
                                { number: "97%", label: "Tỷ lệ hài lòng" },
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl font-bold text-amber-400 mb-2">{stat.number}</div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-12 bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
                            <div className="flex flex-col lg:flex-row gap-6 items-center">
                                {/* Search */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm dịch vụ pháp lý..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="relative">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="px-6 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-amber-500 focus:outline-none appearance-none pr-12"
                                    >
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            <span className="text-amber-400">{sortedServices.length}</span> dịch vụ được tìm thấy
                        </h2>
                        <p className="text-gray-400 text-lg">Chọn dịch vụ phù hợp với nhu cầu của bạn</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedServices.map((service, index) => (
                            <div
                                key={service.id}
                                className="group relative bg-gray-800 border border-gray-700 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 transform hover:-translate-y-2"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Service Header */}
                                <div className="p-8 pb-4">
                                    <div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getColorClasses(service.color)} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <service.icon className="h-8 w-8" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-gray-700/50 rounded-xl p-3 text-center">
                                            <div className="text-lg font-bold text-amber-400">{service.rating}</div>
                                            <div className="text-xs text-gray-400">Đánh giá</div>
                                        </div>
                                        <div className="bg-gray-700/50 rounded-xl p-3 text-center">
                                            <div className="text-lg font-bold text-amber-400">{service.successRate}</div>
                                            <div className="text-xs text-gray-400">Thành công</div>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-6">
                                        <h4 className="text-white font-semibold mb-3">Dịch vụ bao gồm:</h4>
                                        <ul className="space-y-2">
                                            {service.features.slice(0, 3).map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-gray-400">
                                                    <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                            {service.features.length > 3 && (
                                                <li className="text-sm text-amber-400">+{service.features.length - 3} dịch vụ khác</li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Service Info */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400">Thời lượng:</span>
                                            <span className="text-white font-medium">{service.duration}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400">Luật sư:</span>
                                            <span className="text-white font-medium">{service.lawyers} chuyên gia</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400">Đánh giá:</span>
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                                                <span className="text-white font-medium">{service.rating}</span>
                                                <span className="text-gray-400 ml-1">({service.reviews})</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 p-4 rounded-xl mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Phí tư vấn</span>
                                            <span className="text-xl font-bold text-amber-400">{service.price}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => navigate("/appointment")}
                                            className="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-xl transition-all duration-300 font-medium flex items-center justify-center"
                                        >
                                            Đặt lịch ngay
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {sortedServices.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-gray-500 mb-6">
                                <Search className="w-24 h-24 mx-auto opacity-50" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Không tìm thấy dịch vụ</h3>
                            <p className="text-gray-400 text-lg">Vui lòng thử lại với từ khóa khác hoặc điều chỉnh bộ lọc</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 bg-gray-800/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Quy Trình Làm Việc</h2>
                        <p className="text-gray-400 text-lg">4 bước đơn giản để nhận được dịch vụ pháp lý chuyên nghiệp</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                                        <step.icon className="h-10 w-10 text-white" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 border-2 border-amber-500 rounded-full flex items-center justify-center">
                                        <span className="text-amber-400 font-bold text-sm">{step.step}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Tại Sao Chọn BASICO?</h2>
                        <p className="text-gray-400 text-lg">Những lý do khiến khách hàng tin tưởng và lựa chọn chúng tôi</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUs.map((item, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500/30 transition-colors duration-300">
                                    <item.icon className="h-8 w-8 text-amber-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-800/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Câu Hỏi Thường Gặp</h2>
                            <p className="text-gray-400 text-lg">Những thắc mắc phổ biến về dịch vụ của chúng tôi</p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-700/30 transition-colors duration-300"
                                    >
                                        <span className="font-semibold text-white text-lg">{faq.question}</span>
                                        <ChevronDown
                                            className={`w-6 h-6 text-amber-400 transform transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                                        />
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

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-white mb-6">Sẵn Sàng Nhận Tư Vấn Pháp Lý?</h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Đừng để vấn đề pháp lý trở thành gánh nặng. Hãy để chúng tôi hỗ trợ bạn ngay hôm nay.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <button
                                onClick={() => navigate("/appointment")}
                                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Đặt lịch tư vấn ngay
                            </button>
                            <button
                                onClick={() => navigate("/contact")}
                                className="px-8 py-4 border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-900 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Liên hệ tư vấn miễn phí
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-400">
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 mr-2" />
                                <span>Hotline: 1900-BASICO</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 mr-2" />
                                <span>Email: contact@basico.vn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
