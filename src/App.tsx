import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import ResultPage from './components/ResultPage';
import ErrorPage from './components/ErrorPage';

type AppState = 'landing' | 'loading' | 'result' | 'error';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [inputText, setInputText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const handleGenerateAudio = async (text: string) => {
    setInputText(text);
    setCurrentState('loading');
    setError('');
    
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
          voice: 'alloy',
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

  const handleGenerateAnother = () => {
    setCurrentState('landing');
    setInputText('');
    setAudioUrl(null);
    setError('');
  };

  const handleRetry = () => {
    if (inputText) {
      handleGenerateAudio(inputText);
    } else {
      setCurrentState('landing');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {currentState === 'landing' && (
        <LandingPage onGenerateAudio={handleGenerateAudio} />
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
    </div>
  );
}

export default App;