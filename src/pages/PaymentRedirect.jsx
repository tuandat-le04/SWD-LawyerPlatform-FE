import { useEffect } from 'react';

const PaymentRedirect = () => {
  useEffect(() => {
    // Lấy query parameters từ URL hiện tại
    const urlParams = window.location.search;
    
    // Redirect về frontend payment return page với cùng params
    const frontendUrl = `http://localhost:5173/payment/return${urlParams}`;
    
    console.log('Redirecting to frontend:', frontendUrl);
    window.location.replace(frontendUrl);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-white text-lg">Đang chuyển hướng...</p>
      </div>
    </div>
  );
};

export default PaymentRedirect;
