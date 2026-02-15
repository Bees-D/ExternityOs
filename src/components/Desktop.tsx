import React from 'react';
import { Globe, Terminal, FileText, Folder, Settings } from 'lucide-react';

interface DesktopIconProps {
    name: string;
    icon: React.ReactNode;
    onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ name, icon, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center gap-1 p-2 w-20 hover:bg-white/10 rounded-lg transition-all active:scale-95 group"
    >
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg">
            {icon}
        </div>
        <span className="text-[11px] text-white text-center font-medium drop-shadow-md">{name}</span>
    </button>
);

export const Desktop: React.FC<{ onOpenApp: (id: string) => void }> = ({ onOpenApp }) => {
    return (
        <div className="fixed inset-0 p-4 grid grid-flow-col grid-rows-[repeat(auto-fill,96px)] gap-2 content-start select-none">
            <DesktopIcon
                name="Browser"
                icon={<Globe className="w-8 h-8 text-blue-400" />}
                onClick={() => onOpenApp('browser')}
            />
            <DesktopIcon
                name="Terminal"
                icon={<Terminal className="w-8 h-8 text-green-400" />}
                onClick={() => onOpenApp('terminal')}
            />
            <DesktopIcon
                name="Files"
                icon={<Folder className="w-8 h-8 text-yellow-400" />}
                onClick={() => onOpenApp('files')}
            />
            <DesktopIcon
                name="Notes"
                icon={<FileText className="w-8 h-8 text-white/80" />}
                onClick={() => onOpenApp('notes')}
            />
            <DesktopIcon
                name="Settings"
                icon={<Settings className="w-8 h-8 text-gray-400" />}
                onClick={() => onOpenApp('settings')}
            />
        </div>
    );
};
