import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import ResultPage from './components/ResultPage';

type AppState = 'landing' | 'loading' | 'result';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [inputText, setInputText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerateAudio = async (text: string) => {
    setInputText(text);
    setCurrentState('loading');
    
    // Simulate API call to Groq Cloud AI
    setTimeout(() => {
      // For MVP, we'll create a mock audio URL
      const mockAudioUrl = 'https://www.soundjay.com/misc/sounds/beep-07a.mp3';
      setAudioUrl(mockAudioUrl);
      setCurrentState('result');
    }, 3000);
  };

  const handleGenerateAnother = () => {
    setCurrentState('landing');
    setInputText('');
    setAudioUrl(null);
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
    </div>
  );
}

export default App;