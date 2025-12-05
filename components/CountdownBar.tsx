import React, { useState, useEffect } from 'react';
import { Clock, Zap, Radio } from 'lucide-react';
import { COUNTDOWN_TARGET } from '../constants';

const CountdownBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Lấy thời gian mục tiêu từ file constants
      const targetDate = new Date(COUNTDOWN_TARGET).getTime();
      const now = new Date().getTime();
      
      // Tính khoảng cách thời gian
      const difference = targetDate - now;
      
      // Nếu hết giờ thì trả về 0
      return difference > 0 ? Math.floor(difference / 1000) : 0;
    };

    // Set giá trị ban đầu ngay lập tức để tránh layout shift
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { d, h, m, s };
  };

  const time = formatTime(timeLeft);

  return (
    // Updated to deep Indigo/Violet/Cyber theme
    <div className="sticky top-0 z-50 bg-[#0f172a] text-white shadow-lg border-b border-indigo-500/20">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"></div>
      
      <div className="max-w-4xl mx-auto px-2 md:px-4 py-2 flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-y-2 gap-x-2">
        
        {/* Sale Badge & Text */}
        <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-[10px] md:text-xs font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter whitespace-nowrap flex items-center gap-1 animate-pulse">
               <Radio className="w-3 h-3" />
               LIVE Event
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-slate-300 whitespace-nowrap">
             <span className="hidden sm:inline">Ưu đãi giữ chỗ kết thúc trong:</span>
             <span className="sm:hidden">Ưu đãi kết thúc:</span>
          </div>
        </div>

        {/* Timer */}
        <div className="flex gap-1.5 md:gap-2 text-center">
          {time.d > 0 && (
            <div className="bg-white/5 rounded px-1.5 md:px-2 py-1 min-w-[35px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
              <span className="block font-bold text-base md:text-lg leading-none font-mono text-cyan-400">{String(time.d).padStart(2, '0')}</span>
              <span className="text-[8px] md:text-[9px] opacity-60 uppercase tracking-wider text-slate-400">Ngày</span>
            </div>
          )}
          <div className="bg-white/5 rounded px-1.5 md:px-2 py-1 min-w-[35px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
            <span className="block font-bold text-base md:text-lg leading-none font-mono text-cyan-400">{String(time.h).padStart(2, '0')}</span>
            <span className="text-[8px] md:text-[9px] opacity-60 uppercase tracking-wider text-slate-400">Giờ</span>
          </div>
          <div className="bg-white/5 rounded px-1.5 md:px-2 py-1 min-w-[35px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
            <span className="block font-bold text-base md:text-lg leading-none font-mono text-cyan-400">{String(time.m).padStart(2, '0')}</span>
            <span className="text-[8px] md:text-[9px] opacity-60 uppercase tracking-wider text-slate-400">Phút</span>
          </div>
          <div className="bg-white/5 rounded px-1.5 md:px-2 py-1 min-w-[35px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
            <span className="block font-bold text-base md:text-lg leading-none font-mono text-cyan-400">{String(time.s).padStart(2, '0')}</span>
            <span className="text-[8px] md:text-[9px] opacity-60 uppercase tracking-wider text-slate-400">Giây</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownBar;