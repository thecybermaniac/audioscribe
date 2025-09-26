import React from 'react';
import { AlertTriangle, RotateCcw, ArrowLeft, Wifi, Server } from 'lucide-react';

interface ErrorPageProps {
  error: string;
  onRetry: () => void;
  onGenerateAnother: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, onRetry, onGenerateAnother }) => {
  const getErrorIcon = () => {
    if (error.toLowerCase().includes('network') || error.toLowerCase().includes('fetch')) {
      return <Wifi className="w-12 h-12 text-red-400" />;
    }
    if (error.toLowerCase().includes('api') || error.toLowerCase().includes('server')) {
      return <Server className="w-12 h-12 text-red-400" />;
    }
    return <AlertTriangle className="w-12 h-12 text-red-400" />;
  };

  const getErrorTitle = () => {
    if (error.toLowerCase().includes('network') || error.toLowerCase().includes('fetch')) {
      return 'Connection Error';
    }
    if (error.toLowerCase().includes('api key') || error.toLowerCase().includes('unauthorized')) {
      return 'Authentication Error';
    }
    if (error.toLowerCase().includes('quota') || error.toLowerCase().includes('limit')) {
      return 'Service Limit Reached';
    }
    return 'Audio Generation Failed';
  };

  const getErrorDescription = () => {
    if (error.toLowerCase().includes('network') || error.toLowerCase().includes('fetch')) {
      return 'Please check your internet connection and try again.';
    }
    if (error.toLowerCase().includes('api key') || error.toLowerCase().includes('unauthorized')) {
      return 'There seems to be an issue with the API configuration. Please try again later.';
    }
    if (error.toLowerCase().includes('quota') || error.toLowerCase().includes('limit')) {
      return 'The service has reached its usage limit. Please try again later.';
    }
    return 'We encountered an issue while generating your audio. Please try again.';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-400/20 mb-8">
          {getErrorIcon()}
        </div>
        
        {/* Error Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent mb-6">
          {getErrorTitle()}
        </h1>
        
        {/* Error Description */}
        <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
          {getErrorDescription()}
        </p>

        {/* Error Details */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8 max-w-lg mx-auto">
          <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wide">
            Error Details
          </h3>
          <p className="text-red-300 text-sm font-mono bg-red-900/20 rounded-lg p-3 break-words custom-scroll max-h-20 overflow-y-auto">
            {error}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>

          <button
            onClick={onGenerateAnother}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Start Over
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-center">
          <p className="text-white/50 text-sm mb-4">
            Still having trouble? Here are some things to check:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h4 className="text-white/80 font-medium mb-2">Network Issues</h4>
              <p className="text-white/60 text-sm">
                Ensure you have a stable internet connection
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h4 className="text-white/80 font-medium mb-2">Text Length</h4>
              <p className="text-white/60 text-sm">
                Try with shorter text (under 1000 characters)
              </p>
            </div>
          </div>
        </div>

        {/* Floating Error Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full animate-pulse opacity-30"
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

export default ErrorPage;