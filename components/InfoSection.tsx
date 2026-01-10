
import React, { useState } from 'react';
import { Target, Check, Sparkles, UserCheck } from 'lucide-react';
import { TARGET_AUDIENCE, SPEAKER_INFO } from '../constants';

const InfoSection: React.FC = () => {
  const [imgSrc, setImgSrc] = useState(SPEAKER_INFO.imageUrl);
  const [imgError, setImgError] = useState(false);

  const handleImgError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop");
    }
  };

  return (
    <div className="space-y-12">
      {/* Target Audience */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity group-hover:opacity-70"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20 mb-4 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <Target className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">Dành cho ai?</h3>
        </div>
        <ul className="grid gap-4 relative z-10">
          {TARGET_AUDIENCE.map((item, idx) => (
            <li key={idx} className="flex gap-4 items-start bg-white/50 p-3 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-blue-100">
              <div className="min-w-[24px] h-6 flex items-center justify-center bg-blue-100 rounded-full mt-0.5">
                <Check className="w-3.5 h-3.5 text-blue-600 font-bold" />
              </div>
              <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Speaker Bio */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-3xl transform scale-95 rounded-3xl"></div>
        
        <div className="text-center md:text-left bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          
          <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
            <UserCheck className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-black text-gray-800">Người chia sẻ</h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start">
            <div className="flex-shrink-0 relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-400 via-indigo-500 to-blue-700 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
              
              <div className="relative w-56 h-56 rounded-[1.8rem] overflow-hidden border-2 border-white shadow-2xl bg-gray-100">
                <img 
                  src={imgSrc} 
                  alt={SPEAKER_INFO.name} 
                  onError={handleImgError}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:hidden">
                  <p className="text-white font-bold text-sm">{SPEAKER_INFO.name}</p>
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-white p-1.5 rounded-full shadow-lg">
                <div className="bg-blue-500 text-white p-1 rounded-full">
                  <Check className="w-3" />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-5">
              <div className="text-center md:text-left">
                <h4 className="font-black text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 mb-2">
                  {SPEAKER_INFO.name}
                </h4>
                <p className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold border border-blue-100">
                  {SPEAKER_INFO.role}
                </p>
              </div>

              <div className="space-y-3">
                 {SPEAKER_INFO.achievements.map((ach, idx) => (
                   <div key={idx} className="flex gap-3 items-start text-left group/item">
                      <div className="mt-1 transform transition-transform group-hover/item:scale-125 group-hover/item:rotate-12">
                        <Sparkles className="w-4 h-4 text-cyan-500 fill-cyan-500" />
                      </div>
                      <span className="text-gray-600 text-sm md:text-base group-hover/item:text-gray-900 transition-colors">
                        {ach}
                      </span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
