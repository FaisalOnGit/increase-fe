import React, { useEffect } from "react";
import miniLogo from "/logo.png";

interface SplashScreenProps {
  onLoadingComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 1000); // 1 second

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="relative">
            <img
              src={miniLogo}
              alt="Logo"
              className="w-20 h-auto mx-auto mb-4 animate-spin"
            />
            <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-2xl animate-ping"></div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Obsesiman Laundry
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
