import React, { useState, useRef } from 'react';
import { Upload, FileText, Sparkles, Play, Mic } from 'lucide-react';
import { VoiceOption } from '../App';

interface LandingPageProps {
  onGenerateAudio: (text: string, voice: VoiceOption) => void;
  selectedVoice: VoiceOption;
  onVoiceChange: (voice: VoiceOption) => void;
}

const voiceOptions: { value: VoiceOption; label: string; description: string }[] = [
  { value: 'alloy', label: 'Alloy', description: 'Neutral and balanced' },
  { value: 'echo', label: 'Echo', description: 'Clear and articulate' },
  { value: 'fable', label: 'Fable', description: 'Warm and storytelling' },
  { value: 'onyx', label: 'Onyx', description: 'Deep and authoritative' },
  { value: 'nova', label: 'Nova', description: 'Bright and energetic' },
  { value: 'shimmer', label: 'Shimmer', description: 'Soft and gentle' },
];

const LandingPage: React.FC<LandingPageProps> = ({ 
  onGenerateAudio, 
  selectedVoice, 
  onVoiceChange 
}) => {
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const textFile = files.find(file => file.type === 'text/plain');
    
    if (textFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
      };
      reader.readAsText(textFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleGenerate = () => {
    if (text.trim()) {
      // Validate text length (Groq API typically has limits)
      if (text.length > 4000) {
        alert('Text is too long. Please keep it under 4000 characters.');
        return;
      }
      onGenerateAudio(text, selectedVoice);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 border border-blue-200 mb-8">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-teal-700 bg-clip-text text-transparent mb-6 leading-tight">
                Turn Your Words Into Voice in Seconds
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience the magic of AI-powered text-to-audio conversion. Simply paste your text or upload a file, and watch it transform into high-quality audio instantly.
              </p>

              <div className="flex items-center justify-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm">Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm">No signup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                  <span className="text-sm">Instant generation</span>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 p-8 shadow-2xl">
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                  isDragging
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Upload className="w-8 h-8 text-blue-500" />
                    <FileText className="w-8 h-8 text-teal-500" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Drop your text file or paste content
                  </h3>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  >
                    <Upload className="w-5 h-5" />
                    Choose File
                  </button>
                  
                  <p className="text-gray-500 mt-4 text-sm">
                    Or paste your text in the box below
                  </p>
                </div>
              </div>

              <div className="mt-8">
                {/* Voice Selection */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Mic className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Choose Voice</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {voiceOptions.map((voice) => (
                      <button
                        key={voice.value}
                        onClick={() => onVoiceChange(voice.value)}
                        className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                          selectedVoice === voice.value
                            ? 'border-blue-400 bg-blue-50 shadow-lg shadow-blue-500/25'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <div className="font-medium text-gray-800 mb-1">{voice.label}</div>
                        <div className="text-gray-600 text-sm">{voice.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here... (e.g., 'Hello world, this is my first AI-generated audio!')"
                  className="w-full h-40 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 custom-scroll"
                />
                
                <div className="flex items-center justify-between mt-6">
                  <div className="text-gray-500 text-sm">
                    {text.length} characters
                  </div>
                  
                  <button
                    onClick={handleGenerate}
                    disabled={!text.trim()}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-600 text-white font-semibold hover:from-blue-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 relative"
                  >
                    <Play className="w-5 h-5" />
                    Generate Audio
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-gray-400 text-xs">
                    First generation is free • View a quick ad for additional generations
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Powered</h3>
                <p className="text-gray-600 text-sm">Advanced neural networks for natural-sounding voice generation</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Results</h3>
                <p className="text-gray-600 text-sm">Generate high-quality audio in seconds, not minutes</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Multiple Formats</h3>
                <p className="text-gray-600 text-sm">Support for text input, file upload, and various audio formats</p>
              </div>
            </div>
          </div>
    </div>
  );
};

export default LandingPage;