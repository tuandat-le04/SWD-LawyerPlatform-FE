import api from "./api.js";

// Appointment API services
export const appointmentApi = {
  // Trả về danh sách time slots cố định (luôn luôn có sẵn)
  getTimeSlots: async (date, lawyerId) => {
    // Không cần gọi API, trả về time slots cố định
    return [
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
  },

  // Trả về danh sách loại tư vấn cố định
  getConsultationTypes: async () => {
    return [
      {
        value: "real-estate",
        label: "Luật Bất Động Sản",
        description:
          "Tư vấn pháp luật về giao dịch, tranh chấp và quy hoạch bất động sản.",
        basePrice: 500000,
      },
      {
        value: "family",
        label: "Luật Hôn Nhân & Gia Đình",
        description:
          "Tư vấn các vấn đề về kết hôn, ly hôn, quyền nuôi con, phân chia tài sản.",
        basePrice: 600000,
      },
      {
        value: "criminal",
        label: "Luật Hình Sự",
        description:
          "Tư vấn các vấn đề về tố tụng hình sự, bào chữa, khiếu nại tố cáo.",
        basePrice: 800000,
      },
      {
        value: "business",
        label: "Luật Doanh Nghiệp",
        description:
          "Tư vấn thành lập doanh nghiệp, tổ chức lại, vận hành và phát triển.",
        basePrice: 1000000,
      },
      {
        value: "labor",
        label: "Luật Lao Động",
        description:
          "Tư vấn hợp đồng lao động, quyền lợi và nghĩa vụ của người lao động và doanh nghiệp.",
        basePrice: 400000,
      },
      {
        value: "finance",
        label: "Luật Tài Chính & Ngân Hàng",
        description:
          "Tư vấn các vấn đề tài chính, ngân hàng, đầu tư và tranh chấp ngân hàng.",
        basePrice: 700000,
      },
      {
        value: "administrative",
        label: "Luật Hành Chính",
        description:
          "Tư vấn khiếu nại, tố cáo, giấy phép và tranh chấp với cơ quan nhà nước.",
        basePrice: 500000,
      },
    ];
  },

  // Trả về danh sách thời lượng tư vấn cố định
  getDurationOptions: async () => {
    return [
      {
        value: "30",
        label: "30 phút",
        description: "Tư vấn nhanh, giải đáp cơ bản.",
      },
      {
        value: "60",
        label: "60 phút",
        description: "Tư vấn chuyên sâu, giải quyết vấn đề phức tạp.",
      },
    ];
  },

  // Trả về danh sách phương thức tư vấn cố định
  getConsultationMethods: async () => {
    return [
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
    ];
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
  submitAppointment,
  getUserAppointments,
  getAppointmentById,
  cancelAppointment,
  updateAppointmentStatus,
  rescheduleAppointment,
} = appointmentApi;
