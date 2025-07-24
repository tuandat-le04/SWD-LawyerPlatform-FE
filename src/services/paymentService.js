import apiClient from './apiClient';

export const paymentService = {
  // Tạo URL thanh toán VNPay
  createPaymentUrl: async (appointmentId, amount, bankCode = null) => {
    try {
      console.log('Creating payment URL for:', { appointmentId, amount, bankCode });
      
      const response = await apiClient.post('/Payment/create-payment-url', {
        appointmentId: appointmentId,
        amount: amount,
        bankCode: bankCode,
        orderInfo: `Thanh toán tư vấn luật sư - Appointment #${appointmentId}`
      });
      
      console.log('Payment URL response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to create payment URL:', error);
      
      if (error.response) {
        throw new Error(error.response.data?.message || 'Không thể tạo URL thanh toán');
      }
      throw new Error('Có lỗi xảy ra khi tạo URL thanh toán');
    }
  },

  // Xử lý kết quả từ VNPay return
  processVnPayReturn: async (queryParams) => {
    try {
      console.log('Processing VNPay return:', queryParams);
      
      const response = await fetch(`http://localhost:5067/api/Payment/vnpay-return${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log('VNPay return response:', data);
      return data;
    } catch (error) {
      console.error('Failed to process VNPay return:', error);
      throw new Error('Có lỗi xảy ra khi xử lý kết quả thanh toán');
    }
  },

  // Confirm payment (gọi endpoint appointment)
  confirmPayment: async (appointmentId) => {
    try {
      console.log('Confirming payment for appointment:', appointmentId);
      
      const response = await apiClient.post(`/Appointment/${appointmentId}/confirm-payment`);
      
      console.log('Payment confirmation response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to confirm payment:', error);
      
      if (error.response) {
        throw new Error(error.response.data?.message || 'Không thể xác nhận thanh toán');
      }
      throw new Error('Có lỗi xảy ra khi xác nhận thanh toán');
    }
  },

  // Get payment status
  getPaymentStatus: async (appointmentId) => {
    try {
      const response = await apiClient.get(`/Appointment/${appointmentId}/payment-status`);
      return response.data;
    } catch (error) {
      console.error('Failed to get payment status:', error);
      throw new Error('Không thể lấy trạng thái thanh toán');
    }
  }
};
