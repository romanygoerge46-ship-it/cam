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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-emerald-600 mb-2">مرحباً بك!</h1>
          <p className="text-gray-500">للبدء، نحتاج لبعض المعلومات لحساب احتياجاتك بدقة.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
            <input
              type="text"
              name="name"
              placeholder="مثال: أحمد"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الوزن (كجم)</label>
              <input
                type="number"
                name="weight"
                placeholder="75"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                value={formData.weight || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الطول (سم)</label>
              <input
                type="number"
                name="height"
                placeholder="175"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                value={formData.height || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">العمر (سنة)</label>
            <input
              type="number"
              name="age"
              placeholder="25"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              value={formData.age || ''}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-6 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-700 active:scale-95 transition-all"
          >
            حفظ واستمرار
          </button>
        </form>
        <p className="text-xs text-center text-gray-400 mt-6">
          يتم حفظ هذه البيانات على جهازك فقط لعدم سؤالك مرة أخرى.
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
