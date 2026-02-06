import React from 'react';
import { AnalysisResult } from '../types';

interface ResultViewProps {
  imageSrc: string;
  result: AnalysisResult;
  onRetake: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ imageSrc, result, onRetake }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Image Header */}
      <div className="relative h-64 w-full">
        <img src={imageSrc} alt="Captured food" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
        <div className="absolute bottom-4 right-4 text-white">
          <h2 className="text-3xl font-bold">{result.foodName}</h2>
        </div>
        <button 
          onClick={onRetake}
          className="absolute top-4 left-4 bg-black/40 backdrop-blur text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-black/60 transition"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-500 text-sm">السعرات المقدرة</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-emerald-600">{result.calories}</span>
                <span className="text-gray-400 font-medium">كالوري</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
              🔥
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-6">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">بروتين</p>
              <p className="font-bold text-gray-800">{result.macros.protein}</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-xs text-gray-400 mb-1">كارب</p>
              <p className="font-bold text-gray-800">{result.macros.carbs}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">دهون</p>
              <p className="font-bold text-gray-800">{result.macros.fats}</p>
            </div>
          </div>
        </div>

        {/* Advice Card */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-24">
          <div className="flex gap-3 mb-2">
            <span className="text-2xl">💡</span>
            <h3 className="font-bold text-emerald-800 mt-1">نصيحة غذائية</h3>
          </div>
          <p className="text-emerald-700 leading-relaxed text-sm">
            {result.advice}
          </p>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-6">
        <button
          onClick={onRetake}
          className="w-full max-w-md bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all"
        >
          تصوير وجبة أخرى
        </button>
      </div>
    </div>
  );
};

export default ResultView;
