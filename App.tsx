import React, { useState, useEffect } from 'react';
import { UserProfile, AnalysisResult, AppView } from './types';
import Onboarding from './components/Onboarding';
import CameraView from './components/CameraView';
import ResultView from './components/ResultView';
import LoadingOverlay from './components/LoadingOverlay';
import { analyzeFoodImage } from './services/geminiService';

const STORAGE_KEY = 'calorie_tracker_user_profile';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.ONBOARDING);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load user profile on startup
  useEffect(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEY);
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setUserProfile(parsed);
        setView(AppView.CAMERA);
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUserProfile(profile);
    setView(AppView.CAMERA);
  };

  const handleResetUser = () => {
    if (window.confirm("هل أنت متأكد من رغبتك في حذف بياناتك وإدخالها من جديد؟")) {
      localStorage.removeItem(STORAGE_KEY);
      setUserProfile(null);
      setView(AppView.ONBOARDING);
    }
  };

  const handleCapture = async (imageSrc: string) => {
    if (!userProfile) return;

    setCapturedImage(imageSrc);
    setIsLoading(true);

    try {
      const result = await analyzeFoodImage(imageSrc, userProfile);
      setAnalysisResult(result);
      setView(AppView.ANALYSIS);
    } catch (error) {
      alert("عذراً، حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. يرجى المحاولة مرة أخرى.");
      setView(AppView.CAMERA); // Go back to camera on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setView(AppView.CAMERA);
  };

  // Render Logic
  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (view === AppView.ONBOARDING) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (view === AppView.CAMERA && userProfile) {
    return (
      <CameraView 
        user={userProfile} 
        onCapture={handleCapture} 
        onResetUser={handleResetUser} 
      />
    );
  }

  if (view === AppView.ANALYSIS && userProfile && capturedImage && analysisResult) {
    return (
      <ResultView 
        imageSrc={capturedImage} 
        result={analysisResult} 
        onRetake={handleRetake} 
      />
    );
  }

  return null;
};

export default App;
