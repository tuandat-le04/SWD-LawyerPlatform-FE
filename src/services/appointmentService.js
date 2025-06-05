// Mock data for booking service

// Mock data for available time slots
const timeSlots = [
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

// Mock data for lawyers
const lawyers = [
  {
    id: "nguyen-thi-mai",
    name: "Luật sư Nguyễn Thị Mai",
    avatar: "/src/assets/images/sofia.jpg",
    specialties: ["Luật Dân sự", "Luật Hôn nhân"],
    rating: 4.9,
    reviews: 124,
    experience: "8 năm",
    price: "500,000",
  },
  {
    id: "tran-van-minh",
    name: "Luật sư Trần Văn Minh",
    avatar: "/src/assets/images/vincenzo.jpg",
    specialties: ["Luật Doanh nghiệp", "Luật Lao động"],
    rating: 4.8,
    reviews: 98,
    experience: "12 năm",
    price: "700,000",
  },
  {
    id: "le-hoang-nam",
    name: "Luật sư Lê Hoàng Nam",
    avatar: "/src/assets/images/john.jpg",
    specialties: ["Luật Đầu tư", "M&A"],
    rating: 5.0,
    reviews: 87,
    experience: "15 năm",
    price: "1,000,000",
  },
];

const consultationTypes = [
  { value: "civil", label: "Luật Dân sự" },
  { value: "family", label: "Luật Hôn nhân & Gia đình" },
  { value: "business", label: "Luật Doanh nghiệp" },
  { value: "real-estate", label: "Luật Bất động sản" },
  { value: "labor", label: "Luật Lao động" },
  { value: "criminal", label: "Luật Hình sự" },
  { value: "other", label: "Khác" },
];

const durationOptions = [
  { value: "30", label: "30 phút", price: "500,000" },
  { value: "60", label: "60 phút", price: "800,000" },
  { value: "90", label: "90 phút", price: "1,200,000" },
];

// Mock API functions
export const appointmentService = {
  // Get all time slots
  getTimeSlots: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return timeSlots;
  },

  // Get all lawyers
  getLawyers: async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return lawyers;
  },

  // Get consultation types
  getConsultationTypes: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return consultationTypes;
  },

  // Get duration options
  getDurationOptions: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return durationOptions;
  },

  // Submit booking
  submitBooking: async (bookingData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate validation
    if (
      !bookingData.consultationType ||
      !bookingData.selectedLawyer ||
      !bookingData.selectedDate ||
      !bookingData.selectedTime
    ) {
      throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
    }

    // Return success response
    return {
      success: true,
      bookingId: `BK-${Date.now().toString().slice(-6)}`,
      message: "Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn để xác nhận.",
    };
  },
};
