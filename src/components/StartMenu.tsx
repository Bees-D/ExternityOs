import React from 'react';
import { motion } from 'framer-motion';
import { Search, Power, Settings, User, Globe, Terminal, Folder, FileText, LayoutGrid } from 'lucide-react';

interface StartMenuProps {
    onOpenApp: (id: string) => void;
    onClose: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onOpenApp, onClose }) => {
    const pinnedApps = [
        { id: 'browser', name: 'Browser', icon: <Globe className="w-6 h-6 text-blue-400" /> },
        { id: 'terminal', name: 'Terminal', icon: <Terminal className="w-6 h-6 text-green-400" /> },
        { id: 'files', name: 'Files', icon: <Folder className="w-6 h-6 text-yellow-400" /> },
        { id: 'notes', name: 'Notes', icon: <FileText className="w-6 h-6 text-white/80" /> },
        { id: 'settings', name: 'Settings', icon: <Settings className="w-6 h-6 text-gray-400" /> },
        { id: 'apps', name: 'All Apps', icon: <LayoutGrid className="w-6 h-6 text-purple-400" /> },
    ];

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-14 left-2 w-[400px] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[10000]"
        >
            {/* Search Bar */}
            <div className="p-4 border-b border-white/5">
                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-2 gap-2 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
                    <Search className="w-4 h-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search apps, settings, and files"
                        className="bg-transparent border-none outline-none text-sm text-white/90 placeholder:text-white/30 w-full"
                        autoFocus
                    />
                </div>
            </div>

            {/* Pinned Apps */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Pinned</span>
                    <button className="text-[10px] text-blue-400 hover:underline">All apps</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {pinnedApps.map(app => (
                        <button
                            key={app.id}
                            onClick={() => { onOpenApp(app.id); onClose(); }}
                            className="flex flex-col items-center gap-2 p-3 hover:bg-white/5 rounded-xl transition-colors group"
                        >
                            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                {app.icon}
                            </div>
                            <span className="text-[11px] text-white/80 font-medium">{app.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-black/40 border-t border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 p-1.5 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-white/90">Administrator</span>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors group">
                    <Power className="w-4 h-4 text-white/60 group-hover:text-red-400" />
                </button>
            </div>
        </motion.div>
    );
};
