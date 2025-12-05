import React, { useState, useEffect } from 'react';
import { Copy, Check, X, ShieldCheck, Download, Loader2, Sparkles, PartyPopper } from 'lucide-react';
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

  useEffect(() => {
    if (!isOpen || paymentStatus === 'success' || !GOOGLE_SHEET_WEBAPP_URL) return;

    const checkPaymentStatus = async () => {
      try {
        // Thêm tham số _t (timestamp) để tránh browser cache kết quả cũ
        const response = await fetch(`${GOOGLE_SHEET_WEBAPP_URL}?orderId=${orderId}&_t=${Date.now()}`);
        const data = await response.json();
        
        // Chuyển status về chữ hoa để so sánh (tránh lỗi do nhập Paid/paid/PAID)
        const status = data.status ? data.status.toString().toUpperCase() : '';
        
        if (status === 'PAID' || status === 'SUCCESS' || status === 'DONE') {
          setPaymentStatus('success');
        }
      } catch (error) {
        // Silent error
      }
    };

    // Kiểm tra ngay lập tức
    checkPaymentStatus();
    
    // Sau đó kiểm tra định kỳ mỗi 2 giây (giảm xuống 2s cho nhanh hơn)
    const interval = setInterval(checkPaymentStatus, 2000);
    return () => clearInterval(interval);
  }, [isOpen, orderId, paymentStatus]);

  if (!isOpen) return null;

  if (paymentStatus === 'success') {
    return (
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-8 text-center animate-scale-up my-8">
             <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,transparent_70%)] animate-pulse"></div>
             </div>

             <div className="relative z-10">
               <div className="inline-flex items-center justify-center w-24 h-24 bg-violet-100 rounded-full mb-6 relative">
                 <div className="absolute inset-0 bg-violet-400 rounded-full animate-ping opacity-20"></div>
                 <PartyPopper className="w-12 h-12 text-violet-600" />
               </div>
               
               <h3 className="text-3xl font-black text-gray-900 mb-2">ĐĂNG KÝ THÀNH CÔNG!</h3>
               <p className="text-gray-600 text-lg mb-8">
                 Chào mừng <span className="font-bold text-gray-900">{customerName}</span> đến với <br/> {PROGRAM_NAME}
               </p>

               <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8 text-left">
                 <p className="flex items-center gap-3 text-gray-700 mb-3">
                   <Check className="w-5 h-5 text-green-500" />
                   <span>Đã xác nhận thanh toán</span>
                 </p>
                 <p className="flex items-center gap-3 text-gray-700 mb-3">
                   <Check className="w-5 h-5 text-green-500" />
                   <span>Đã gửi Email vé tham dự & Zoom</span>
                 </p>
                 <p className="flex items-center gap-3 text-gray-700">
                   <Check className="w-5 h-5 text-green-500" />
                   <span>Link Zalo nhóm lớp đã sẵn sàng</span>
                 </p>
               </div>

               <button 
                 onClick={() => window.open(ZALO_GROUP_URL, '_blank')}
                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1"
               >
                 THAM GIA NHÓM LỚP NGAY
               </button>
             </div>
          </div>
        </div>
      </div>
    )
  }

  const transferContent = orderId;
  const qrUrl = `https://img.vietqr.io/image/${BANK_INFO.bankId}-${BANK_INFO.accountNo}-${BANK_INFO.template}.png?amount=${PRICING.finalPrice}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

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
      link.download = `QR_ThanhToan_${orderId}.png`;
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

          <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-50 to-violet-100 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 via-violet-500 to-fuchsia-500"></div>
            
            <h3 className="text-2xl font-black text-gray-800 mb-2">Thanh toán vé tham dự</h3>
            <p className="text-gray-600 mb-6 text-sm">Quét mã để giữ chỗ ngay lập tức</p>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-fuchsia-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
              <div className="relative bg-white p-3 rounded-xl shadow-lg">
                <button 
                  onClick={handleDownloadQR}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white text-gray-400 hover:text-indigo-600 rounded-lg shadow-sm border border-gray-100 transition-all z-20"
                >
                  <Download className="w-4 h-4" />
                </button>

                <img 
                  src={qrUrl} 
                  alt="VietQR Code" 
                  className="w-56 h-56 md:w-64 md:h-64 object-contain"
                />
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-scan pointer-events-none rounded-xl"></div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 items-center">
               <div className="flex items-center gap-2 text-indigo-700 font-medium bg-indigo-100/50 px-4 py-2 rounded-full">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang chờ xác nhận...</span>
               </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 bg-white flex flex-col justify-center">
            <div className="mb-6">
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Đơn hàng</p>
              <h4 className="text-xl font-bold text-gray-800">{PROGRAM_NAME}</h4>
              <p className="text-sm text-gray-500 mt-1">Học viên: <span className="text-gray-900 font-medium">{customerName}</span></p>
            </div>

            <div className="space-y-5">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 font-semibold uppercase">Số tài khoản ({BANK_INFO.bankId})</span>
                  <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">Sao chép</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg md:text-xl font-mono font-bold text-gray-800 tracking-wider">{BANK_INFO.accountNo}</span>
                  <button 
                    onClick={() => handleCopy(BANK_INFO.accountNo, 'acc')}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
                  >
                    {copiedField === 'acc' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1 uppercase font-medium">{BANK_INFO.accountName}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 font-semibold uppercase">Số tiền</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">{formatCurrency(PRICING.finalPrice)}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors relative">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                     <span className="text-xs text-blue-600 font-bold uppercase">Nội dung chuyển khoản</span>
                     <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded border border-red-200 animate-pulse">QUAN TRỌNG</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">{transferContent}</span>
                  <button 
                    onClick={() => handleCopy(transferContent, 'content')}
                    className="p-2 hover:bg-blue-200 rounded-lg transition-colors text-blue-500"
                  >
                    {copiedField === 'content' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={onClose}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                TÔI ĐÃ CHUYỂN KHOẢN
              </button>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes scan {
            0% { top: 0; opacity: 0; }
            20% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-scan {
            animation: scan 2s linear infinite;
          }
          @keyframes scale-up {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scale-up {
            animation: scale-up 0.3s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PaymentModal;