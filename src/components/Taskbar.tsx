import React, { useState, useEffect } from 'react';
import { LayoutGrid, Search, Monitor, Settings, Terminal, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

export const Taskbar: React.FC<{
    onStartMenuToggle: () => void;
    activeAppId: string | null;
    onOpenApp: (id: string) => void;
}> = ({ onStartMenuToggle, activeAppId, onOpenApp }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-2 z-[9999]">
            <div className="flex items-center gap-1">
                <button
                    onClick={onStartMenuToggle}
                    className="p-2 hover:bg-white/10 rounded-md transition-all duration-200 group active:scale-90"
                >
                    <LayoutGrid className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-md transition-all duration-200 active:scale-90">
                    <Search className="w-5 h-5 text-white/70" />
                </button>
                <div className="h-6 w-[1px] bg-white/10 mx-1" />
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onOpenApp('browser')}
                        className={cn(
                            "p-2 rounded-md transition-all duration-200 relative group",
                            activeAppId === 'browser' ? "bg-white/20" : "hover:bg-white/10"
                        )}
                    >
                        <Globe className="w-5 h-5 text-white/90" />
                        {activeAppId === 'browser' && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />}
                    </button>
                    <button
                        onClick={() => onOpenApp('terminal')}
                        className={cn(
                            "p-2 rounded-md transition-all duration-200 relative group",
                            activeAppId === 'terminal' ? "bg-white/20" : "hover:bg-white/10"
                        )}
                    >
                        <Terminal className="w-5 h-5 text-white/90" />
                        {activeAppId === 'terminal' && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />}
                    </button>
                    <button
                        onClick={() => onOpenApp('settings')}
                        className={cn(
                            "p-2 rounded-md transition-all duration-200 relative group",
                            activeAppId === 'settings' ? "bg-white/20" : "hover:bg-white/10"
                        )}
                    >
                        <Settings className="w-5 h-5 text-white/90" />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/80 pr-2">
                <div className="flex flex-col items-end">
                    <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>{time.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="p-2 hover:bg-white/10 rounded-md">
                    <Monitor className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};
