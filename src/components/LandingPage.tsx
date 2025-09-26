import React, { useState, useRef } from 'react';
import { Upload, FileText, Sparkles, Play } from 'lucide-react';

interface LandingPageProps {
  onGenerateAudio: (text: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGenerateAudio }) => {
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
      onGenerateAudio(text);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* AdSense Banner Placeholder */}
      <div className="w-full h-16 bg-gradient-to-r from-purple-800/20 to-blue-800/20 backdrop-blur-sm border-b border-white/10 flex items-center justify-center">
        <div className="text-white/60 text-sm font-medium">
          Google AdSense Banner Space (728x90)
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar AdSense Placeholder */}
        <div className="hidden lg:block w-40 bg-gradient-to-b from-purple-800/20 to-blue-800/20 backdrop-blur-sm border-r border-white/10">
          <div className="h-full flex items-center justify-center">
            <div className="text-white/60 text-xs text-center transform -rotate-90 whitespace-nowrap">
              AdSense Sidebar (160x600)
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 mb-8">
                <Sparkles className="w-8 h-8 text-purple-300" />
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 leading-tight">
                Turn Your Words Into Voice in Seconds
              </h1>
              
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience the magic of AI-powered text-to-audio conversion. Simply paste your text or upload a file, and watch it transform into high-quality audio instantly.
              </p>

              <div className="flex items-center justify-center gap-6 text-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm">Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm">No signup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-sm">Instant generation</span>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                  isDragging
                    ? 'border-purple-400 bg-purple-500/10'
                    : 'border-white/20 hover:border-white/40'
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
                    <Upload className="w-8 h-8 text-purple-300" />
                    <FileText className="w-8 h-8 text-blue-300" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Drop your text file or paste content
                  </h3>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                  >
                    <Upload className="w-5 h-5" />
                    Choose File
                  </button>
                  
                  <p className="text-white/60 mt-4 text-sm">
                    Or paste your text in the box below
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here... (e.g., 'Hello world, this is my first AI-generated audio!')"
                  className="w-full h-40 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                />
                
                <div className="flex items-center justify-between mt-6">
                  <div className="text-white/60 text-sm">
                    {text.length} characters
                  </div>
                  
                  <button
                    onClick={handleGenerate}
                    disabled={!text.trim()}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
                  >
                    <Play className="w-5 h-5" />
                    Generate Audio
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">AI Powered</h3>
                <p className="text-white/60 text-sm">Advanced neural networks for natural-sounding voice generation</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Instant Results</h3>
                <p className="text-white/60 text-sm">Generate high-quality audio in seconds, not minutes</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Multiple Formats</h3>
                <p className="text-white/60 text-sm">Support for text input, file upload, and various audio formats</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;