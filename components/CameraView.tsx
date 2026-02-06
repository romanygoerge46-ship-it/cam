import React, { useRef, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface CameraViewProps {
  user: UserProfile;
  onCapture: (imageSrc: string) => void;
  onResetUser: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ user, onCapture, onResetUser }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch (err) {
      console.error("Camera Error:", err);
      setError("تعذر الوصول للكاميرا. يرجى التأكد من السماح بالصلاحيات.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/jpeg', 0.8);
        stopCamera(); // Stop stream when photo is taken to save battery
        onCapture(imageSrc);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          stopCamera();
          onCapture(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <div className="text-white">
          <p className="text-xs opacity-80">أهلاً بك</p>
          <p className="font-bold text-lg">{user.name}</p>
        </div>
        <button 
          onClick={onResetUser}
          className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full hover:bg-white/30 transition"
        >
          تغيير البيانات
        </button>
      </div>

      {/* Camera Viewport */}
      <div className="flex-1 relative flex items-center justify-center">
        {error ? (
          <div className="text-white text-center p-6">
            <p className="text-red-400 mb-4 text-4xl">📷🚫</p>
            <p>{error}</p>
            <button onClick={startCamera} className="mt-4 px-4 py-2 bg-emerald-600 rounded-lg">حاول مرة أخرى</button>
            <div className="mt-8 text-sm opacity-80">
              <p className="mb-2">أو</p>
              <button onClick={triggerFileUpload} className="underline">رفع صورة من الجهاز</button>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 bg-gradient-to-t from-black/80 to-transparent flex justify-center items-center gap-10">
        {/* Gallery Button */}
        <button
           onClick={triggerFileUpload}
           className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-95"
           aria-label="رفع صورة"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </button>

        {/* Shutter Button */}
        <button
          onClick={takePhoto}
          className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-white/20 backdrop-blur-sm active:scale-90 transition-transform shadow-lg"
          aria-label="التقاط صورة"
        >
          <div className="w-16 h-16 bg-white rounded-full"></div>
        </button>
        
        {/* Spacer to keep shutter centered visually relative to the gap */}
        <div className="w-14 h-14 opacity-0 pointer-events-none"></div>
      </div>
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileUpload} 
      />
    </div>
  );
};

export default CameraView;