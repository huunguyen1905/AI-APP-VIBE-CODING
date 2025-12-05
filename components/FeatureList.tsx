import React from 'react';
import { Terminal, Gift, Cpu, Database, Code2, Globe, MessageSquare, Zap } from 'lucide-react';
import { FEATURES } from '../constants';

const FeatureList: React.FC = () => {
  // Mapping icons to modules for a richer visual experience
  const getIcon = (index: number) => {
    const icons = [
        <Cpu className="w-5 h-5" />, // Module 1: AI Pro
        <Terminal className="w-5 h-5" />, // Module 2: Prompt
        <Code2 className="w-5 h-5" />, // Module 3: Vibe Coding
        <MessageSquare className="w-5 h-5" />, // Module 4: Chatbot
        <Globe className="w-5 h-5" />, // Module 5: Landing Page
        <Zap className="w-5 h-5" />, // Module 6: Automation
        <Database className="w-5 h-5" />, // Module 7: App Thực tế
        <Globe className="w-5 h-5" />  // Module 8: Live
    ];
    return icons[index] || <Terminal className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="text-xs text-gray-400 font-mono ml-2">ai_config.json</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FEATURES.map((item, index) => (
          <div 
            key={index} 
            className="group relative bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 p-4 hover:bg-white hover:shadow-lg hover:shadow-violet-500/10 hover:border-violet-200 transition-all duration-300"
          >
            {/* Tech Decoration: Corner brackets */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-violet-300">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9V1H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity text-violet-300">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1V9H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 w-10 h-10 rounded-lg bg-indigo-50 group-hover:bg-violet-100 flex items-center justify-center text-indigo-500 group-hover:text-violet-600 transition-colors">
                 {getIcon(index)}
              </div>
              
              <div className="flex-1">
                {/* Monospace "Code" Title */}
                <div className="font-mono text-xs text-indigo-500 mb-1 opacity-80 group-hover:opacity-100">
                   {`// module_0${index + 1}`}
                </div>
                
                <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight mb-2 group-hover:text-violet-700 transition-colors">
                  {item.text.replace(/Module \d+: /, '')}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {item.highlight}
                </p>

                {item.value && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gray-50 border border-gray-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/50 transition-colors">
                        <Gift className="w-3 h-3 text-violet-500" />
                        <span className="text-[10px] uppercase text-gray-400 font-bold">Valued at:</span>
                        <span className="text-xs font-bold text-violet-500 font-mono">{item.value}</span>
                    </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 mt-4 border-t border-dashed border-gray-200 text-center font-mono text-sm">
          <span className="text-gray-400">total_value = </span> 
          <span className="text-violet-600 font-bold text-lg">13.200.000đ</span>
          <span className="text-gray-400">;</span>
      </div>
    </div>
  );
};

export default FeatureList;