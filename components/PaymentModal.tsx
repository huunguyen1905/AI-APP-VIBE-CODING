
import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Check, X, Download, Loader2, PartyPopper, RefreshCw, AlertCircle } from 'lucide-react';
import { BANK_INFO, PRICING, PROGRAM_NAME, GOOGLE_SHEET_WEBAPP_URL, ZALO_GROUP_URL } from '../constants';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  customerName: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, orderId, customerName }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success'>('pending');
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState<string>('');

  // Hàm kiểm tra trạng thái thanh toán từ Google Sheet (Cột G - Status)
  const checkPaymentStatus = useCallback(async (manual = false) => {
    if (paymentStatus === 'success' || !GOOGLE_SHEET_WEBAPP_URL) return;
    
    if (manual) setIsChecking(true);
    
    try {
      // Gọi đến Web App Script để lấy trạng thái mới nhất của OrderId này
      const response = await fetch(`${GOOGLE_SHEET_WEBAPP_URL}?orderId=${orderId}&_t=${Date.now()}`);
      const data = await response.json();
      
      // Kiểm tra giá trị cột Status (thường trả về PAID, PENDING, v.v.)
      const status = data.status ? data.status.toString().toUpperCase() : '';
      
      if (status === 'PAID' || status === 'SUCCESS' || status === 'DONE') {
        setPaymentStatus('success');
      }
      
      const now = new Date();
      setLastCheckTime(now.toLocaleTimeString('vi-VN'));
    } catch (error) {
      console.error("Lỗi xác thực thanh toán:", error);
    } finally {
      if (manual) {
        // Tạo độ trễ nhẹ để tạo cảm giác hệ thống đang quét dữ liệu thực
        setTimeout(() => setIsChecking(false), 2000);
      }
    }
  }, [orderId, paymentStatus]);

  // Tự động kiểm tra mỗi 5 giây khi modal đang mở
  useEffect(() => {
    if (!isOpen || paymentStatus === 'success') return;

    checkPaymentStatus(); // Kiểm tra ngay khi mở
    const interval = setInterval(() => checkPaymentStatus(), 5000);
    return () => clearInterval(interval);
  }, [isOpen, paymentStatus, checkPaymentStatus]);

  if (!isOpen) return null;

  // Giao diện khi thanh toán ĐÃ ĐƯỢC XÁC NHẬN TRÊN GOOGLE SHEET
  if (paymentStatus === 'success') {
    return (
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-8 text-center animate-scale-up my-8">
             <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle,rgba(37,99,235,0.1)_0%,transparent_70%)] animate-pulse"></div>
             </div>

             <div className="relative z-10">
               <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-6 relative">
                 <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                 <Check className="w-12 h-12 text-green-600" />
               </div>
               
               <h3 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">XÁC NHẬN THÀNH CÔNG!</h3>
               <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                 Hệ thống đã ghi nhận thanh toán của <br/> <span className="font-bold text-gray-900">{customerName}</span>
               </p>

               <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100 mb-8 text-left">
                 <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Thanh toán hợp lệ</p>
                        <p className="text-xs text-gray-500">Cột Status: PAID</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Kích hoạt tài liệu</p>
                        <p className="text-xs text-gray-500">Đã gửi link qua Email của bạn</p>
                      </div>
                    </div>
                 </div>
               </div>

               <button 
                 onClick={() => window.open(ZALO_GROUP_URL, '_blank')}
                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
               >
                 VÀO NHÓM ZALO LỚP HỌC
                 <RefreshCw className="w-4 h-4 rotate-45" />
               </button>
               
               <p className="mt-4 text-[10px] text-gray-400 font-medium">Lưu ý: Bạn cần dùng đúng Zalo đã đăng ký để vào nhóm.</p>
             </div>
          </div>
        </div>
      </div>
    )
  }

  // Giao diện CHỜ THANH TOÁN
  const transferContent = orderId;
  const sepayParams = new URLSearchParams({
    acc: BANK_INFO.accountNo,
    bank: BANK_INFO.bankId,
    amount: PRICING.finalPrice.toString(),
    des: transferContent
  });
  
  const qrUrl = `https://qr.sepay.vn/img?${sepayParams.toString()}`;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR_${orderId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      window.open(qrUrl, '_blank');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-gray-900/80 backdrop-blur-md transition-opacity animate-fade-in"
          onClick={onClose}
        ></div>

        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-up my-8 mx-auto z-10">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Cột trái: QR Code */}
          <div className="w-full md:w-1/2 bg-slate-50 p-8 flex flex-col items-center justify-center text-center relative border-b md:border-b-0 md:border-r border-gray-100">
            <h3 className="text-xl font-black text-gray-800 mb-1">Quét mã QR để thanh toán</h3>
            <p className="text-xs text-gray-500 mb-6">Mã QR chứa sẵn nội dung và số tiền</p>
            
            <div className="relative p-4 bg-white rounded-2xl shadow-xl border border-gray-100 group">
              <img 
                src={qrUrl} 
                alt="Payment QR" 
                className="w-56 h-56 md:w-64 md:h-64 object-contain"
              />
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 shadow-[0_0_10px_rgba(37,99,235,0.8)] animate-scan pointer-events-none rounded-xl"></div>
              
              <button 
                onClick={handleDownloadQR}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-md border border-gray-100 text-[10px] font-bold text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                <Download className="w-3 h-3" />
                TẢI MÃ QR
              </button>
            </div>

            <div className="mt-10 flex flex-col items-center gap-2">
               <div className="flex items-center gap-2 text-blue-600 font-bold text-xs bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>ĐANG CHỜ TÍN HIỆU TỪ NGÂN HÀNG...</span>
               </div>
               {lastCheckTime && (
                 <p className="text-[9px] text-gray-400 font-medium">Cập nhật lần cuối: {lastCheckTime}</p>
               )}
            </div>
          </div>

          {/* Cột phải: Thông tin chuyển khoản */}
          <div className="w-full md:w-1/2 p-8 bg-white flex flex-col">
            <div className="mb-6">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Bước cuối cùng</span>
              <h4 className="text-2xl font-black text-gray-900 mt-2">Thông tin tài khoản</h4>
            </div>

            <div className="space-y-4 flex-1">
              {/* STK */}
              <div className="group">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Số tài khoản ({BANK_INFO.bankId})</p>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:border-blue-200 transition-colors">
                  <span className="text-xl font-mono font-bold text-gray-800 tracking-wider">{BANK_INFO.accountNo}</span>
                  <button 
                    onClick={() => handleCopy(BANK_INFO.accountNo, 'acc')}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {copiedField === 'acc' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 ml-1 font-bold uppercase">{BANK_INFO.accountName}</p>
              </div>

              {/* Số tiền */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Số tiền cần chuyển</p>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-2xl font-black text-blue-600">{formatCurrency(PRICING.finalPrice)}</span>
                </div>
              </div>

              {/* Nội dung */}
              <div className="relative group">
                <div className="flex items-center justify-between mb-1 ml-1">
                  <p className="text-[10px] font-bold text-blue-600 uppercase">Nội dung chuyển khoản (Bắt buộc)</p>
                  <span className="text-[9px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded animate-pulse">NHẬP CHÍNH XÁC</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-200 group-hover:border-blue-400 transition-colors">
                  <span className="text-xl font-bold text-gray-900 tracking-widest">{transferContent}</span>
                  <button 
                    onClick={() => handleCopy(transferContent, 'content')}
                    className="p-2 text-blue-400 hover:text-blue-700 transition-colors"
                  >
                    {copiedField === 'content' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button 
                onClick={() => checkPaymentStatus(true)}
                disabled={isChecking}
                className="w-full bg-slate-900 hover:bg-black disabled:bg-slate-700 text-white font-bold py-4 rounded-2xl shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>HỆ THỐNG ĐANG QUÉT MÃ...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>TÔI ĐÃ CHUYỂN KHOẢN</span>
                  </>
                )}
              </button>
              
              <div className="mt-4 flex items-start gap-2 text-[10px] text-gray-400 leading-relaxed px-2">
                <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <p>Nút trên giúp hệ thống kiểm tra trạng thái ngay lập tức trên Google Sheet. Nếu đã chuyển khoản nhưng chưa thấy xác nhận, vui lòng đợi 1-2 phút để ngân hàng xử lý.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
