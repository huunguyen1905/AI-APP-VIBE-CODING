
import React, { useState } from 'react';
import FeatureList from './components/FeatureList';
import OrderForm from './components/OrderForm';
import InfoSection from './components/InfoSection';
import BackgroundEffect from './components/BackgroundEffect';
import PaymentModal from './components/PaymentModal';
import { ShieldCheck, Terminal, Radio, CalendarClock } from 'lucide-react';
import { PROGRAM_NAME } from './constants';
import CountdownBar from './components/CountdownBar';

const App: React.FC = () => {
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    orderId: '',
    name: ''
  });

  const handleOrderSuccess = (orderId: string, name: string) => {
    setPaymentModal({
      isOpen: true,
      orderId,
      name
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative selection:bg-blue-100 selection:text-blue-900 font-sans">
      <CountdownBar />
      
      {/* Dynamic Background */}
      <BackgroundEffect />
      
      {/* Content wrapper with z-index to sit above background */}
      <div className="relative z-10">
        
        {/* Brand Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 sticky top-[50px] z-40 transition-all">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <div className="font-extrabold text-2xl tracking-tighter text-gray-900 flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                 <Terminal className="w-6 h-6" />
              </div>
              <div className="flex flex-col leading-none">
                 <span>HUNG<span className="text-gray-400 group-hover:text-blue-600 transition-colors">NPV</span></span>
                 <span className="text-[10px] text-gray-400 font-mono tracking-widest">AI.VIBE.CODE</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Bảo mật SSL</span>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Sales Copy */}
            <div className="lg:col-span-7 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="mb-10">
                 {/* Decorative Tag */}
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 font-mono shadow-sm">
                    <Radio className="w-3 h-3 animate-pulse text-cyan-500" />
                    <span className="text-blue-600 font-black">LIVE</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>Workshop Online</span>
                 </div>

                 {/* Static Headline */}
                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
                   {PROGRAM_NAME}
                   <span className="animate-pulse text-cyan-500">_</span>
                 </h1>
                 
                 <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border-l-4 border-blue-500 shadow-sm mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed font-medium">
                       Làm chủ công nghệ - Tự tay xây dựng Ứng dụng AI & Automation chỉ trong 3 giờ.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-600">
                       <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg text-blue-700 border border-blue-100/50">
                          <CalendarClock className="w-4 h-4" />
                          <span>19h30 - 22h30, Tối 27/01/2026</span>
                       </div>
                       <div className="flex items-center gap-2 bg-cyan-50 px-3 py-1.5 rounded-lg text-cyan-700">
                          <Terminal className="w-4 h-4" />
                          <span>Hình thức: Online qua Zoom</span>
                       </div>
                    </div>
                 </div>
                 
                 <p className="text-base text-gray-500 max-w-2xl leading-relaxed mb-8">
                    Chương trình đào tạo thực chiến mới nhất. Đăng ký ngay để nhận <span className="font-semibold text-gray-900">Tài khoản Google AI Pro</span> + <span className="font-semibold text-gray-900">Full Source Code</span> sau buổi học.
                 </p>
              </div>

              {/* Feature List */}
              <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-1 md:p-6 border border-white shadow-xl shadow-blue-100/30 mb-8">
                 <FeatureList />
              </div>
              
              <div className="hidden lg:block mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <InfoSection />
              </div>
            </div>

            {/* Right Column: Order Form */}
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-28">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <OrderForm onSuccess={handleOrderSuccess} />
                  
                  {/* Social Proof */}
                  <div className="mt-6 flex flex-col items-center justify-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                     <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 overflow-hidden shadow-sm">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*132}`} alt="user" />
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700 shadow-sm">
                          +1k
                        </div>
                     </div>
                     <span className="text-xs text-gray-400 font-medium font-mono">1,000+ members joined</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile only Info Section */}
            <div className="lg:hidden col-span-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
               <InfoSection />
            </div>

          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 py-12 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
             <div className="font-bold text-xl text-gray-200 mb-4 font-mono uppercase tracking-widest">HUNGNPV.DEV</div>
            <p className="text-sm text-gray-500">&copy; 2026 HUNGNPV. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4 text-sm text-gray-400">
               <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>

      <PaymentModal 
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal(prev => ({ ...prev, isOpen: false }))}
        orderId={paymentModal.orderId}
        customerName={paymentModal.name}
      />
    </div>
  );
};

export default App;
