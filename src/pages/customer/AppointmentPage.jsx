"use client";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Video,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";


export default function Appointment() {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [method, setMethod] = useState("online");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const navigate = useNavigate();

  // Data states - Dữ liệu cố định
  const [consultationTypes] = useState([
    {
      value: "real-estate",
      label: "Luật Bất Động Sản",
      description: "Tư vấn pháp luật về giao dịch, tranh chấp và quy hoạch bất động sản.",
      basePrice: 500000,
    },
    {
      value: "family",
      label: "Luật Hôn Nhân & Gia Đình",
      description: "Tư vấn các vấn đề về kết hôn, ly hôn, quyền nuôi con, phân chia tài sản.",
      basePrice: 600000,
    },
    {
      value: "criminal",
      label: "Luật Hình Sự",
      description: "Tư vấn các vấn đề về tố tụng hình sự, bào chữa, khiếu nại tố cáo.",
      basePrice: 800000,
    },
    {
      value: "business",
      label: "Luật Doanh Nghiệp",
      description: "Tư vấn thành lập doanh nghiệp, tổ chức lại, vận hành và phát triển.",
      basePrice: 1000000,
    },
    {
      value: "labor",
      label: "Luật Lao Động",
      description: "Tư vấn hợp đồng lao động, quyền lợi và nghĩa vụ của người lao động và doanh nghiệp.",
      basePrice: 400000,
    },
    {
      value: "finance",
      label: "Luật Tài Chính & Ngân Hàng",
      description: "Tư vấn các vấn đề tài chính, ngân hàng, đầu tư và tranh chấp ngân hàng.",
      basePrice: 700000,
    },
    {
      value: "administrative",
      label: "Luật Hành Chính",
      description: "Tư vấn khiếu nại, tố cáo, giấy phép và tranh chấp với cơ quan nhà nước.",
      basePrice: 500000,
    },
  ]);

  const [consultationMethods] = useState([
    {
      value: "online",
      label: "Tư vấn trực tuyến",
      icon: "video",
      description: "Gọi video qua Zoom/Google Meet.",
      priceAdjustment: 0,
    },
    {
      value: "offline",
      label: "Tư vấn tại văn phòng",
      icon: "building",
      description: "Gặp trực tiếp tại văn phòng luật sư.",
      priceAdjustment: 100000,
    },
  ]);

  // Time slots cố định - luôn luôn có sẵn
  const [timeSlots] = useState([
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
  ]);

  // Dữ liệu mẫu cho lawyers
  const [lawyers] = useState([
    { id: "1", name: "Nguyễn Văn A", specialty: "Luật Hình Sự" },
    { id: "2", name: "Trần Thị B", specialty: "Luật Hôn Nhân" },
    { id: "3", name: "Phạm Văn C", specialty: "Luật Doanh Nghiệp" }
  ]);

  // UI states
  const [loading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentResult, setAppointmentResult] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calculatedPrice, setCalculatedPrice] = useState("0");

  // Load user email from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData.email) {
      setCustomerEmail(userData.email);
    }
  }, []);

  // Calculate price when consultation type or method changes
  useEffect(() => {
    if (consultationType && method) {
      const typeInfo = consultationTypes.find(t => t.value === consultationType);
      const methodInfo = consultationMethods.find(m => m.value === method);
      const basePrice = typeInfo ? typeInfo.basePrice : 0;
      const methodAdjustment = methodInfo ? methodInfo.priceAdjustment : 0;
      const price = basePrice + methodAdjustment;
      setCalculatedPrice(price.toLocaleString());
    } else {
      setCalculatedPrice("0");
    }
  }, [consultationType, method, consultationTypes, consultationMethods]);

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

    // Validate email
    if (!customerEmail || !customerEmail.includes("@")) {
      setAppointmentResult({
        success: false,
        message: "Vui lòng nhập email hợp lệ để nhận thông báo",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate appointment booking with sample data
    setTimeout(() => {
      setAppointmentResult({
        success: true,
        message: "Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.",
        appointmentId: Math.random().toString(36).substr(2, 9).toUpperCase(),
        appointmentDetails: {
          consultationType,
          selectedDate: selectedDate?.toISOString().split("T")[0],
          selectedTime,
          method,
          selectedLawyer,
          customerEmail,
          notes: customerNotes,
        },
      });
      setIsSubmitting(false);
    }, 1200);
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
    return lawyers.find((lawyer) => lawyer.id === selectedLawyer);
  };

  const getConsultationTypeInfo = () => {
    return consultationTypes.find((type) => type.value === consultationType);
  };

  const getMethodInfo = () => {
    return consultationMethods.find((m) => m.value === method);
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return consultationType && method;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return customerEmail && customerEmail.includes("@");
      default:
        return true;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
          <p className="text-white mt-4">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
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
              {[
                { step: 1, title: "Chọn dịch vụ" },
                { step: 2, title: "Chọn thời gian" },
                { step: 3, title: "Xác nhận" },
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= item.step
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
                    className={`ml-2 text-sm font-medium ${currentStep >= item.step ? "text-white" : "text-gray-400"
                      }`}
                  >
                    {item.title}
                  </span>
                  {index < 2 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${currentStep > item.step ? "bg-amber-500" : "bg-gray-700"
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
                        {consultationTypes.map((type) => (
                          <div
                            key={type.value}
                            onClick={() => setConsultationType(type.value)}
                            className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${consultationType === type.value
                              ? "border-amber-500 bg-amber-500/10"
                              : "border-gray-600 hover:border-gray-500"
                              }`}
                          >
                            <h4 className="font-semibold text-white mb-2">
                              {type.label}
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

                    {/* Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Phương thức tư vấn
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {consultationMethods.map((methodOption) => (
                          <div
                            key={methodOption.value}
                            onClick={() => setMethod(methodOption.value)}
                            className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${method === methodOption.value
                              ? "border-amber-500 bg-amber-500/10"
                              : "border-gray-600 hover:border-gray-500"
                              }`}
                          >
                            <div className="text-center">
                              {methodOption.icon === "video" && (
                                <Video className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                              )}
                              {methodOption.icon === "building" && (
                                <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                              )}
                              <h4 className="font-semibold text-white mb-2">
                                {methodOption.label}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {methodOption.description}
                              </p>
                              {methodOption.priceAdjustment > 0 && (
                                <p className="text-amber-400 text-xs mt-2">
                                  +
                                  {methodOption.priceAdjustment.toLocaleString()}{" "}
                                  VNĐ
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Preview */}
                    {consultationType && method && (
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
                        className={`text-center py-3 rounded-lg transition-all duration-300 ${day.isSelected
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

                  {/* Time Slots - Luôn luôn có sẵn */}
                  {selectedDate && (
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Thời gian có sẵn -{" "}
                        {selectedDate.toLocaleDateString("vi-VN")}
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {timeSlots.map((slot, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`text-center py-3 border rounded-lg transition-all duration-300 ${slot.time === selectedTime
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
                          key={lawyer.id}
                          onClick={() => setSelectedLawyer(lawyer.id)}
                          className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${selectedLawyer === lawyer.id
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
                                {lawyer.specialties?.slice(0, 2).join(", ") || "Tư vấn pháp lý"}
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
                            {getConsultationTypeInfo()?.label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Phương thức:</span>
                          <span className="text-white font-medium">
                            {getMethodInfo()?.label}
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

                    {/* Customer Information */}
                    <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Thông tin liên hệ
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email nhận thông báo{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                            required
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            Email xác nhận đặt lịch sẽ được gửi đến địa chỉ này
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Ghi chú thêm (tùy chọn)
                          </label>
                          <textarea
                            value={customerNotes}
                            onChange={(e) => setCustomerNotes(e.target.value)}
                            placeholder="Mô tả chi tiết vấn đề cần tư vấn hoặc yêu cầu đặc biệt..."
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors resize-none"
                          />
                        </div>
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
                        Đang xử lý...
                      </div>
                    ) : (
                      "Xác nhận đặt lịch"
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
                          {getConsultationTypeInfo()?.label || "Chưa chọn"}
                        </span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-400">Phương thức:</span>
                        <span className="font-medium text-white">
                          {getMethodInfo()?.label || "Chưa chọn"}
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