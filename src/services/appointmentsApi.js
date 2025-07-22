import api from "./api.js";

// Appointment API services
export const appointmentApi = {
  // Lấy danh sách time slots khả dụng
  getTimeSlots: async (date, lawyerId) => {
    try {
      const params = new URLSearchParams();
      if (date) params.append("date", date);
      if (lawyerId) params.append("lawyerId", lawyerId);

      const response = await api.get(`/api/Appointment/time-slots?${params}`);
      return response;
    } catch (error) {
      console.error("Error fetching time slots:", error);
      // Fallback data nếu API lỗi
      return [
        { value: "09:00", label: "09:00 AM", available: true },
        { value: "10:00", label: "10:00 AM", available: true },
        { value: "11:00", label: "11:00 AM", available: false },
        { value: "14:00", label: "02:00 PM", available: true },
        { value: "15:00", label: "03:00 PM", available: true },
        { value: "16:00", label: "04:00 PM", available: true },
        { value: "17:00", label: "05:00 PM", available: false },
      ];
    }
  },

  // Lấy danh sách loại tư vấn
  getConsultationTypes: async () => {
    try {
      const response = await api.get("/api/Appointment/consultation-types");
      return response;
    } catch (error) {
      console.error("Error fetching consultation types:", error);
      // Fallback data nếu API lỗi
      return [
        { value: "legal-advice", label: "Tư vấn pháp lý", price: 500000 },
        { value: "contract-review", label: "Soát xét hợp đồng", price: 800000 },
        { value: "litigation", label: "Tố tụng", price: 1200000 },
        { value: "business-law", label: "Luật doanh nghiệp", price: 1000000 },
      ];
    }
  },

  // Lấy danh sách thời lượng tư vấn
  getDurationOptions: async () => {
    try {
      const response = await api.get("/api/Appointment/duration-options");
      return response;
    } catch (error) {
      console.error("Error fetching duration options:", error);
      // Fallback data nếu API lỗi
      return [
        { value: 30, label: "30 phút" },
        { value: 60, label: "1 giờ" },
        { value: 90, label: "1.5 giờ" },
        { value: 120, label: "2 giờ" },
      ];
    }
  },

  // Lấy danh sách phương thức tư vấn (online, offline, etc.)
  getConsultationMethods: async () => {
    try {
      const response = await api.get("/api/Appointment/consultation-methods");
      return response;
    } catch (error) {
      console.error("Error fetching consultation methods:", error);
      // Fallback data nếu API lỗi
      return [
        { value: "online", label: "Tư vấn trực tuyến", icon: "video" },
        { value: "offline", label: "Tư vấn tại văn phòng", icon: "building" },
        { value: "phone", label: "Tư vấn qua điện thoại", icon: "phone" },
      ];
    }
  },

  // Tính toán giá cho cuộc hẹn
  calculatePrice: async (appointmentData) => {
    try {
      const response = await api.post(
        "/api/Appointment/calculate-price",
        appointmentData
      );
      // Đảm bảo trả về đúng trường price
      if (response && typeof response.price !== "undefined") {
        return response;
      } else if (typeof response.total !== "undefined") {
        // Nếu backend trả về total thay vì price
        return { price: response.total, ...response };
      } else {
        // Nếu không có trường price, fallback
        return { price: 0, breakdown: {} };
      }
    } catch (error) {
      console.error("Error calculating price:", error);
      // Fallback calculation nếu API lỗi
      const basePrice = 500000; // Giá cơ bản 500k
      const durationMultiplier = appointmentData.duration / 60; // Tính theo giờ
      const methodMultiplier = appointmentData.method === "offline" ? 1.2 : 1; // Offline đắt hơn 20%

      const calculatedPrice = Math.round(
        basePrice * durationMultiplier * methodMultiplier
      );

      return {
        price: calculatedPrice,
        breakdown: {
          basePrice,
          duration: appointmentData.duration,
          method: appointmentData.method,
          total: calculatedPrice,
        },
      };
    }
  },

  // Gửi yêu cầu đặt lịch hẹn
  submitAppointment: async (appointmentData) => {
    try {
      const response = await api.post(
        "/api/Appointment/submit",
        appointmentData
      );
      return response;
    } catch (error) {
      console.error("Error submitting appointment:", error);
      throw error;
    }
  },

  // Lấy danh sách cuộc hẹn của user
  getUserAppointments: async (
    userId,
    status = null,
    page = 1,
    pageSize = 10
  ) => {
    try {
      const params = new URLSearchParams();
      if (userId) params.append("userId", userId);
      if (status) params.append("status", status);
      params.append("page", page);
      params.append("pageSize", pageSize);

      const response = await api.get(
        `/api/Appointment/user-appointments?${params}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching user appointments:", error);
      throw error;
    }
  },

  // Các phương thức bổ sung có thể hữu ích

  // Lấy chi tiết một cuộc hẹn
  getAppointmentById: async (appointmentId) => {
    try {
      const response = await api.get(`/api/Appointment/${appointmentId}`);
      return response;
    } catch (error) {
      console.error("Error fetching appointment details:", error);
      throw error;
    }
  },

  // Hủy cuộc hẹn
  cancelAppointment: async (appointmentId, reason = null) => {
    try {
      const data = { reason };
      const response = await api.put(
        `/api/Appointment/${appointmentId}/cancel`,
        data
      );
      return response;
    } catch (error) {
      console.error("Error canceling appointment:", error);
      throw error;
    }
  },

  // Cập nhật trạng thái cuộc hẹn
  updateAppointmentStatus: async (appointmentId, status, notes = null) => {
    try {
      const data = { status, notes };
      const response = await api.put(
        `/api/Appointment/${appointmentId}/status`,
        data
      );
      return response;
    } catch (error) {
      console.error("Error updating appointment status:", error);
      throw error;
    }
  },

  // Reschedule cuộc hẹn
  rescheduleAppointment: async (appointmentId, newDateTime, reason = null) => {
    try {
      const data = { newDateTime, reason };
      const response = await api.put(
        `/api/Appointment/${appointmentId}/reschedule`,
        data
      );
      return response;
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      throw error;
    }
  },
};

// Export default để dễ import
export default appointmentApi;

// Export các hàm riêng lẻ để có thể import destructuring
export const {
  getTimeSlots,
  getConsultationTypes,
  getDurationOptions,
  getConsultationMethods,
  calculatePrice,
  submitAppointment,
  getUserAppointments,
  getAppointmentById,
  cancelAppointment,
  updateAppointmentStatus,
  rescheduleAppointment,
} = appointmentApi;
