// Mock data for appointment service - Dịch vụ đặt lịch tư vấn pháp lý

// Mock data cho các khung giờ có sẵn
const timeSlots = [
  { time: "08:00", available: true },
  { time: "08:30", available: true },
  { time: "09:00", available: true },
  { time: "09:30", available: false },
  { time: "10:00", available: true },
  { time: "10:30", available: true },
  { time: "11:00", available: false },
  { time: "11:30", available: true },
  { time: "13:00", available: true },
  { time: "13:30", available: true },
  { time: "14:00", available: false },
  { time: "14:30", available: true },
  { time: "15:00", available: true },
  { time: "15:30", available: false },
  { time: "16:00", available: true },
  { time: "16:30", available: true },
  { time: "17:00", available: true },
  { time: "17:30", available: false },
  { time: "18:00", available: true },
  { time: "18:30", available: true },
  { time: "19:00", available: true },
  { time: "19:30", available: true },
  { time: "20:00", available: true },
];

// Mock data cho các loại tư vấn
const consultationTypes = [
  {
    value: "civil",
    label: "Luật Dân sự",
    description: "Tranh chấp dân sự, hợp đồng, bồi thường thiệt hại",
    basePrice: "500,000",
  },
  {
    value: "family",
    label: "Luật Hôn nhân & Gia đình",
    description: "Ly hôn, nuôi con, chia tài sản, bạo lực gia đình",
    basePrice: "600,000",
  },
  {
    value: "business",
    label: "Luật Doanh nghiệp",
    description:
      "Thành lập công ty, hợp đồng thương mại, tranh chấp kinh doanh",
    basePrice: "800,000",
  },
  {
    value: "real-estate",
    label: "Luật Bất động sản",
    description: "Mua bán nhà đất, tranh chấp đất đai, thủ tục pháp lý",
    basePrice: "700,000",
  },
  {
    value: "labor",
    label: "Luật Lao động",
    description: "Hợp đồng lao động, sa thải, bảo hiểm xã hội",
    basePrice: "500,000",
  },
  {
    value: "criminal",
    label: "Luật Hình sự",
    description: "Bào chữa, tố cáo, khiếu nại quyết định tố tụng",
    basePrice: "1,000,000",
  },
  {
    value: "administrative",
    label: "Luật Hành chính",
    description: "Khiếu nại quyết định hành chính, thủ tục giấy phép",
    basePrice: "400,000",
  },
  {
    value: "other",
    label: "Lĩnh vực khác",
    description: "Tư vấn các vấn đề pháp lý khác",
    basePrice: "500,000",
  },
];

// Mock data cho các gói thời lượng tư vấn
const durationOptions = [
  {
    value: "30",
    label: "30 phút",
    description: "Tư vấn nhanh, giải đáp thắc mắc cơ bản",
    priceMultiplier: 0.6,
  },
  {
    value: "60",
    label: "60 phút",
    description: "Tư vấn chi tiết, phân tích vấn đề",
    priceMultiplier: 1.0,
  },
  {
    value: "90",
    label: "90 phút",
    description: "Tư vấn chuyên sâu, lập kế hoạch pháp lý",
    priceMultiplier: 1.4,
  },
  {
    value: "120",
    label: "120 phút",
    description: "Tư vấn toàn diện, soạn thảo tài liệu",
    priceMultiplier: 1.8,
  },
];

// Mock data cho các phương thức tư vấn
const consultationMethods = [
  {
    value: "online",
    label: "Tư vấn trực tuyến",
    description: "Qua Zoom, Google Meet hoặc điện thoại",
    icon: "video",
    available: true,
    priceAdjustment: 0,
  },
  {
    value: "office",
    label: "Tư vấn tại văn phòng",
    description: "Gặp mặt trực tiếp tại văn phòng luật sư",
    icon: "building",
    available: true,
    priceAdjustment: 0,
  },
];

// Mock data cho trạng thái đặt lịch
const appointmentStatuses = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  NO_SHOW: "no_show",
};

// Mock data cho lịch sử đặt lịch của người dùng
const userAppointmentHistory = [
  {
    id: "AP-123456",
    consultationType: "civil",
    consultationTypeLabel: "Luật Dân sự",
    lawyerId: "lawyer-001",
    lawyerName: "Luật sư Nguyễn Thị Mai",
    date: "2025-06-15",
    time: "14:00",
    duration: 60,
    method: "online",
    status: "completed",
    totalPrice: "500,000",
    notes: "Tư vấn về tranh chấp hợp đồng mua bán",
    createdAt: "2025-06-10T10:30:00Z",
    meetingLink: "https://zoom.us/j/123456789",
  },
  {
    id: "AP-123457",
    consultationType: "family",
    consultationTypeLabel: "Luật Hôn nhân & Gia đình",
    lawyerId: "lawyer-002",
    lawyerName: "Luật sư Trần Văn Minh",
    date: "2025-06-20",
    time: "09:00",
    duration: 90,
    method: "office",
    status: "confirmed",
    totalPrice: "840,000",
    notes: "Tư vấn về thủ tục ly hôn",
    createdAt: "2025-06-18T15:20:00Z",
  },
];

// Utility Functions
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const calculatePrice = (consultationType, duration, method) => {
  const baseConsultation = consultationTypes.find(
    (c) => c.value === consultationType
  );
  const durationOption = durationOptions.find(
    (d) => d.value === duration.toString()
  );
  const methodOption = consultationMethods.find((m) => m.value === method);

  if (!baseConsultation || !durationOption || !methodOption) {
    return "0";
  }

  const basePrice = Number.parseInt(
    baseConsultation.basePrice.replace(/,/g, "")
  );
  const adjustedPrice = basePrice * durationOption.priceMultiplier;
  const finalPrice = adjustedPrice + methodOption.priceAdjustment;

  return Math.round(finalPrice).toLocaleString();
};

const validateAppointmentData = (appointmentData) => {
  const errors = [];

  if (!appointmentData.consultationType) {
    errors.push("Vui lòng chọn loại tư vấn");
  }

  if (!appointmentData.selectedDate) {
    errors.push("Vui lòng chọn ngày tư vấn");
  }

  if (!appointmentData.selectedTime) {
    errors.push("Vui lòng chọn giờ tư vấn");
  }

  if (!appointmentData.duration) {
    errors.push("Vui lòng chọn thời lượng tư vấn");
  }

  if (!appointmentData.method) {
    errors.push("Vui lòng chọn phương thức tư vấn");
  }

  if (!appointmentData.customerInfo?.name) {
    errors.push("Vui lòng nhập họ tên");
  }

  if (!appointmentData.customerInfo?.phone) {
    errors.push("Vui lòng nhập số điện thoại");
  }

  if (!appointmentData.customerInfo?.email) {
    errors.push("Vui lòng nhập email");
  }

  return errors;
};

// Mock API functions
export const appointmentService = {
  // Lấy tất cả khung giờ có sẵn
  getTimeSlots: async (date = null) => {
    await delay(300);

    // Nếu có ngày cụ thể, có thể filter theo ngày
    if (date) {
      // Logic để check availability theo ngày
      const dayOfWeek = new Date(date).getDay();
      if (dayOfWeek === 0) {
        // Chủ nhật
        return timeSlots.filter(
          (slot) =>
            Number.parseInt(slot.time.split(":")[0]) >= 14 &&
            Number.parseInt(slot.time.split(":")[0]) <= 18
        );
      }
    }

    return timeSlots;
  },

  // Lấy danh sách loại tư vấn
  getConsultationTypes: async () => {
    await delay(200);
    return consultationTypes;
  },

  // Lấy các tùy chọn thời lượng
  getDurationOptions: async () => {
    await delay(200);
    return durationOptions;
  },

  // Lấy các phương thức tư vấn
  getConsultationMethods: async () => {
    await delay(200);
    return consultationMethods;
  },

  // Tính giá tư vấn
  calculateConsultationPrice: async (consultationType, duration, method) => {
    await delay(100);
    return {
      price: calculatePrice(consultationType, duration, method),
      breakdown: {
        basePrice:
          consultationTypes.find((c) => c.value === consultationType)
            ?.basePrice || "0",
        durationMultiplier:
          durationOptions.find((d) => d.value === duration.toString())
            ?.priceMultiplier || 1,
        methodAdjustment:
          consultationMethods.find((m) => m.value === method)
            ?.priceAdjustment || 0,
      },
    };
  },

  // Kiểm tra tính khả dụng của slot
  checkSlotAvailability: async (date, time, lawyerId = null) => {
    await delay(400);

    // Mock logic kiểm tra availability
    const slot = timeSlots.find((s) => s.time === time);
    if (!slot) {
      return { available: false, reason: "Khung giờ không hợp lệ" };
    }

    if (!slot.available) {
      return { available: false, reason: "Khung giờ đã được đặt" };
    }

    // Kiểm tra ngày trong quá khứ
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return { available: false, reason: "Không thể đặt lịch trong quá khứ" };
    }

    return { available: true };
  },

  // Đặt lịch tư vấn
  submitAppointment: async (appointmentData) => {
    await delay(1500);

    // Validate dữ liệu
    const validationErrors = validateAppointmentData(appointmentData);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(", "));
    }

    // Kiểm tra slot availability
    const availability = await appointmentService.checkSlotAvailability(
      appointmentData.selectedDate,
      appointmentData.selectedTime,
      appointmentData.selectedLawyer
    );

    if (!availability.available) {
      throw new Error(availability.reason);
    }

    // Tính giá
    const priceInfo = await appointmentService.calculateConsultationPrice(
      appointmentData.consultationType,
      appointmentData.duration,
      appointmentData.method
    );

    // Tạo appointment ID
    const appointmentId = `AP-${Date.now().toString().slice(-6)}`;

    // Tạo meeting link nếu là tư vấn online
    let meetingLink = null;
    if (appointmentData.method === "online") {
      meetingLink = `https://zoom.us/j/${Math.random()
        .toString()
        .slice(2, 11)}`;
    }

    const newAppointment = {
      id: appointmentId,
      consultationType: appointmentData.consultationType,
      consultationTypeLabel: consultationTypes.find(
        (c) => c.value === appointmentData.consultationType
      )?.label,
      lawyerId: appointmentData.selectedLawyer,
      lawyerName: appointmentData.lawyerName || "Luật sư được phân công",
      date: appointmentData.selectedDate,
      time: appointmentData.selectedTime,
      duration: Number.parseInt(appointmentData.duration),
      method: appointmentData.method,
      status: appointmentStatuses.PENDING,
      totalPrice: priceInfo.price,
      notes: appointmentData.notes || "",
      customerInfo: appointmentData.customerInfo,
      createdAt: new Date().toISOString(),
      meetingLink: meetingLink,
    };

    // Thêm vào lịch sử (mock)
    userAppointmentHistory.unshift(newAppointment);

    return {
      success: true,
      appointmentId: appointmentId,
      message:
        "Đặt lịch tư vấn thành công! Chúng tôi sẽ liên hệ xác nhận trong vòng 2 giờ.",
      appointmentDetails: newAppointment,
      paymentInfo: {
        amount: priceInfo.price,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h sau
        paymentMethods: ["credit_card", "bank_transfer", "e_wallet"],
      },
    };
  },

  // Lấy lịch sử đặt lịch của người dùng
  getUserAppointmentHistory: async (userId, limit = 10) => {
    await delay(500);
    return {
      appointments: userAppointmentHistory.slice(0, limit),
      total: userAppointmentHistory.length,
      hasMore: userAppointmentHistory.length > limit,
    };
  },

  // Lấy chi tiết appointment theo ID
  getAppointmentById: async (appointmentId) => {
    await delay(300);
    const appointment = userAppointmentHistory.find(
      (a) => a.id === appointmentId
    );
    if (!appointment) {
      throw new Error("Không tìm thấy thông tin đặt lịch");
    }
    return appointment;
  },

  // Hủy đặt lịch
  cancelAppointment: async (appointmentId, reason = "") => {
    await delay(800);

    const appointmentIndex = userAppointmentHistory.findIndex(
      (a) => a.id === appointmentId
    );
    if (appointmentIndex === -1) {
      throw new Error("Không tìm thấy thông tin đặt lịch");
    }

    const appointment = userAppointmentHistory[appointmentIndex];

    // Kiểm tra xem có thể hủy không (ví dụ: không thể hủy trong vòng 2h trước giờ hẹn)
    const appointmentDateTime = new Date(
      `${appointment.date}T${appointment.time}:00`
    );
    const now = new Date();
    const timeDiff = appointmentDateTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (hoursDiff < 2) {
      throw new Error(
        "Không thể hủy lịch hẹn trong vòng 2 giờ trước giờ tư vấn"
      );
    }

    if (appointment.status === appointmentStatuses.COMPLETED) {
      throw new Error("Không thể hủy lịch hẹn đã hoàn thành");
    }

    if (appointment.status === appointmentStatuses.CANCELLED) {
      throw new Error("Lịch hẹn đã được hủy trước đó");
    }

    // Cập nhật trạng thái
    userAppointmentHistory[appointmentIndex] = {
      ...appointment,
      status: appointmentStatuses.CANCELLED,
      cancelReason: reason,
      cancelledAt: new Date().toISOString(),
    };

    return {
      success: true,
      message: "Hủy lịch hẹn thành công",
      refundInfo: {
        eligible: hoursDiff >= 24, // Hoàn tiền nếu hủy trước 24h
        amount: hoursDiff >= 24 ? appointment.totalPrice : "0",
        processingTime: "3-5 ngày làm việc",
      },
    };
  },

  // Đổi lịch hẹn
  rescheduleAppointment: async (appointmentId, newDate, newTime) => {
    await delay(1000);

    const appointmentIndex = userAppointmentHistory.findIndex(
      (a) => a.id === appointmentId
    );
    if (appointmentIndex === -1) {
      throw new Error("Không tìm thấy thông tin đặt lịch");
    }

    const appointment = userAppointmentHistory[appointmentIndex];

    if (
      appointment.status !== appointmentStatuses.CONFIRMED &&
      appointment.status !== appointmentStatuses.PENDING
    ) {
      throw new Error(
        "Chỉ có thể đổi lịch cho các cuộc hẹn đang chờ xác nhận hoặc đã xác nhận"
      );
    }

    // Kiểm tra slot mới có available không
    const availability = await appointmentService.checkSlotAvailability(
      newDate,
      newTime,
      appointment.lawyerId
    );
    if (!availability.available) {
      throw new Error(availability.reason);
    }

    // Cập nhật thông tin
    userAppointmentHistory[appointmentIndex] = {
      ...appointment,
      date: newDate,
      time: newTime,
      rescheduledAt: new Date().toISOString(),
      originalDate: appointment.date,
      originalTime: appointment.time,
    };

    return {
      success: true,
      message: "Đổi lịch hẹn thành công",
      newAppointmentDetails: userAppointmentHistory[appointmentIndex],
    };
  },

  // Đánh giá sau khi tư vấn
  submitAppointmentReview: async (appointmentId, rating, comment) => {
    await delay(600);

    const appointmentIndex = userAppointmentHistory.findIndex(
      (a) => a.id === appointmentId
    );
    if (appointmentIndex === -1) {
      throw new Error("Không tìm thấy thông tin đặt lịch");
    }

    const appointment = userAppointmentHistory[appointmentIndex];

    if (appointment.status !== appointmentStatuses.COMPLETED) {
      throw new Error("Chỉ có thể đánh giá sau khi hoàn thành buổi tư vấn");
    }

    userAppointmentHistory[appointmentIndex] = {
      ...appointment,
      review: {
        rating: rating,
        comment: comment,
        reviewedAt: new Date().toISOString(),
      },
    };

    return {
      success: true,
      message:
        "Cảm ơn bạn đã đánh giá! Phản hồi của bạn giúp chúng tôi cải thiện dịch vụ.",
    };
  },
};
