"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
} from "lucide-react";
import { appointmentService } from "../../services/appointmentService";

export default function AppointmentPage() {
  // State management
  const [selectedTab, setSelectedTab] = useState("new-case");
  const [selectedDate, setSelectedDate] = useState(24);
  const [selectedTime, setSelectedTime] = useState("19:00");
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [duration, setDuration] = useState("30");
  const [paymentMethod, setPaymentMethod] = useState("use-credit");
  const navigate = useNavigate();

  // Data states
  const [timeSlots, setTimeSlots] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [consultationTypes, setConsultationTypes] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          timeSlotsData,
          lawyersData,
          consultationTypesData,
          durationOptionsData,
        ] = await Promise.all([
          appointmentService.getTimeSlots(),
          appointmentService.getLawyers(),
          appointmentService.getConsultationTypes(),
          appointmentService.getDurationOptions(),
        ]);

        setTimeSlots(timeSlotsData);
        setLawyers(lawyersData);
        setConsultationTypes(consultationTypesData);
        setDurationOptions(durationOptionsData);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSubmitBooking = async () => {
    try {
      setIsSubmitting(true);
      setBookingResult(null);

      const bookingData = {
        consultationType,
        selectedLawyer,
        selectedDate,
        selectedTime,
        duration,
        paymentMethod,
      };

      const result = await appointmentService.submitBooking(bookingData);
      setBookingResult({
        success: true,
        message: result.message,
        bookingId: result.bookingId,
      });
    } catch (error) {
      setBookingResult({
        success: false,
        message:
          error.message || "Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    const basePrice = Number.parseInt(
      durationOptions
        .find((d) => d.value === duration)
        ?.price.replace(/,/g, "") || "0"
    );
    return basePrice.toLocaleString();
  };

  const getSelectedLawyerInfo = () => {
    return lawyers.find((lawyer) => lawyer.id === selectedLawyer);
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

          {/* Booking Success Message */}
          {bookingResult && bookingResult.success && (
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
              <p className="text-gray-300 mb-2">{bookingResult.message}</p>
              {bookingResult.bookingId && (
                <p className="text-green-400 font-medium">
                  Mã đặt lịch: {bookingResult.bookingId}
                </p>
              )}
            </div>
          )}

          {/* Booking Error Message */}
          {bookingResult && !bookingResult.success && (
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
              <p className="text-gray-300">{bookingResult.message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Appointment Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Consultation Type Tabs */}
              <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Thông tin buổi tư vấn
                </h2>

                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-700 rounded-xl p-1 mb-8">
                  <button
                    onClick={() => setSelectedTab("new-case")}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      selectedTab === "new-case"
                        ? "bg-amber-500 text-gray-900"
                        : "text-gray-400 hover:text-white hover:bg-gray-600"
                    }`}
                  >
                    Vụ việc mới
                  </button>
                  <button
                    onClick={() => setSelectedTab("existing-case")}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      selectedTab === "existing-case"
                        ? "bg-amber-500 text-gray-900"
                        : "text-gray-400 hover:text-white hover:bg-gray-600"
                    }`}
                  >
                    Vụ việc hiện có
                  </button>
                </div>

                {/* New Case Form */}
                {selectedTab === "new-case" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Loại tư vấn
                      </label>
                      <select
                        value={consultationType}
                        onChange={(e) => setConsultationType(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                      >
                        <option value="">Chọn loại tư vấn</option>
                        {consultationTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tiêu đề buổi tư vấn
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Tư vấn thừa kế đất đai"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Mô tả vấn đề
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Mô tả chi tiết vấn đề pháp lý của bạn..."
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Chọn luật sư
                      </label>
                      <select
                        value={selectedLawyer}
                        onChange={(e) => setSelectedLawyer(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                      >
                        <option value="">Chọn luật sư</option>
                        {lawyers.map((lawyer) => (
                          <option key={lawyer.id} value={lawyer.id}>
                            {lawyer.name} - {lawyer.specialties.join(", ")}
                          </option>
                        ))}
                        <option value="any">Bất kỳ luật sư nào phù hợp</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Thời lượng buổi tư vấn
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                      >
                        {durationOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label} - {option.price} VNĐ
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="translation-needed"
                        type="checkbox"
                        className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded bg-gray-700"
                      />
                      <label
                        htmlFor="translation-needed"
                        className="ml-3 text-sm text-gray-300"
                      >
                        Tôi cần phiên dịch viên (thêm 200,000 VNĐ)
                      </label>
                    </div>
                  </div>
                )}

                {/* Existing Case Form */}
                {selectedTab === "existing-case" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Vụ việc hiện có
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none">
                        <option value="">Chọn vụ việc</option>
                        <option value="case-1">
                          Thừa kế đất đai tại Việt Nam (ID: 12345)
                        </option>
                        <option value="case-2">
                          Ủy quyền mua bán nhà (ID: 12346)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Mục đích buổi tư vấn
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none">
                        <option value="">Chọn mục đích</option>
                        <option value="update">Cập nhật tiến độ</option>
                        <option value="document-review">
                          Xem xét tài liệu
                        </option>
                        <option value="next-steps">
                          Thảo luận các bước tiếp theo
                        </option>
                        <option value="other">Khác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ghi chú bổ sung
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Ghi chú bổ sung về buổi tư vấn..."
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Thời lượng buổi tư vấn
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                      >
                        {durationOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label} - {option.price} VNĐ
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Date and Time Selection */}
              <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Chọn ngày và giờ
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Múi giờ của bạn
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none">
                    <option value="Asia/Ho_Chi_Minh">
                      Việt Nam (UTC+07:00)
                    </option>
                    <option value="Australia/Sydney">
                      Australia/Sydney (UTC+10:00)
                    </option>
                    <option value="America/Los_Angeles">
                      America/Los Angeles (UTC-07:00)
                    </option>
                    <option value="America/New_York">
                      America/New York (UTC-04:00)
                    </option>
                    <option value="Europe/London">
                      Europe/London (UTC+01:00)
                    </option>
                    <option value="Asia/Tokyo">Asia/Tokyo (UTC+09:00)</option>
                  </select>
                </div>

                {/* Calendar Navigation */}
                <div className="flex justify-between items-center mb-6">
                  <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Tháng trước
                  </button>
                  <h3 className="text-lg font-medium text-white">
                    Tháng 6, 2025
                  </h3>
                  <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                    Tháng sau
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 mb-8">
                  {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day, i) => (
                    <div
                      key={i}
                      className="text-center text-sm font-medium text-gray-400 py-2"
                    >
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="text-center py-2"></div>
                  ))}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isToday = day === 3;
                    const isSelected = day === selectedDate;
                    const isAvailable = ![1, 2, 8, 15, 29].includes(day);

                    return (
                      <button
                        key={day}
                        disabled={!isAvailable}
                        onClick={() => setSelectedDate(day)}
                        className={`text-center py-3 rounded-lg transition-all duration-300 ${
                          isSelected
                            ? "bg-amber-500 text-gray-900 font-bold"
                            : isToday
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/50"
                            : isAvailable
                            ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                            : "text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Thời gian có sẵn - {selectedDate}/06/2025
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {timeSlots.map((slot, i) => (
                      <button
                        key={i}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`text-center py-3 border rounded-lg transition-all duration-300 ${
                          slot.time === selectedTime
                            ? "bg-amber-500 text-gray-900 border-amber-500 font-bold"
                            : slot.available
                            ? "border-gray-600 text-gray-300 hover:border-amber-500 hover:text-amber-400"
                            : "text-gray-600 border-gray-700 cursor-not-allowed"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Appointment Summary */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-6">
                  <div className="flex items-start">
                    <Calendar className="h-6 w-6 text-amber-500 mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-white text-lg mb-2">
                        Buổi tư vấn đã chọn
                      </h3>
                      <p className="text-gray-300 mb-1">
                        Thứ{" "}
                        {selectedDate < 7
                          ? selectedDate + 1
                          : ((selectedDate - 1) % 7) + 2}
                        , {selectedDate}/06/2025 • {selectedTime} -{" "}
                        {selectedTime.split(":")[0]}:
                        {(Number.parseInt(selectedTime.split(":")[1]) + 30)
                          .toString()
                          .padStart(2, "0")}{" "}
                        (Giờ Việt Nam)
                      </p>
                      {getSelectedLawyerInfo() && (
                        <p className="text-amber-400">
                          Luật sư: {getSelectedLawyerInfo()?.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmitBooking}
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-900 border-t-transparent mr-2"></div>
                      Đang xử lý...
                    </div>
                  ) : (
                    "Xác nhận lịch hẹn"
                  )}
                </button>
              </div>
            </div>

            {/* Right Column - Summary & Info */}
            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">
                  Tóm tắt đặt lịch
                </h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-700">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-400">Loại tư vấn:</span>
                      <span className="font-medium text-white">
                        {consultationTypes.find(
                          (t) => t.value === consultationType
                        )?.label || "Chưa chọn"}
                      </span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-400">Thời lượng:</span>
                      <span className="font-medium text-white">
                        {duration} phút
                      </span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-400">Ngày:</span>
                      <span className="font-medium text-white">
                        {selectedDate}/06/2025
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Thời gian:</span>
                      <span className="font-medium text-white">
                        {selectedTime} (Giờ Việt Nam)
                      </span>
                    </div>
                  </div>

                  <div className="pb-4 border-b border-gray-700">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-400">Phí tư vấn:</span>
                      <span className="font-medium text-white">
                        {calculateTotal()} VNĐ
                      </span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-400">Phí phiên dịch:</span>
                      <span className="font-medium text-white">0 VNĐ</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-white">Tổng cộng:</span>
                      <span className="text-amber-400">
                        {calculateTotal()} VNĐ
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="use-credit"
                        name="payment-method"
                        type="radio"
                        value="use-credit"
                        checked={paymentMethod === "use-credit"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 bg-gray-700"
                      />
                      <label
                        htmlFor="use-credit"
                        className="ml-3 text-sm text-gray-300"
                      >
                        Sử dụng gói dịch vụ hiện có
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="pay-now"
                        name="payment-method"
                        type="radio"
                        value="pay-now"
                        checked={paymentMethod === "pay-now"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 bg-gray-700"
                      />
                      <label
                        htmlFor="pay-now"
                        className="ml-3 text-sm text-gray-300"
                      >
                        Thanh toán ngay
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Lawyers */}
              <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  Luật sư đề xuất
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Dựa trên nhu cầu của bạn
                </p>
                <div className="space-y-4">
                  {lawyers.slice(0, 2).map((lawyer) => (
                    <div
                      key={lawyer.id}
                      className="bg-gray-700/50 rounded-2xl p-4 border border-gray-600"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={lawyer.avatar || "/placeholder.svg"}
                          alt={lawyer.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-sm">
                            {lawyer.name}
                          </h4>
                          <p className="text-gray-400 text-xs mt-1">
                            {lawyer.specialties.join(", ")} •{" "}
                            {lawyer.experience}
                          </p>
                          <div className="flex items-center mt-2">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-yellow-500 text-xs ml-1">
                              {lawyer.rating}
                            </span>
                            <span className="text-gray-400 text-xs ml-1">
                              ({lawyer.reviews} đánh giá)
                            </span>
                          </div>
                          <button className="text-amber-400 hover:text-amber-300 text-xs mt-2 transition-colors">
                            Xem hồ sơ →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Info */}
              <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">
                  Thông tin buổi tư vấn
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                      <Video className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Tư vấn qua Zoom
                      </h4>
                      <p className="text-sm text-gray-400">
                        Link Zoom sẽ được gửi qua email
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Thời lượng {duration} phút
                      </h4>
                      <p className="text-sm text-gray-400">
                        Có thể kéo dài nếu cần thiết
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                      <Check className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Hỗ trợ đa ngôn ngữ
                      </h4>
                      <p className="text-sm text-gray-400">
                        Tiếng Việt và Tiếng Anh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
