
import React, { useState, useRef, useEffect, useCallback } from 'react';
import VisualizerCanvas from './components/VisualizerCanvas';
import { Theme, AudioMetadata, VisualizerMode } from './types';
import { DEFAULT_THEMES, FFT_SIZE } from './constants';
import { generateThemeFromDescription } from './services/geminiService';

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEMES[0]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState<VisualizerMode>(VisualizerMode.ORBITAL);
  const [progress, setProgress] = useState(0);
  const [metadata, setMetadata] = useState<AudioMetadata>({ 
    title: 'AWAITING INPUT', 
    artist: 'LOAD SONIC DATA', 
    duration: 0,
    currentTime: 0
  });
  
  const [isGeneratingTheme, setIsGeneratingTheme] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [showUI, setShowUI] = useState(true);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const uiTimeoutRef = useRef<number>();

  const setupAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
    }
    if (!sourceRef.current) {
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      const newAnalyser = audioContextRef.current.createAnalyser();
      newAnalyser.fftSize = FFT_SIZE;
      newAnalyser.smoothingTimeConstant = 0.85; 
      sourceRef.current.connect(newAnalyser);
      newAnalyser.connect(audioContextRef.current.destination);
      setAnalyser(newAnalyser);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setMetadata(prev => ({
        ...prev,
        title: file.name.replace(/\.[^/.]+$/, "").toUpperCase(),
        artist: 'EXTERNAL AUDIO SOURCE'
      }));
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
    }
  };

  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    const currentTime = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    const ratio = duration > 0 ? clamp01(currentTime / duration) : 0;

    setProgress(ratio);
    setMetadata(prev => ({
      ...prev,
      duration,
      currentTime
    }));
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = clamp01((e.clientX - rect.left) / rect.width);
    audio.currentTime = ratio * audio.duration;
    updateProgress();
  }, [updateProgress]);

  const handleMouseMove = () => {
    setShowUI(true);
    if (uiTimeoutRef.current) clearTimeout(uiTimeoutRef.current);
    uiTimeoutRef.current = window.setTimeout(() => {
      if (!isPaused) setShowUI(false);
    }, 4000);
  };

  useEffect(() => {
    if (audioFile && audioRef.current) {
      const url = URL.createObjectURL(audioFile);
      audioRef.current.src = url;
      setupAudio();
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {
        // Autoplay can be blocked; rely on user interaction.
        setIsPaused(true);
      });
      return () => URL.revokeObjectURL(url);
    }
  }, [audioFile, setupAudio, volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  return (
    <div 
      className="relative h-screen w-screen flex flex-col items-center justify-between overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ cursor: showUI ? 'default' : 'none' }}
    >
      <VisualizerCanvas 
        analyser={analyser} 
        theme={theme} 
        isPaused={isPaused} 
        mode={mode} 
        progress={progress}
      />

      {/* Header HUD */}
      <div className={`w-full flex justify-between items-start p-8 z-10 transition-all duration-700 ${showUI ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="flex flex-col gap-1 pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.primaryColor }} />
            <h1 className="text-2xl font-black tracking-[0.3em] text-white">
              NOVA <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor})` }}>ELITE</span>
            </h1>
          </div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] ml-4">
            SUPERNOVA CORE v5.0
          </p>
        </div>

        <div className="flex gap-4 pointer-events-auto">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-4 rounded-xl flex flex-col gap-3 w-64 shadow-2xl">
            <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.primaryColor }}>Atmosphere Synthesizer</label>
            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision..."
                className="bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-all"
                style={{ borderColor: prompt ? theme.primaryColor : 'rgba(255,255,255,0.1)' }}
              />
              <button 
                onClick={async () => {
                  if (!prompt.trim()) return;
                  setIsGeneratingTheme(true);
                  try {
                    const newTheme = await generateThemeFromDescription(prompt);
                    setTheme(newTheme);
                    setPrompt('');
                  } catch (e) { console.error(e); }
                  finally { setIsGeneratingTheme(false); }
                }}
                disabled={isGeneratingTheme}
                className="text-black font-black py-2 rounded-lg text-[10px] uppercase tracking-tighter transition-all disabled:opacity-50"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {isGeneratingTheme ? 'REWRITING REALITY...' : 'INJECT THEME'}
              </button>
            </div>
            
            <div className="flex gap-2 mt-2 items-center justify-between">
               <div className="flex gap-1">
                {DEFAULT_THEMES.map(t => (
                  <button 
                    key={t.name}
                    onClick={() => setTheme(t)}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${theme.name === t.name ? 'border-white scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: t.primaryColor }}
                  />
                ))}
               </div>
               <div className="flex gap-1">
                  <button 
                    onClick={() => setMode(VisualizerMode.ORBITAL)}
                    className={`px-2 py-1 text-[8px] font-bold rounded ${mode === VisualizerMode.ORBITAL ? 'bg-white text-black' : 'bg-white/10 text-white/50'}`}
                  >
                    ORBIT
                  </button>
                  <button 
                    onClick={() => setMode(VisualizerMode.HORIZON)}
                    className={`px-2 py-1 text-[8px] font-bold rounded ${mode === VisualizerMode.HORIZON ? 'bg-white text-black' : 'bg-white/10 text-white/50'}`}
                  >
                    HORIZON
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track Info Central */}
      <div className={`text-center z-10 pointer-events-none px-4 transition-all duration-1000 ${showUI ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
        <h2 className="text-4xl md:text-7xl font-black mb-2 text-white tracking-tighter drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]">
          {metadata.title}
        </h2>
        <div className="flex items-center justify-center gap-4">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[1em]">
            SYSTEM ONLINE // {metadata.artist}
          </p>
        </div>
      </div>

      {/* Control Bar Bottom */}
      <div className={`w-full max-w-5xl px-8 pb-12 z-10 transition-all duration-700 ${showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-black/60 backdrop-blur-3xl border border-white/10 p-5 rounded-3xl flex items-center justify-between gap-8 shadow-2xl">
          <div className="flex items-center gap-4">
            <input type="file" id="audio-upload" accept="audio/*" className="hidden" onChange={handleFileUpload} />
            <label htmlFor="audio-upload" className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl cursor-pointer transition-all border border-white/10 text-white group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </label>

            <button
              type="button"
              onClick={() => setIsRepeat(prev => !prev)}
              aria-pressed={isRepeat}
              aria-label={isRepeat ? 'Repeat on' : 'Repeat off'}
              className="w-12 h-12 flex items-center justify-center rounded-2xl cursor-pointer transition-all border border-white/10 text-white group"
              style={{ backgroundColor: isRepeat ? theme.primaryColor : 'rgba(255,255,255,0.05)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v4m0 0l2-2m-2 2l-2-2M17 17H7v-4m0 0l-2 2m2-2l2 2" />
              </svg>
            </button>

            <div className="flex flex-col">
               <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Master volume</span>
               <input 
                  type="range" min="0" max="1" step="0.01" value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-32 h-1 bg-white/10 rounded-full appearance-none accent-white cursor-pointer"
                style={{ accentColor: theme.primaryColor }}
              />
            </div>
          </div>

          <button 
            onClick={() => {
              const audio = audioRef.current;
              if (!audio) return;

              if (audio.paused) {
                audio.play().catch(() => {
                  setIsPaused(true);
                });
              } else {
                audio.pause();
              }
            }}
            className="w-20 h-20 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl group"
            style={{ backgroundColor: theme.primaryColor, color: '#000' }}
          >
            {isPaused ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
            )}
          </button>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Progress</span>
            <div 
              className="w-48 h-1 bg-white/10 rounded-full overflow-hidden pointer-events-auto cursor-pointer"
              onClick={handleSeek}
              role="slider"
              aria-label="Track progress"
              aria-valuemin={0}
              aria-valuemax={metadata.duration || 0}
              aria-valuenow={metadata.currentTime || 0}
            >
               <div 
                className="h-full transition-all duration-300" 
                style={{ width: `${progress * 100}%`, backgroundColor: theme.primaryColor }} 
               />
            </div>
            <span className="text-[8px] font-mono text-white/40">
              {formatTime(metadata.currentTime)} / {formatTime(metadata.duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Legal */}
      <footer
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-center transition-opacity duration-700 ${showUI ? 'opacity-80' : 'opacity-35'}`}
      >
        <p className="text-[10px] md:text-[11px] font-bold text-white/40 leading-tight">
          © 2010-2026 GLASTOR-DEV — Todos los derechos reservados.
          <br />
          2025 GLASTOR® marca registrada.
        </p>
        <p className="mt-1 text-[10px] md:text-[11px] font-bold text-white/40">
          <a
            className="pointer-events-auto hover:underline"
            href="https://github.com/glastor-dev/supernova"
            target="_blank"
            rel="noreferrer"
            style={{ color: theme.primaryColor }}
          >
            GitHub
          </a>
          <span className="text-white/30"> • </span>
          <a
            className="pointer-events-auto hover:underline"
            href="https://github.com/glastor-dev/supernova/blob/master/LICENSE"
            target="_blank"
            rel="noreferrer"
            style={{ color: theme.primaryColor }}
          >
            GPL-3.0
          </a>
          <span className="text-white/30"> • </span>
          <span>v1.0.0</span>
        </p>
      </footer>

      <audio 
        ref={audioRef} 
        loop={isRepeat}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        onLoadedMetadata={updateProgress}
        onDurationChange={updateProgress}
        onEnded={() => {
          if (isRepeat) return;

          setIsPaused(true);
          setProgress(0);
          setMetadata(prev => ({
            ...prev,
            currentTime: 0
          }));
        }} 
        onTimeUpdate={updateProgress}
      />
    </div>
  );
};

export default App;
