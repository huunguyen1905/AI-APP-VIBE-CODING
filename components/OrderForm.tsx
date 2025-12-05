import React, { useState } from 'react';
import { PRICING, PROGRAM_NAME, GOOGLE_SHEET_WEBAPP_URL } from '../constants';
import { Lock, Check, User, Phone, Mail, Loader2, Zap, ArrowRight, Calendar } from 'lucide-react';

interface OrderFormProps {
  onSuccess: (orderId: string, customerName: string) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateOrderId = () => {
    const storageKey = 'ai_vibe_last_seq';
    let currentSeq;
    const storedSeq = localStorage.getItem(storageKey);
    if (storedSeq) {
      currentSeq = parseInt(storedSeq, 10);
    } else {
      currentSeq = Math.floor(Math.random() * (8999 - 1000 + 1) + 1000);
    }
    const nextSeq = currentSeq + 1;
    localStorage.setItem(storageKey, nextSeq.toString());
    return `AI${nextSeq}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newOrderId = generateOrderId();
    
    // Sử dụng FormData để gửi dữ liệu ổn định hơn (tránh lỗi CORS và preflight)
    const formPayload = new FormData();
    formPayload.append('orderId', newOrderId);
    formPayload.append('name', formData.name);
    formPayload.append('phone', formData.phone);
    formPayload.append('email', formData.email);
    formPayload.append('amount', PRICING.finalPrice.toString());
    formPayload.append('status', 'PENDING');
    formPayload.append('timestamp', new Date().toISOString());

    try {
      if (GOOGLE_SHEET_WEBAPP_URL) {
          await fetch(GOOGLE_SHEET_WEBAPP_URL, {
            method: 'POST',
            body: formPayload,
            mode: 'no-cors' // Quan trọng: no-cors cho phép gửi form cross-origin mà không bị chặn
          });
      }
      // Vì mode no-cors không trả về response json đọc được, ta giả định thành công nếu không có lỗi mạng
      onSuccess(newOrderId, formData.name || "Học viên");
    } catch (error) {
      console.error("Lỗi khi gửi đơn:", error);
      // Vẫn cho user đi tiếp để họ thấy thông tin chuyển khoản (fail-safe)
      onSuccess(newOrderId, formData.name || "Học viên");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-violet-200/50 border border-violet-100 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Form Header */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 border-b border-indigo-50 text-center relative overflow-hidden">
        <div className="flex justify-center items-center gap-4 text-sm font-medium text-gray-500 relative z-10">
          <span className="flex items-center gap-1 text-violet-700 bg-violet-100 px-3 py-1 rounded-full"><Check className="w-3.5 h-3.5" /> Giữ chỗ Live</span>
          <div className="w-8 h-px bg-gray-300"></div>
          <span className="flex items-center gap-1 text-gray-600">Vào nhóm Zalo</span>
        </div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-100 rounded-full blur-2xl opacity-60"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-100 rounded-full blur-2xl opacity-60"></div>
      </div>

      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Inputs */}
          <div className="space-y-4">
            <div className="relative group">
              <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Họ tên *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-violet-600 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên của bạn..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none font-medium"
                />
              </div>
            </div>
            
            <div className="relative group">
              <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Số điện thoại *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-violet-600 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0912..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none font-medium"
                />
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Email nhận Zoom *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-violet-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-gradient-to-r from-gray-50 to-violet-50/50 rounded-xl p-5 space-y-3 text-sm border border-violet-100">
            <div className="flex justify-between text-gray-500">
              <span className="font-medium">Vé tham dự Live</span>
              <span className="line-through decoration-gray-400">{formatCurrency(PRICING.originalPrice)}</span>
            </div>
            <div className="flex justify-between items-center text-violet-600 font-medium">
              <span>Hỗ trợ cộng đồng</span>
              <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-xs border border-violet-200 font-bold">-{formatCurrency(PRICING.discountAmount)}</span>
            </div>
            <div className="border-t border-gray-200 dashed pt-3 flex justify-between items-center font-bold text-lg text-gray-900">
              <span>Thanh toán</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 text-3xl">{formatCurrency(PRICING.finalPrice)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border rounded-xl p-4 border-violet-200 bg-violet-50/30 relative overflow-hidden">
            <label className="flex items-start gap-3 cursor-pointer relative z-10">
              <div className="mt-1">
                 <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-violet-600 focus:ring-violet-500 border-gray-300" />
              </div>
              <div>
                <span className="block font-bold text-gray-800">Chuyển khoản ngân hàng</span>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Link Zoom và Tài liệu sẽ được gửi tự động qua Email/Zalo ngay sau khi đăng ký.
                </p>
              </div>
            </label>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-gray-400 disabled:to-gray-400 text-white font-extrabold text-lg py-4 rounded-xl shadow-lg shadow-violet-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
          >
            <div className="absolute top-0 left-0 -ml-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-shimmer"></div>
            
            <div className="relative flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>ĐANG XỬ LÝ...</span>
                </>
              ) : (
                <>
                  <span>ĐĂNG KÝ HỌC NGAY</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>

          <p className="text-center text-[10px] text-gray-400 mt-4 leading-tight flex items-center justify-center gap-1">
             <Lock className="w-3 h-3" />
             Cam kết: Hoàn tiền 100% nếu nội dung không đúng mô tả.
          </p>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;