import * as appointmentsApi from "./appointmentsApi";

// appointmentService với dữ liệu cố định và chỉ gọi API cho việc submit
export const appointmentService = {
  // Trả về danh sách loại tư vấn cố định
  getConsultationTypes: async () => [
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
  ],

  // Trả về danh sách thời lượng cố định
  getDurationOptions: async () => [
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
  ],

  // Trả về danh sách phương thức tư vấn cố định
  getConsultationMethods: async () => [
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
  ],

  // Trả về time slots cố định - luôn luôn có sẵn
  getTimeSlots: async (date, lawyerId) => [
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
  ],

  // Submit appointment - transform data và gọi API
  submitAppointment: async (appointmentData) => {
    try {
      // Transform data để phù hợp với API backend
      const transformedData = {
        // Đảm bảo consultationType được map đúng
        consultationTypeId: getConsultationTypeId(
          appointmentData.consultationType
        ),

        // Đảm bảo duration là số
        duration:
          typeof appointmentData.duration === "string"
            ? Number(appointmentData.duration)
            : appointmentData.duration,

        // Transform date
        date:
          appointmentData.selectedDate instanceof Date
            ? appointmentData.selectedDate.toISOString().split("T")[0]
            : appointmentData.selectedDate,

        // Transform time
        time: appointmentData.selectedTime,

        // Transform method
        method: appointmentData.method,

        // Transform lawyer ID (nếu có)
        lawyerId: appointmentData.selectedLawyer
          ? typeof appointmentData.selectedLawyer === "string"
            ? Number(appointmentData.selectedLawyer)
            : appointmentData.selectedLawyer
          : null,

        // Transform email
        email: appointmentData.customerEmail,

        // Transform notes
        note: appointmentData.notes || appointmentData.customerNotes || null,
      };

      // Loại bỏ các trường null/undefined
      Object.keys(transformedData).forEach((key) => {
        if (
          transformedData[key] === null ||
          transformedData[key] === undefined ||
          transformedData[key] === ""
        ) {
          delete transformedData[key];
        }
      });

      // Gọi API
      const response = await appointmentsApi.submitAppointment(transformedData);

      return {
        success: true,
        message:
          response.message ||
          "Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.",
        appointmentId: response.appointmentId || generateAppointmentId(),
        appointmentDetails: response.appointmentDetails || null,
      };
    } catch (error) {
      console.error("Error in appointmentService.submitAppointment:", error);
      throw new Error(
        error.message || "Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại sau."
      );
    }
  },

  // Các method khác delegate về appointmentsApi
  getUserAppointments: appointmentsApi.getUserAppointments,
  getAppointmentById: appointmentsApi.getAppointmentById,
  cancelAppointment: appointmentsApi.cancelAppointment,
  updateAppointmentStatus: appointmentsApi.updateAppointmentStatus,
  rescheduleAppointment: appointmentsApi.rescheduleAppointment,
};

// Helper function để map consultation type value sang ID
function getConsultationTypeId(consultationType) {
  const typeMapping = {
    "real-estate": 1,
    family: 2,
    criminal: 3,
    business: 4,
    labor: 5,
    finance: 6,
    administrative: 7,
  };

  return typeMapping[consultationType] || 1; // Default to 1 if not found
}

// Helper function để generate appointment ID nếu backend không trả về
function generateAppointmentId() {
  return (
    "APT" +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 3).toUpperCase()
  );
}

// Export default
export default appointmentService;
