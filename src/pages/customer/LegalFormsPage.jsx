import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FileText,
    Download,
    Search,
    Filter,
    Building,
    Gavel,
    Heart,
    Briefcase,
    CreditCard,
    Users,
    Home,
    Scale,
    Clock,
    Star,
    Eye,
    ChevronDown,
    ArrowLeft,
    House
} from "lucide-react";
import LegalFormModal from "../../components/LegalFormModal";
import CivilLawsuitForm from "../../legalforms/CivilLawsuitForm";
import LandTransferContractForm from "../../legalforms/LandTransferContractForm";
import HouseRentalContractForm from "../../legalforms/HouseRentalContractForm";
import AuthorizationForm from "../../legalforms/AuthorizationForm";
import LaborContractForm from "../../legalforms/LaborContractForm";
import DivorceForm from "../../legalforms/DivorceForm";
import AdministrativeComplaintForm from "../../legalforms/AdministrativeComplaintForm";
import WillForm from "../../legalforms/WillForm";
import ServiceContractForm from "../../legalforms/ServiceContractForm";

import { jsPDF } from "jspdf";



export default function LegalFormsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalForm, setModalForm] = useState(null);
    const navigate = useNavigate();

    // Hàm mở modal xem trước
    const handlePreview = (form) => {
        setModalForm(form);
        setModalOpen(true);
    };

    // Nội dung hiển thị trong modal
    const renderModalContent = () => {
        if (!modalForm) return null;
        // Nếu là mẫu đơn khởi kiện dân sự thì hiển thị component mẫu đơn
        if (modalForm.title === "Đơn khởi kiện dân sự") {
            return <CivilLawsuitForm />;
        }
        if (modalForm.title === "Hợp đồng mua bán nhà đất") {
            return <LandTransferContractForm />;
        }
        if (modalForm.title === "Giấy ủy quyền") {
            return <AuthorizationForm />;
        }
        if (modalForm.title === "Hợp đồng cho thuê nhà") {
            return <HouseRentalContractForm />;
        }
        if (modalForm.title === "Hợp đồng lao động") {
            return <LaborContractForm />;
        }
        if (modalForm.title === "Đơn ly hôn") {
            return <DivorceForm />;
        }
        if (modalForm.title === "Đơn khiếu nại hành chính") {
            return <AdministrativeComplaintForm />;
        }
        if (modalForm.title === "Di chúc") {
            return <WillForm />;
        }
        if (modalForm.title === "Hợp đồng dịch vụ") {
            return <ServiceContractForm />;
        }
        // ...hiển thị các mẫu khác như cũ...
        return (
            <div className="text-gray-800">
                <h2 className="text-2xl font-bold mb-2">{modalForm.title}</h2>
                <p className="mb-4 text-gray-700">{modalForm.description}</p>
                <div className="bg-gray-100 p-4 rounded mb-2">
                    <strong>Loại:</strong> {categories.find(cat => cat.id === modalForm.category)?.name}<br />
                    <strong>Kích thước:</strong> {modalForm.size}<br />
                    <strong>Định dạng:</strong> {modalForm.format}<br />
                    <strong>Lượt tải:</strong> {modalForm.downloads.toLocaleString()}<br />
                    <strong>Đánh giá:</strong> {modalForm.rating}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                    <strong>HƯỚNG DẪN SỬ DỤNG:</strong><br />
                    1. Đọc kỹ toàn bộ nội dung mẫu đơn<br />
                    2. Điền đầy đủ thông tin vào các mục được yêu cầu<br />
                    3. Kiểm tra lại thông tin trước khi nộp<br />
                    4. Nộp đơn tại cơ quan có thẩm quyền<br />
                    <br />
                    <strong>LƯU Ý:</strong><br />
                    - Mẫu đơn này chỉ mang tính chất tham khảo<br />
                    - Nên tham khảo ý kiến luật sư trước khi sử dụng<br />
                    - Cập nhật theo quy định pháp luật hiện hành<br />
                    <br />
                    <strong>Ngày tải:</strong> {new Date().toLocaleDateString('vi-VN')}<br />
                    <strong>Nguồn:</strong> Hệ thống tư vấn pháp lý<br />
                </div>
            </div>
        );
    };

    const categories = [
        { id: "all", name: "Tất cả", icon: FileText },
        { id: "real-estate", name: "Bất động sản", icon: Building },
        { id: "criminal", name: "Hình sự", icon: Gavel },
        { id: "family", name: "Hôn nhân gia đình", icon: Heart },
        { id: "business", name: "Doanh nghiệp", icon: Briefcase },
        { id: "finance", name: "Tài chính", icon: CreditCard },
        { id: "civil", name: "Dân sự", icon: Users }
    ];

    const legalForms = [
        {
            id: 1,
            title: "Đơn khởi kiện dân sự",
            description: "Mẫu đơn khởi kiện dành cho các tranh chấp dân sự, bao gồm tranh chấp hợp đồng, bồi thường thiệt hại.",
            category: "civil",
            downloads: 1234,
            rating: 4.8,
            size: "245 KB",
            isPopular: true
        },
        {
            id: 2,
            title: "Hợp đồng mua bán nhà đất",
            description: "Mẫu hợp đồng chuẩn cho giao dịch mua bán bất động sản, đảm bảo quyền lợi cho cả hai bên.",
            category: "real-estate",
            downloads: 2156,
            rating: 4.9,
            size: "320 KB",
            isPopular: true
        },
        {
            id: 3,
            title: "Giấy ủy quyền",
            description: "Mẫu giấy ủy quyền pháp lý cho các giao dịch và thủ tục hành chính.",
            category: "civil",
            downloads: 1567,
            rating: 4.6,
            size: "150 KB",
            isPopular: true
        },
        {
            id: 4,
            title: "Hợp đồng lao động",
            description: "Mẫu hợp đồng lao động chuẩn theo Bộ luật Lao động 2019.",
            category: "business",
            downloads: 3421,
            rating: 4.8,
            size: "280 KB",
            isPopular: true
        },
        {
            id: 5,
            title: "Đơn ly hôn",
            description: "Mẫu đơn yêu cầu ly hôn và các thủ tục liên quan đến việc chấm dứt hôn nhân.",
            category: "family",
            downloads: 756,
            rating: 4.5,
            size: "220 KB",
            isPopular: false
        },
        {
            id: 6,
            title: "Đơn khiếu nại hành chính",
            description: "Mẫu đơn khiếu nại đối với quyết định hành chính của cơ quan nhà nước.",
            category: "civil",
            downloads: 432,
            rating: 4.4,
            size: "195 KB",
            isPopular: false
        },
        {
            id: 7,
            title: "Hợp đồng cho thuê nhà",
            description: "Mẫu hợp đồng cho thuê bất động sản với các điều khoản bảo vệ quyền lợi.",
            category: "real-estate",
            downloads: 1876,
            rating: 4.7,
            size: "260 KB",
            isPopular: true
        },
        {
            id: 8,
            title: "Di chúc",
            description: "Mẫu di chúc pháp lý đảm bảo tính hiệu lực và bảo vệ quyền lợi thừa kế.",
            category: "civil",
            downloads: 623,
            rating: 4.8,
            size: "210 KB",
            isPopular: false
        },
        {
            id: 9,
            title: "Hợp đồng dịch vụ",
            description: "Mẫu hợp đồng cung cấp dịch vụ với các điều khoản chuẩn.",
            category: "business",
            downloads: 1123,
            rating: 4.5,
            size: "230 KB",
            isPopular: false
        }
    ];

    const filteredForms = legalForms.filter(form => {
        const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            form.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || form.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDownload = (form) => {
        const doc = new jsPDF();
        doc.setFont('Times', 'Normal');
        doc.setFontSize(16);
        doc.text(form.title.toUpperCase(), 10, 20);
        doc.setFontSize(12);
        doc.text(`Mô tả: ${form.description}`, 10, 35);
        doc.text('HƯỚNG DẪN SỬ DỤNG:', 10, 50);
        doc.text('1. Đọc kỹ toàn bộ nội dung mẫu đơn', 15, 60);
        doc.text('2. Điền đầy đủ thông tin vào các mục được yêu cầu', 15, 70);
        doc.text('3. Kiểm tra lại thông tin trước khi nộp', 15, 80);
        doc.text('4. Nộp đơn tại cơ quan có thẩm quyền', 15, 90);
        doc.text('LƯU Ý:', 10, 105);
        doc.text('- Mẫu đơn này chỉ mang tính chất tham khảo', 15, 115);
        doc.text('- Nên tham khảo ý kiến luật sư trước khi sử dụng', 15, 125);
        doc.text('- Cập nhật theo quy định pháp luật hiện hành', 15, 135);
        doc.text(`Ngày tải: ${new Date().toLocaleDateString('vi-VN')}`, 10, 150);
        doc.text('Nguồn: Hệ thống tư vấn pháp lý', 10, 160);
        doc.text('---', 10, 170);
        doc.text('Mẫu đơn chi tiết sẽ được cập nhật tại đây...', 10, 180);
        doc.save(`${form.title}.pdf`);
    };

    const popularForms = legalForms.filter(form => form.isPopular).slice(0, 4);

    return (
        <div className="min-h-screen bg-gray-900">
            <LegalFormModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                formContent={renderModalContent()}
                formData={modalForm}
            />
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-6">
                    </div>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Mẫu Đơn Pháp Lý
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Tải miễn phí các mẫu đơn pháp lý chuẩn, được soạn thảo bởi đội ngũ luật sư giàu kinh nghiệm
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    {/* Search Bar */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm mẫu đơn..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:border-amber-500 transition-colors"
                        >
                            <Filter className="h-5 w-5 mr-2" />
                            {categories.find(cat => cat.id === selectedCategory)?.name}
                            <ChevronDown className="h-4 w-4 ml-2" />
                        </button>

                        {isFilterOpen && (
                            <div className="absolute top-full mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setSelectedCategory(category.id);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-700 transition-colors ${selectedCategory === category.id ? 'bg-gray-700 text-amber-400' : 'text-white'
                                            }`}
                                    >
                                        <category.icon className="h-4 w-4 mr-3" />
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-400">
                        Tìm thấy {filteredForms.length} mẫu đơn
                    </p>
                </div>

                {/* Forms Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredForms.map(form => {
                        const categoryInfo = categories.find(cat => cat.id === form.category);
                        return (
                            <div key={form.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-amber-500/50 transition-all duration-300 transform hover:-translate-y-1">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            {categoryInfo && <categoryInfo.icon className="h-6 w-6 text-amber-400 mr-2" />}
                                            <span className="text-amber-400 text-sm font-medium">
                                                {categoryInfo?.name}
                                            </span>
                                        </div>
                                        {form.isPopular && (
                                            <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                                                Phổ biến
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-white text-lg font-semibold mb-3 line-clamp-2">
                                        {form.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                        {form.description}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                                        <div className="flex items-center space-x-4">
                                            <span>{form.size}</span>
                                            <span>{form.format}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Download className="h-3 w-3 mr-1" />
                                            {form.downloads.toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-3 w-3 ${i < Math.floor(form.rating) ? 'text-amber-400' : 'text-gray-600'
                                                            }`}
                                                        fill="currentColor"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-gray-400 text-xs ml-2">{form.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 pb-6">
                                    <div className="flex gap-2">
                                        <button
                                            className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center justify-center"
                                            onClick={() => handlePreview(form)}
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            Xem trước
                                        </button>
                                        <button
                                            onClick={() => handleDownload(form)}
                                            className="flex-1 bg-amber-500 text-gray-900 py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors font-medium flex items-center justify-center"
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Tải xuống
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* No Results */}
                {filteredForms.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Không tìm thấy mẫu đơn
                        </h3>
                        <p className="text-gray-400">
                            Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
                        </p>
                    </div>
                )}
            </div>

            {/* Footer CTA */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Cần tư vấn thêm về mẫu đơn?
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Đội ngũ luật sư của chúng tôi sẵn sàng hỗ trợ bạn hoàn thiện và kiểm tra các mẫu đơn
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => navigate("/appointment")} className="bg-amber-500 text-gray-900 px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors font-semibold">
                                Đặt lịch tư vấn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}