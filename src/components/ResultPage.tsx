import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Download, RotateCcw, Volume2 } from 'lucide-react';

interface ResultPageProps {
  audioUrl: string | null;
  inputText: string;
  onGenerateAnother: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ audioUrl, inputText, onGenerateAnother }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEnded, setIsEnded] = useState(false);

  // Reset ended state when audio URL changes
  useEffect(() => {
    setIsEnded(false);
    setCurrentTime(0);
  }, [audioUrl]);

  // Force currentTime to match duration when audio ends
  useEffect(() => {
    if (isEnded && duration > 0) {
      setCurrentTime(duration);
    }
  }, [isEnded, duration]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (isEnded) {
          audioRef.current.currentTime = 0;
          setIsEnded(false);
        }
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !isEnded) {
      const newTime = audioRef.current.currentTime;
      setCurrentTime(newTime);
      
      // Check if we're at the end (use a small threshold for very short audio)
      const timeThreshold = Math.min(0.1, duration * 0.1); // Use 10% of duration or 0.1s, whichever is smaller
      if (duration > 0 && (duration - newTime) <= timeThreshold) {
        setCurrentTime(duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const audioDuration = audioRef.current.duration;
      setDuration(audioDuration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      // Reset ended state if seeking before the end
      if (isEnded && newTime < duration) {
        setIsEnded(false);
        setIsPlaying(false);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    // Force currentTime to exactly match duration
    if (audioRef.current && duration > 0) {
      setCurrentTime(duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate display time to ensure slider reaches end
  const getDisplayTime = () => {
    if (isEnded) {
      return duration;
    }
    // For very short audio, ensure we don't have floating point precision issues
    if (duration > 0 && Math.abs(duration - currentTime) < 0.001) {
      return duration;
    }
    return currentTime;
  };

  const handleDownload = () => {
    // 30% chance to redirect to ad, 70% chance to download
    const shouldRedirectToAd = Math.random() < 0.3;
    
    if (shouldRedirectToAd) {
      // Redirect to ad website
      window.open('https://example.com/download-ad', '_blank');
    } else {
      // Proceed with normal download
      if (audioUrl) {
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = `generated-audio-${Date.now()}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-5 pb-5">
      <div className="max-w-2xl w-full">
        {/* Success Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 mb-6">
            <Volume2 className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-green-700 to-emerald-700 bg-clip-text text-transparent mb-4">
            Your Audio is Ready!
          </h1>
          
          <p className="text-gray-600 text-lg">
            High-quality audio generated from your text using advanced AI
          </p>
        </div>

        {/* Audio Player */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 p-8 shadow-2xl mb-8">
          {audioUrl && (
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
            />
          )}

          {/* Waveform Visualization */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 mb-6 border border-blue-100">
            <div className="flex items-center justify-center gap-1 h-20">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gradient-to-t rounded-full transition-all duration-200 ${
                    isPlaying ? 'from-blue-400 to-teal-400' : 'from-blue-600 to-teal-600'
                  }`}
                  style={{
                    height: `${10 + Math.random() * 50}px`,
                    opacity: getDisplayTime() / duration > i / 40 ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlayPause}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white hover:from-blue-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>

              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={getDisplayTime()}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                  step="0.001" // Very small step for short audio files
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{formatTime(getDisplayTime())}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Original Text Preview */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Original Text</h3>
          <p className="text-gray-600 text-sm leading-relaxed max-h-24 overflow-y-auto custom-scroll">
            {inputText}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Download Audio
          </button>

          <button
            onClick={onGenerateAnother}
            className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            Generate Another
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #3b82f6, #14b8a6);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #3b82f6, #14b8a6);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ResultPage;