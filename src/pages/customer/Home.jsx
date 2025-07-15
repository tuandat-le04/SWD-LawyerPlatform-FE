import React, { useState } from "react";
import {
  Scale,
  Calendar,
  Users,
  FileText,
  MessageCircle,
  Star,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Award,
  Search,
  User,
  Menu,
  X,
  Building,
  Gavel,
  Heart,
  Briefcase,
  CreditCard,
  Monitor,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative py-32 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/lawyerbackground.jpg')",
        }}
      >
        {/* Overlay mờ đen để chữ nổi bật hơn */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Kết nối với
                <span className="text-amber-400"> Luật sư </span>
                chuyên nghiệp
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                Hệ thống đặt lịch tư vấn pháp lý trực tuyến, giúp bạn dễ dàng
                tìm kiếm và đặt lịch với các luật sư uy tín
              </p>

              {/* Search Bar */}
              <div className="mb-8">
                <div className="flex gap-4 p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-gray-700">
                  <div className="flex-1 flex items-center">
                    <Search className="h-5 w-5 text-gray-400 ml-3" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm dịch vụ pháp lý..."
                      className="w-full px-3 py-3 border-0 focus:outline-none bg-transparent text-white placeholder-gray-400"
                    />
                  </div>
                  <button className="bg-amber-500 text-gray-900 px-8 py-3 rounded-lg hover:bg-amber-600 transition-all duration-300 font-semibold">
                    Tìm kiếm
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/appointment")}
                  className="bg-amber-500 text-gray-900 px-8 py-4 rounded-xl hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-2xl font-semibold"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Đặt lịch tư vấn</span>
                  </div>
                </button>
                <button
                  className="border-2 border-amber-500 text-amber-500 bg-transparent px-8 py-4 rounded-xl hover:bg-amber-500 hover:text-gray-900 transition-all duration-300 font-semibold">
                  <div className="flex items-center justify-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Tải mẫu đơn</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              DỊCH VỤ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: "Luật Bất Động Sản",
                description:
                  "Cung cấp tư vấn pháp lý chuyên sâu về giao dịch bất động sản, hợp đồng thuê, quy hoạch và sử dụng đất để bảo vệ đầu tư của bạn.",
              },
              {
                icon: Gavel,
                title: "Luật Hình Sự",
                description:
                  "Bảo vệ quyền lợi và tự do của bạn với hỗ trợ pháp lý toàn diện trong các vụ án hình sự, điều tra và xét xử.",
              },
              {
                icon: Heart,
                title: "Luật Hôn Nhân",
                description:
                  "Hỗ trợ pháp lý tận tâm cho nạn nhân bạo lực gia đình, bao gồm các lệnh bảo vệ và các vấn đề pháp lý về gia đình.",
              },
              {
                icon: Briefcase,
                title: "Luật Doanh Nghiệp",
                description:
                  "Tư vấn doanh nghiệp về thành lập công ty, hợp đồng, sáp nhập, tuân thủ và giải quyết tranh chấp để đảm bảo hoạt động suôn sẻ.",
              },
              {
                icon: CreditCard,
                title: "Giải Quyết Tài Chính",
                description:
                  "Xử lý các thương lượng và giải quyết tài chính phức tạp, bao gồm xử lý nợ, yêu cầu bảo hiểm và các vụ bồi thường.",
              },
              {
                icon: Monitor,
                title: "Dịch vụ khác",
                description:
                  "Đáp ứng nhu cầu pháp lý đa dạng của bạn với các dịch vụ khác như tư vấn di chúc, thừa kế, và các vấn đề pháp lý cá nhân.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-amber-500/50 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-amber-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500/30 transition-colors duration-300">
                  <service.icon className="h-8 w-8 text-amber-500" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h4>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-sm font-medium" onClick={() => { navigate(`/services`) }}>Xem thêm</button>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="text-white">
              <div className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                10
              </div>
              <div className="text-amber-400 text-lg font-semibold mb-2">
                Năm kinh nghiệm
              </div>
            </div>
            <div className="text-white">
              <div className="text-6xl md:text-7xl font-bold mb-4 text-white">
                2,456
              </div>
              <div className="text-amber-400 text-lg font-semibold mb-2">
                Khách hàng hài lòng
              </div>
            </div>
            <div className="text-white">
              <div className="text-6xl md:text-7xl font-bold mb-4 text-white">
                25
              </div>
              <div className="text-amber-400 text-lg font-semibold mb-2">
                Giải thưởng lớn nhỏ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ĐỘI NGŨ LUẬT SƯ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "VINCENZO",
                title: "Luật Bất Động Sản",
                description:
                  "Chuyên gia tư vấn pháp lý về giao dịch bất động sản với hơn 10 năm kinh nghiệm.",
                image: "/images/vincenzo.jpg",
              },
              {
                name: "SOFIA",
                title: "Luật Hôn Nhân",
                description:
                  "Luật sư chuyên nghiệp trong lĩnh vực hôn nhân gia đình và bảo vệ quyền lợi phụ nữ trẻ em.",
                image: "/images/sofia.jpg",
              },
              {
                name: "JOHN",
                title: "Luật Doanh Nghiệp",
                description:
                  "Tư vấn doanh nghiệp hàng đầu với chuyên môn sâu về thành lập và vận hành công ty.",
                image: "/images/john.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-amber-500/50 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl mb-6 overflow-hidden group-hover:from-amber-500/10 group-hover:to-amber-600/20 transition-all duration-300">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.title}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-24 w-24 text-gray-500 group-hover:text-amber-500 transition-colors duration-300" />
                    </div>
                  )}
                </div>
                <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-500 transition-colors duration-300">
                  {member.name}
                </h4>
                <p className="text-amber-500 font-medium mb-3">
                  {member.title}
                </p>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-800/50 rounded-3xl p-12 border border-gray-700">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Đăng ký email để nhận bản tin và khuyến mãi.
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mt-8">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
              />
              <button className="bg-amber-500 text-gray-900 px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors font-semibold">
                Gửi
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
