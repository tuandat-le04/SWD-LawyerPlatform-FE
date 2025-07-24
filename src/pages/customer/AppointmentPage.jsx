"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import apiService from "../../services/api";
import { paymentService } from "../../services/paymentService";
import {
  ArrowLeft,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

// Constants - Dữ liệu cố định
const TIME_SLOTS = [
  { time: "08:00", available: true },
  { time: "08:30", available: true },
  { time: "09:00", available: true },
  { time: "09:30", available: true },
  { time: "10:00", available: true },
  { time: "10:30", available: true },
  { time: "11:00", available: true },
  { time: "11:30", available: true },
  { time: "13:00", available: true },
  { time: "13:30", available: true },
  { time: "14:00", available: true },
  { time: "14:30", available: true },
  { time: "15:00", available: true },
  { time: "15:30", available: true },
  { time: "16:00", available: true },
  { time: "16:30", available: true },
  { time: "17:00", available: true },
  { time: "17:30", available: true },
  { time: "18:00", available: true },
  { time: "18:30", available: true },
  { time: "19:00", available: true },
  { time: "19:30", available: true },
  { time: "20:00", available: true },
];

const STEPS = [
  { step: 1, title: "Chọn dịch vụ" },
  { step: 2, title: "Chọn thời gian" },
  { step: 3, title: "Xác nhận" },
];

export default function Appointment() {
  const { user } = useAuth(); // Get user info for customerId
  
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [requestMessage, setRequestMessage] = useState(""); // Thêm state cho request message
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentResult, setAppointmentResult] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calculatedPrice, setCalculatedPrice] = useState("0");
  const [lawyers, setLawyers] = useState([]);
  const [lawtypes, setLawtypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper functions để map giá và mô tả (hardcode ở frontend)
  const getLawtypePrice = (lawtypeName) => {
    const priceMap = {
      "Luật Bất Động Sản": 500000,
      "Luật Hôn Nhân & Gia Đình": 600000,
      "Luật Hình Sự": 800000,
      "Luật Doanh Nghiệp": 1000000,
      "Luật Lao Động": 400000,
      "Luật Tài Chính & Ngân Hàng": 700000,
      "Luật Hành Chính": 500000
    };
    return priceMap[lawtypeName] || 500000;
  };

  const getLawtypeDescription = (lawtypeName) => {
    const descriptionMap = {
      "Luật Bất Động Sản": "Tư vấn pháp luật về giao dịch, tranh chấp và quy hoạch bất động sản.",
      "Luật Hôn Nhân & Gia Đình": "Tư vấn các vấn đề về kết hôn, ly hôn, quyền nuôi con, phân chia tài sản.",
      "Luật Hình Sự": "Tư vấn các vấn đề về tố tụng hình sự, bào chữa, khiếu nại tố cáo.",
      "Luật Doanh Nghiệp": "Tư vấn thành lập doanh nghiệp, tổ chức lại, vận hành và phát triển.",
      "Luật Lao Động": "Tư vấn hợp đồng lao động, quyền lợi và nghĩa vụ của người lao động và doanh nghiệp.",
      "Luật Tài Chính & Ngân Hàng": "Tư vấn các vấn đề tài chính, ngân hàng, đầu tư và tranh chấp ngân hàng.",
      "Luật Hành Chính": "Tư vấn khiếu nại, tố cáo, giấy phép và tranh chấp với cơ quan nhà nước."
    };
    return descriptionMap[lawtypeName] || "Tư vấn pháp luật chuyên nghiệp.";
  };

  // Fetch dữ liệu từ API khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [lawyersResponse, lawtypesResponse] = await Promise.all([
          apiService.getLawyers(),
          apiService.getLawtypes()
        ]);

        // Map dữ liệu từ backend sang format frontend
        if (lawyersResponse.status && lawyersResponse.data) {
          setLawyers(lawyersResponse.data);
        }

        if (lawtypesResponse.status && lawtypesResponse.data) {
          // Map lawtypes để có basePrice (hardcode ở frontend)
          const mappedLawtypes = lawtypesResponse.data.map(lawtype => ({
            lawtypeId: lawtype.lawtypeId,
            lawtypeName: lawtype.lawtypeName,
            // Hardcode giá ở frontend theo yêu cầu
            basePrice: getLawtypePrice(lawtype.lawtypeName),
            description: getLawtypeDescription(lawtype.lawtypeName)
          }));
          setLawtypes(mappedLawtypes);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate price when consultation type changes
  useEffect(() => {
    if (consultationType) {
      const typeInfo = lawtypes.find(t => t.lawtypeId.toString() === consultationType);
      const basePrice = typeInfo ? typeInfo.basePrice : 0;
      setCalculatedPrice(basePrice.toLocaleString());
    } else {
      setCalculatedPrice("0");
    }
  }, [consultationType, lawtypes]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitAppointment = async () => {
    setIsSubmitting(true);
    setAppointmentResult(null);

    try {
      // Validate dữ liệu trước khi gửi
      if (!consultationType || !selectedLawyer || !selectedDate || !selectedTime) {
        throw new Error('Vui lòng điền đầy đủ thông tin: loại tư vấn, luật sư, ngày và giờ');
      }

      // Chuẩn bị dữ liệu theo format backend expect
      const appointmentData = {
        lawtypeId: parseInt(consultationType),
        lawyerId: parseInt(selectedLawyer),
        customerId: parseInt(user?.userId) || null, // Add customerId from auth
        scheduleDate: selectedDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
        scheduleTime: selectedTime + ':00', // Format: HH:mm:ss (TimeOnly format)
        totalAmount: parseFloat(calculatedPrice.replace(/,/g, '')) || 0, // Remove commas and convert to number
        request: requestMessage || 'Đặt lịch tư vấn pháp luật' // Required field - use user input or default
      };

      console.log('Sending appointment data:', appointmentData);

      // Validate parsed data
      if (isNaN(appointmentData.lawtypeId) || isNaN(appointmentData.lawyerId)) {
        throw new Error('ID luật sư hoặc loại tư vấn không hợp lệ');
      }

      // 1. Tạo appointment
      const appointmentResponse = await apiService.createAppointment(appointmentData);

      if (appointmentResponse.status) {
        const appointmentId = appointmentResponse.data.appointmentId || appointmentResponse.data.id;
        const amount = appointmentData.totalAmount;

        console.log('Appointment created successfully:', appointmentId);

        // 2. Tạo payment URL
        const paymentResponse = await paymentService.createPaymentUrl(appointmentId, amount);
        
        if (paymentResponse.status) {
          // 3. Lưu thông tin appointment để xử lý sau khi thanh toán
          localStorage.setItem('pendingAppointment', JSON.stringify({
            appointmentId: appointmentId,
            appointmentData: appointmentResponse.data,
            amount: amount
          }));
          
          console.log('Redirecting to VNPay:', paymentResponse.data.paymentUrl);
          
          // 4. Redirect đến VNPay
          window.location.href = paymentResponse.data.paymentUrl;
        } else {
          throw new Error(paymentResponse.message || 'Không thể tạo URL thanh toán');
        }
      } else {
        throw new Error(appointmentResponse.message || 'Đặt lịch thất bại');
      }
    } catch (error) {
      console.error('Appointment creation error:', error);
      setAppointmentResult({
        success: false,
        message: error.message || 'Có lỗi xảy ra khi đặt lịch'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.getTime() === today.getTime();
      const isPast = date < today;
      const isSelected =
        selectedDate && date.getTime() === selectedDate.getTime();

      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isSelected,
        isAvailable: isCurrentMonth && !isPast,
      });
    }

    return days;
  };

  const getSelectedLawyerInfo = () => {
    return lawyers.find((lawyer) => lawyer.lawyerId.toString() === selectedLawyer);
  };

  const getConsultationTypeInfo = () => {
    return lawtypes.find((type) => type.lawtypeId.toString() === consultationType);
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return consultationType;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return true;
      default:
        return true;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Có lỗi xảy ra: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-amber-500 text-gray-900 rounded-lg"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="mb-6 flex items-center text-gray-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Quay lại trang chủ</span>
          </button>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Đặt Lịch Tư Vấn
            </h1>
            <p className="text-xl text-gray-400">
              Đặt lịch tư vấn trực tuyến với luật sư chuyên nghiệp
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              {STEPS.map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= item.step
                        ? "bg-amber-500 text-gray-900"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {currentStep > item.step ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      item.step
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep >= item.step ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.title}
                  </span>
                  {index < 2 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${
                        currentStep > item.step ? "bg-amber-500" : "bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Success Message */}
          {appointmentResult && appointmentResult.success && (
            <div className="mb-8 bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
              <svg
                className="w-12 h-12 text-green-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h4 className="text-xl font-bold text-white mb-2">
                Đặt lịch thành công!
              </h4>
              <p className="text-gray-300 mb-2">{appointmentResult.message}</p>
              {appointmentResult.appointmentId && (
                <p className="text-green-400 font-medium">
                  Mã đặt lịch: {appointmentResult.appointmentId}
                </p>
              )}
            </div>
          )}

          {/* Appointment Error Message */}
          {appointmentResult && !appointmentResult.success && (
            <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
              <svg
                className="w-12 h-12 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h4 className="text-xl font-bold text-white mb-2">
                Đặt lịch thất bại
              </h4>
              <p className="text-gray-300">{appointmentResult.message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Appointment Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Chọn loại tư vấn
                  </h2>

                  <div className="space-y-6">
                    {/* Consultation Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Lĩnh vực tư vấn
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lawtypes.map((type) => (
                          <div
                            key={type.lawtypeId}
                            onClick={() => setConsultationType(type.lawtypeId.toString())}
                            className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                              consultationType === type.lawtypeId.toString()
                                ? "border-amber-500 bg-amber-500/10"
                                : "border-gray-600 hover:border-gray-500"
                            }`}
                          >
                            <h4 className="font-semibold text-white mb-2">
                              {type.lawtypeName}
                            </h4>
                            <p className="text-gray-400 text-sm mb-2">
                              {type.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-amber-400 font-medium">
                                {type.basePrice.toLocaleString()} VNĐ
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Preview */}
                    {consultationType && (
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">
                            Tổng chi phí ước tính:
                          </span>
                          <span className="text-amber-400 font-bold text-xl">
                            {calculatedPrice} VNĐ
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Date and Time Selection */}
              {currentStep === 2 && (
                <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Chọn ngày và giờ
                  </h2>

                  {/* Calendar Navigation */}
                  <div className="flex justify-between items-center mb-6">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() - 1
                          )
                        )
                      }
                      className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Tháng trước
                    </button>
                    <h3 className="text-lg font-medium text-white">
                      Tháng {currentMonth.getMonth() + 1},{" "}
                      {currentMonth.getFullYear()}
                    </h3>
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1
                          )
                        )
                      }
                      className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Tháng sau
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 mb-8">
                    {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map(
                      (day, i) => (
                        <div
                          key={i}
                          className="text-center text-sm font-medium text-gray-400 py-2"
                        >
                          {day}
                        </div>
                      )
                    )}
                    {generateCalendarDays().map((day, index) => (
                      <button
                        key={index}
                        disabled={!day.isAvailable}
                        onClick={() =>
                          day.isAvailable && setSelectedDate(day.date)
                        }
                        className={`text-center py-3 rounded-lg transition-all duration-300 ${
                          day.isSelected
                            ? "bg-amber-500 text-gray-900 font-bold"
                            : day.isToday
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/50"
                            : day.isAvailable
                            ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                            : "text-gray-600 cursor-not-allowed"
                        } ${!day.isCurrentMonth ? "opacity-30" : ""}`}
                      >
                        {day.day}
                      </button>
                    ))}
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Thời gian có sẵn -{" "}
                        {selectedDate.toLocaleDateString("vi-VN")}
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {TIME_SLOTS.map((slot, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`text-center py-3 border rounded-lg transition-all duration-300 ${
                              slot.time === selectedTime
                                ? "bg-amber-500 text-gray-900 border-amber-500 font-bold"
                                : "border-gray-600 text-gray-300 hover:border-amber-500 hover:text-amber-400"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lawyer Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Chọn luật sư (tùy chọn)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lawyers.slice(0, 4).map((lawyer) => (
                        <div
                          key={lawyer.lawyerId}
                          onClick={() => setSelectedLawyer(lawyer.lawyerId.toString())}
                          className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                            selectedLawyer === lawyer.lawyerId.toString()
                              ? "border-amber-500 bg-amber-500/10"
                              : "border-gray-600 hover:border-gray-500"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <img
                              src={lawyer.avatar || "/placeholder.svg"}
                              alt={lawyer.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-white text-sm">
                                {lawyer.name}
                              </h4>
                              <p className="text-gray-400 text-xs mt-1">
                                {lawyer.specialties || "Tư vấn pháp lý"}
                              </p>
                              <div className="flex items-center mt-2">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-yellow-500 text-xs ml-1">
                                  {lawyer.rating || "5.0"}
                                </span>
                                <span className="text-gray-400 text-xs ml-1">
                                  • {lawyer.experience || "5+ năm"}
                                </span>
                              </div>
                              {lawyer.consultationFee && (
                                <div className="text-amber-400 text-xs mt-1">
                                  {lawyer.consultationFee.toLocaleString()} VNĐ/giờ
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Xác nhận thông tin đặt lịch
                  </h2>

                  <div className="space-y-6">
                    {/* Service Summary */}
                    <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Thông tin dịch vụ
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Loại tư vấn:</span>
                          <span className="text-white font-medium">
                            {getConsultationTypeInfo()?.lawtypeName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Ngày:</span>
                          <span className="text-white font-medium">
                            {selectedDate?.toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Thời gian:</span>
                          <span className="text-white font-medium">
                            {selectedTime}
                          </span>
                        </div>
                        {getSelectedLawyerInfo() && (
                          <div className="flex justify-between">
                            <span className="text-gray-300">Luật sư:</span>
                            <span className="text-white font-medium">
                              {getSelectedLawyerInfo()?.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-semibold text-lg">
                          Tổng chi phí:
                        </span>
                        <span className="text-amber-400 font-bold text-2xl">
                          {calculatedPrice} VNĐ
                        </span>
                      </div>
                    </div>

                    {/* Request Message */}
                    <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Ghi chú yêu cầu
                      </h3>
                      <textarea
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        placeholder="Mô tả chi tiết vấn đề cần tư vấn hoặc yêu cầu đặc biệt..."
                        className="w-full h-24 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                        maxLength={500}
                      />
                      <div className="text-right text-xs text-gray-400 mt-2">
                        {requestMessage.length}/500 ký tự
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <h4 className="text-blue-400 font-semibold mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Thông tin thanh toán
                      </h4>
                      <div className="text-gray-300 text-sm space-y-1">
                        <p>• Sau khi xác nhận, bạn sẽ được chuyển đến trang thanh toán VNPay</p>
                        <p>• Lịch hẹn chỉ được xác nhận sau khi thanh toán thành công</p>
                        <p>• Hỗ trợ thanh toán qua ATM, Internet Banking, QR Code</p>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        className="w-4 h-4 text-amber-500 border-gray-600 rounded focus:ring-amber-500 mt-1"
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="ml-3 text-sm text-gray-400"
                      >
                        Tôi đồng ý với{" "}
                        <a
                          href="#"
                          className="text-amber-400 hover:underline"
                        >
                          điều khoản dịch vụ
                        </a>{" "}
                        và{" "}
                        <a
                          href="#"
                          className="text-amber-400 hover:underline"
                        >
                          chính sách bảo mật
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {currentStep > 1 ? (
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Quay lại
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!canProceedToNextStep()}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-gray-900 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed"
                  >
                    Tiếp tục
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitAppointment}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-gray-900 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-900 border-t-transparent mr-2"></div>
                        Đang tạo đơn...
                      </div>
                    ) : (
                      "Đặt lịch & Thanh toán"
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Summary & Info */}
            <div className="space-y-6">
              {/* Appointment Summary */}
              <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">
                  Tóm tắt đặt lịch
                </h3>
                <div className="space-y-4">
                  {consultationType && (
                    <div className="pb-4 border-b border-gray-700">
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-400">Loại tư vấn:</span>
                        <span className="font-medium text-white">
                          {getConsultationTypeInfo()?.lawtypeName || "Chưa chọn"}
                        </span>
                      </div>
                      {selectedDate && (
                        <div className="flex justify-between mb-3">
                          <span className="text-gray-400">Ngày:</span>
                          <span className="font-medium text-white">
                            {selectedDate.toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      )}
                      {selectedTime && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Thời gian:</span>
                          <span className="font-medium text-white">
                            {selectedTime}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pb-4 border-b border-gray-700">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-white">Tổng cộng:</span>
                      <span className="text-amber-400">
                        {calculatedPrice} VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">
                  Thông tin liên hệ
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Hotline hỗ trợ</h4>
                      <p className="text-sm text-gray-400">1900-BASICO</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Email hỗ trợ</h4>
                      <p className="text-sm text-gray-400">support@basico.vn</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Giờ làm việc</h4>
                      <p className="text-sm text-gray-400">
                        8:00 - 20:00 (T2-CN)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Cần hỗ trợ?
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Nếu bạn gặp khó khăn trong quá trình đặt lịch, vui lòng liên
                  hệ với chúng tôi để được hỗ trợ.
                </p>
                <button className="w-full px-4 py-2 bg-amber-500 text-gray-900 rounded-lg font-medium hover:bg-amber-600 transition-colors">
                  Liên hệ hỗ trợ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
