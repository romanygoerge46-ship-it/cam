import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-xl z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative mb-8">
        {/* Outer Ring */}
        <div className="w-24 h-24 border-4 border-emerald-100 rounded-full"></div>
        {/* Spinning Ring */}
        <div className="absolute inset-0 w-24 h-24 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
        {/* Inner Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">
          🤖
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-2">جاري تحليل الطبق...</h2>
      <p className="text-gray-400 text-sm font-medium">الذكاء الاصطناعي يحسب السعرات الآن</p>
    </div>
  );
};

export default LoadingOverlay;