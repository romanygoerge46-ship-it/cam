import React from 'react';
import { AnalysisResult } from '../types';

interface ResultViewProps {
  imageSrc: string;
  result: AnalysisResult;
  onRetake: () => void;
}

const MacroCard: React.FC<{ label: string; value: string; color: string; icon: string }> = ({ label, value, color, icon }) => (
  <div className={`flex flex-col items-center justify-center p-3 rounded-2xl ${color} bg-opacity-10 border border-opacity-20`}>
    <span className="text-xl mb-1">{icon}</span>
    <span className="text-xs text-gray-500 font-medium mb-1">{label}</span>
    <span className="text-sm font-bold text-gray-800">{value}</span>
  </div>
);

const ResultView: React.FC<ResultViewProps> = ({ imageSrc, result, onRetake }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header Image with Overlay */}
      <div className="relative h-72 w-full rounded-b-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10">
        <img src={imageSrc} alt="Captured food" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
        
        {/* Top Actions */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
           <button 
            onClick={onRetake}
            className="bg-white/20 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-all border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Title on Image */}
        <div className="absolute bottom-6 right-6 text-white">
          <div className="bg-emerald-500/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold inline-block mb-2 text-white border border-emerald-400/30">
            تم التحليل بنجاح
          </div>
          <h2 className="text-3xl font-bold drop-shadow-md">{result.foodName}</h2>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="px-5 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 mb-6 border border-gray-100">
          
          {/* Calories Main Display */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 border-dashed">
            <div>
              <p className="text-gray-400 text-xs font-bold tracking-wide uppercase mb-1">السعرات الحرارية</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-gray-800 tracking-tight">{result.calories}</span>
                <span className="text-emerald-500 font-bold text-lg">كالوري</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-3xl border border-orange-100 shadow-sm animate-pulse-slow">
              🔥
            </div>
          </div>

          {/* Macros Grid */}
          <div className="grid grid-cols-3 gap-4">
            <MacroCard 
              label="بروتين" 
              value={result.macros.protein} 
              color="bg-blue-500" 
              icon="🥩"
            />
            <MacroCard 
              label="كاربوهيدرات" 
              value={result.macros.carbs} 
              color="bg-amber-500" 
              icon="🍞"
            />
            <MacroCard 
              label="دهون" 
              value={result.macros.fats} 
              color="bg-rose-500" 
              icon="🥑"
            />
          </div>
        </div>

        {/* Advice Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg">نصيحة الكابتن</h3>
            </div>
            <p className="text-emerald-50 leading-relaxed text-sm font-medium opacity-90">
              {result.advice}
            </p>
          </div>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/80 to-transparent">
        <button
          onClick={onRetake}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-gray-400/20 hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          تصوير وجبة أخرى
        </button>
      </div>
    </div>
  );
};

export default ResultView;