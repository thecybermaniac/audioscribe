import React, { useRef, useState } from 'react';
import { Play, Pause, Download, RotateCcw, Share2, Volume2 } from 'lucide-react';

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

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `generated-audio-${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Success Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/20 mb-6">
            <Volume2 className="w-8 h-8 text-green-300" />
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent mb-4">
            Your Audio is Ready!
          </h1>
          
          <p className="text-white/70 text-lg">
            High-quality audio generated from your text using advanced AI
          </p>
        </div>

        {/* Audio Player */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl mb-8">
          {audioUrl && (
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
          )}

          {/* Waveform Visualization */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-1 h-20">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gradient-to-t rounded-full transition-all duration-200 ${
                    isPlaying ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'
                  }`}
                  style={{
                    height: `${10 + Math.random() * 50}px`,
                    opacity: currentTime / duration > i / 40 ? 1 : 0.3,
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
                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
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
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-white/60 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Original Text Preview */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Original Text</h3>
          <p className="text-white/70 text-sm leading-relaxed max-h-24 overflow-y-auto custom-scroll">
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

        {/* Share Options */}
        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200">
            <Share2 className="w-4 h-4" />
            Share your audio
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ResultPage;