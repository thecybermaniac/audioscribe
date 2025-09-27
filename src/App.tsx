import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import ResultPage from './components/ResultPage';
import ErrorPage from './components/ErrorPage';
import AdModal from './components/AdModal';

type AppState = 'landing' | 'loading' | 'result' | 'error';

export type VoiceOption = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [inputText, setInputText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [generationCount, setGenerationCount] = useState(0);
  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingText, setPendingText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>('alloy');

  const handleGenerateAudio = async (text: string, voice: VoiceOption) => {
    // Check if this is the second+ generation and show ad
    if (generationCount >= 1) {
      setPendingText(text);
      setSelectedVoice(voice);
      setShowAdModal(true);
      return;
    }
    
    // First generation - proceed directly
    await generateAudio(text, voice);
  };

  const generateAudio = async (text: string, voice: VoiceOption) => {
    setInputText(text);
    setCurrentState('loading');
    setError('');
    setGenerationCount(prev => prev + 1);
    
    try {
      // Call Groq Cloud API for text-to-audio generation
      const response = await fetch('https://api.groq.com/openai/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: text,
          voice: voice,
          response_format: 'mp3'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
      }

      // Convert response to blob and create URL
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      setAudioUrl(audioUrl);
      setCurrentState('result');
    } catch (err) {
      console.error('Audio generation failed:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setCurrentState('error');
    }
  };

  const handleAdComplete = () => {
    setShowAdModal(false);
    if (pendingText) {
      generateAudio(pendingText, selectedVoice);
      setPendingText('');
    }
  };

  const handleAdClose = () => {
    setShowAdModal(false);
    setPendingText('');
  };

  const handleGenerateAnother = () => {
    setCurrentState('landing');
    setInputText('');
    setAudioUrl(null);
    setError('');
  };

  const handleRetry = () => {
    if (inputText) {
      handleGenerateAudio(inputText, selectedVoice);
    } else {
      setCurrentState('landing');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {currentState === 'landing' && (
        <LandingPage 
          onGenerateAudio={handleGenerateAudio}
          selectedVoice={selectedVoice}
          onVoiceChange={setSelectedVoice}
        />
      )}
      {currentState === 'loading' && (
        <LoadingScreen />
      )}
      {currentState === 'result' && (
        <ResultPage 
          audioUrl={audioUrl} 
          inputText={inputText}
          onGenerateAnother={handleGenerateAnother} 
        />
      )}
      {currentState === 'error' && (
        <ErrorPage 
          error={error}
          onRetry={handleRetry}
          onGenerateAnother={handleGenerateAnother}
        />
      )}
      
      <AdModal 
        isOpen={showAdModal}
        onClose={handleAdClose}
        onAdComplete={handleAdComplete}
      />
    </div>
  );
}

export default App;