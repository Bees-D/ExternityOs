import React, { useState, useEffect } from 'react';
import { useOS } from '../../sdk/EternitySDK';
import { Folder, ChevronRight, Home, ArrowLeft } from 'lucide-react';

export const FileManager: React.FC = () => {
    const { fs } = useOS();
    const [currentPath, setCurrentPath] = useState('/');
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        loadItems();
    }, [currentPath]);

    const loadItems = async () => {
        const list = await fs.ls(currentPath);
        setItems(list);
    };

    return (
        <div className="flex flex-col h-full bg-[#1a1a1a] text-white">
            {/* Navigation Bar */}
            <div className="h-10 border-b border-white/5 flex items-center px-4 gap-4 bg-white/5">
                <button className="p-1 hover:bg-white/10 rounded" onClick={() => setCurrentPath('/')}><Home className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-white/10 rounded" onClick={() => {
                    const parts = currentPath.split('/').filter(Boolean);
                    parts.pop();
                    setCurrentPath('/' + parts.join('/'));
                }}><ArrowLeft className="w-4 h-4" /></button>
                <div className="flex-1 flex items-center text-xs text-white/40 gap-2 overflow-hidden">
                    <span>eternity:</span>
                    {currentPath.split('/').filter(Boolean).map((part, i) => (
                        <React.Fragment key={i}>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white/80">{part}</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Grid View */}
            <div className="flex-1 p-4 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 content-start overflow-auto">
                {items.map(item => (
                    <button
                        key={item}
                        className="flex flex-col items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors group"
                        onDoubleClick={() => {
                            const newPath = currentPath === '/' ? `/${item}` : `${currentPath}/${item}`;
                            setCurrentPath(newPath);
                        }}
                    >
                        <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                            <Folder className="w-8 h-8 text-blue-400" />
                        </div>
                        <span className="text-[11px] text-white/80 text-center truncate w-full">{item}</span>
                    </button>
                ))}
                {items.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center pt-20 text-white/20">
                        <Folder className="w-16 h-16 mb-2 opacity-20" />
                        <p>This folder is empty</p>
                    </div>
                )}
            </div>
        </div>
    );
};
