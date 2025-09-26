import React, { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (Math.random() * 15 + 5); // Random increment between 5-20
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Animated Audio Wave */}
        <div className="relative mb-12">
          <div className="flex items-end justify-center gap-1 h-24">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-3 bg-gradient-to-t from-purple-500 to-pink-400 rounded-full animate-pulse"
                style={{
                  height: `${20 + Math.sin((Date.now() / 200) + i) * 20 + 20}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.8 + i * 0.1}s`
                }}
              />
            ))}
          </div>
          
          {/* Pulsing Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-75"></div>
              <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-bold text-white mb-6">
          Your audio is being generated...
        </h2>
        
        <p className="text-white/60 text-lg mb-8">
          Our AI is crafting your perfect audio experience
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-3 mb-6 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>

        <div className="text-white/50 text-sm">
          {Math.round(Math.min(progress, 100))}% complete
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;