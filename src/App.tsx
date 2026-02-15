import React, { useState, useEffect } from 'react';
import { Taskbar } from './components/Taskbar';
import { Desktop } from './components/Desktop';
import { Window } from './components/Window';
import { StartMenu } from './components/StartMenu';
import { EternityProvider } from './sdk/EternitySDK';
import { Browser } from './components/apps/Browser';
import { Terminal } from './components/apps/Terminal';
import { FileManager } from './components/apps/FileManager';
import { SettingsApp } from './components/apps/Settings';
import { AnimatePresence } from 'framer-motion';
import { Globe, Terminal as TerminalIcon, Shield, Folder, Settings as SettingsIcon } from 'lucide-react';

interface WindowState {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  zIndex: number;
}

function App() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [booting, setBooting] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    // Fake boot sequence
    const timer = setTimeout(() => setBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openApp = (id: string) => {
    setStartMenuOpen(false);
    if (openWindows.find(w => w.id === id)) {
      setActiveWindowId(id);
      // Bring to front
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ } : w));
      return;
    }

    let app: WindowState | null = null;
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);

    if (id === 'browser') {
      app = {
        id: 'browser',
        title: 'Browser',
        icon: <Globe className="w-4 h-4 text-blue-400" />,
        content: <Browser />,
        zIndex: nextZ
      };
    } else if (id === 'terminal') {
      app = {
        id: 'terminal',
        title: 'Terminal',
        icon: <TerminalIcon className="w-4 h-4 text-green-400" />,
        content: <Terminal />,
        zIndex: nextZ
      };
    } else if (id === 'files') {
      app = {
        id: 'files',
        title: 'File Manager',
        icon: <Folder className="w-4 h-4 text-yellow-400" />,
        content: <FileManager />,
        zIndex: nextZ
      };
    } else if (id === 'settings') {
      app = {
        id: 'settings',
        title: 'Settings',
        icon: <SettingsIcon className="w-4 h-4 text-gray-400" />,
        content: <SettingsApp />,
        zIndex: nextZ
      };
    }

    if (app) {
      setOpenWindows(prev => [...prev, app!]);
      setActiveWindowId(id);
    }
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remaining = openWindows.filter(w => w.id !== id);
      if (remaining.length > 0) {
        setActiveWindowId(remaining[remaining.length - 1].id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  if (booting) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white font-mono animate-pulse">
        <Shield className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold tracking-tighter text-blue-400">EXTERNITY OS</h1>
        <p className="text-sm text-white/40 mt-2">Initializing Ignition Engine...</p>
      </div>
    );
  }

  return (
    <EternityProvider openApp={openApp} closeApp={closeWindow}>
      <div className="fixed inset-0 bg-[#0a0a0a] overflow-hidden select-none">
        {/* Dynamic Animated Wallpaper */}
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-purple-900/40" />
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />

        {/* Main UI */}
        <Desktop onOpenApp={openApp} />

        <AnimatePresence>
          {openWindows.map(win => (
            <Window
              key={win.id}
              title={win.title}
              icon={win.icon}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => { }}
              isFocused={activeWindowId === win.id}
              zIndex={win.zIndex}
            >
              {win.content}
            </Window>
          ))}

          {startMenuOpen && (
            <StartMenu
              onOpenApp={openApp}
              onClose={() => setStartMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        <Taskbar
          onStartMenuToggle={() => setStartMenuOpen(!startMenuOpen)}
          activeAppId={activeWindowId}
          onOpenApp={openApp}
        />
      </div>
    </EternityProvider>
  );
}

export default App;
