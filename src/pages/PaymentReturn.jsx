import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { paymentService } from '../services/paymentService';
import { CheckCircle, XCircle, Loader2, CreditCard, Calendar, User } from 'lucide-react';

const PaymentReturn = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const processPaymentReturn = async () => {
      try {
        // Lấy query parameters từ URL
        const queryParams = location.search;
        
        console.log('Processing payment return with params:', queryParams);
        
        // Kiểm tra nếu đã có query params trong URL
        if (!queryParams) {
          setResult({
            success: false,
            message: 'Không tìm thấy thông tin thanh toán'
          });
          setLoading(false);
          return;
        }
        
        // Gọi API xử lý kết quả VNPay
        const response = await paymentService.processVnPayReturn(queryParams);
        
        console.log('VNPay API response:', response);
        
        if (response.status && response.data) {
          // Kiểm tra cả response.data.success và vnPayResponseCode
          const isPaymentSuccess = response.data.success || 
                                 (response.data.vnPayResponseCode === '00' && response.data.vnPayTransactionStatus === '00');
          
          const paymentResult = {
            ...response.data,
            success: isPaymentSuccess // Override success based on VNPay codes
          };
          
          setResult(paymentResult);
          
          // Lấy thông tin appointment từ localStorage
          const pendingAppointment = localStorage.getItem('pendingAppointment');
          if (pendingAppointment) {
            const appointmentData = JSON.parse(pendingAppointment);
            setAppointmentInfo(appointmentData);
            
            // Nếu thanh toán thành công (dựa trên VNPay response code)
            if (isPaymentSuccess) {
              try {
                // Gọi API confirm payment để gửi email và cập nhật status
                const confirmResponse = await paymentService.confirmPayment(appointmentData.appointmentId);
                console.log('Payment confirmed successfully:', confirmResponse);
                
                // Xóa thông tin tạm
                localStorage.removeItem('pendingAppointment');
                
                // Auto redirect sau 5 giây
                setTimeout(() => {
                  navigate('/');
                }, 5000);
              } catch (confirmError) {
                console.error('Error confirming payment:', confirmError);
                // Vẫn hiển thị thành công nhưng log lỗi
              }
            } else {
              console.log('Payment failed based on VNPay response codes');
            }
          }
        } else {
          setResult({
            success: false,
            message: response.message || 'Có lỗi xảy ra khi xử lý thanh toán'
          });
        }
      } catch (error) {
        console.error('Payment processing error:', error);
        setResult({
          success: false,
          message: 'Có lỗi xảy ra khi xử lý kết quả thanh toán'
        });
      } finally {
        setLoading(false);
      }
    };

    processPaymentReturn();
  }, [location.search, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-amber-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Đang xử lý kết quả thanh toán...</p>
          <p className="text-gray-400 text-sm mt-2">Vui lòng không tắt trang này</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 p-8">
        {result?.success ? (
          <>
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            {/* Success Message */}
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Thanh toán thành công!
            </h2>
            <p className="text-gray-300 mb-6 text-center">
              {result.message || 'Giao dịch đã được thực hiện thành công'}
            </p>

            {/* Transaction Details */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Chi tiết giao dịch
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Mã giao dịch:</span>
                  <span className="text-white font-mono">{result.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Số tiền:</span>
                  <span className="text-white font-semibold">{result.amount?.toLocaleString()} VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ngân hàng:</span>
                  <span className="text-white">{result.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Thời gian:</span>
                  <span className="text-white">{new Date(result.paymentDate).toLocaleString('vi-VN')}</span>
                </div>
                {appointmentInfo && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mã lịch hẹn:</span>
                    <span className="text-white">#{appointmentInfo.appointmentId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Appointment Info */}
            {appointmentInfo && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
                <h4 className="text-amber-400 font-semibold mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Thông tin lịch hẹn
                </h4>
                <p className="text-gray-300 text-sm">
                  Lịch hẹn của bạn đã được xác nhận. Email xác nhận sẽ được gửi trong vài phút tới.
                </p>
              </div>
            )}

            {/* Auto redirect notice */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-400 mb-4">
                Bạn sẽ được chuyển về trang chủ trong 5 giây...
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-full bg-amber-500 text-gray-900 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
                >
                  Xem thông tin cá nhân
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors"
                >
                  Về trang chủ ngay
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Error Icon */}
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-white" />
            </div>
            
            {/* Error Message */}
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Thanh toán thất bại!
            </h2>
            <p className="text-gray-300 mb-6 text-center">
              {result?.message || 'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.'}
            </p>

            {/* Error Details */}
            {result?.vnPayResponseCode && result.vnPayResponseCode !== '00' && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6">
                <p className="text-red-400 text-sm">
                  Mã lỗi: {result.vnPayResponseCode}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/appointment')}
                className="w-full bg-amber-500 text-gray-900 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
              >
                Thử lại đặt lịch
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors"
              >
                Về trang chủ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentReturn;
