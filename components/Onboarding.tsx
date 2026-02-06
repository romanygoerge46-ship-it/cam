import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    weight: 0,
    height: 0,
    age: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.weight > 0 && formData.height > 0 && formData.age > 0) {
      onComplete(formData);
    } else {
      alert('الرجاء تعبئة جميع البيانات بشكل صحيح');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-white p-6 animate-fade-in font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-emerald-100/50 border border-emerald-50">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 text-emerald-600">
            🥗
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">إعداد الملف الشخصي</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            ساعدنا في التعرف عليك لنقدم لك حسابات سعرات دقيقة ونصائح مخصصة لجسمك.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2">الاسم</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="اسمك الكريم"
                className="w-full p-4 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all placeholder-gray-300 font-medium"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الوزن (كجم)</label>
              <div className="relative">
                <input
                  type="number"
                  name="weight"
                  placeholder="75"
                  className="w-full p-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all placeholder-gray-300 font-medium"
                  value={formData.weight || ''}
                  onChange={handleChange}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">⚖️</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الطول (سم)</label>
              <div className="relative">
                <input
                  type="number"
                  name="height"
                  placeholder="175"
                  className="w-full p-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all placeholder-gray-300 font-medium"
                  value={formData.height || ''}
                  onChange={handleChange}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">📏</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">العمر (سنة)</label>
            <div className="relative">
              <input
                type="number"
                name="age"
                placeholder="25"
                className="w-full p-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all placeholder-gray-300 font-medium"
                value={formData.age || ''}
                onChange={handleChange}
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🎂</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-emerald-300 active:scale-[0.98] transition-all duration-200 mt-4 text-lg"
          >
            ابدأ رحلتك
          </button>
        </form>
        
        <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-xs bg-gray-50 py-2 rounded-lg">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>بياناتك محفوظة محلياً على جهازك</span>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;