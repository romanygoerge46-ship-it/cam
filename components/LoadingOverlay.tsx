import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">
          🥗
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2">جاري التحليل...</h2>
      <p className="text-gray-300 text-sm animate-pulse">الذكاء الاصطناعي يفحص مكونات الطبق</p>
    </div>
  );
};

export default LoadingOverlay;
