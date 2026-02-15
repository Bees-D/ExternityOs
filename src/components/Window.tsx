import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface WindowProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    onClose: () => void;
    onMinimize: () => void;
    isFocused: boolean;
    zIndex: number;
}

export const Window: React.FC<WindowProps> = ({
    title,
    icon,
    children,
    onClose,
    onMinimize,
    isFocused,
    zIndex
}) => {
    const [isMaximized, setIsMaximized] = useState(false);

    return (
        <motion.div
            drag={!isMaximized}
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{ zIndex }}
            className={cn(
                "fixed flex flex-col overflow-hidden rounded-xl border transition-shadow duration-300",
                isMaximized
                    ? "inset-0 !translate-x-0 !translate-y-0 rounded-none w-full h-[calc(100%-48px)]"
                    : "w-[800px] h-[500px] top-[10%] left-[15%]",
                isFocused ? "border-white/20 shadow-2xl shadow-black/50" : "border-white/10 shadow-lg shadow-black/20",
                "bg-[#1c1c1c]/90 backdrop-blur-2xl"
            )}
        >
            {/* Title Bar */}
            <div
                className="h-10 flex items-center justify-between px-3 bg-white/5 cursor-default select-none group"
                onDoubleClick={() => setIsMaximized(!isMaximized)}
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-sm font-medium text-white/80">{title}</span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={onMinimize}
                        className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                    >
                        <Minus className="w-4 h-4 text-white/80" />
                    </button>
                    <button
                        onClick={() => setIsMaximized(!isMaximized)}
                        className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                    >
                        {isMaximized ? <Square className="w-3.5 h-3.5 text-white/80" /> : <Maximize2 className="w-3.5 h-3.5 text-white/80" />}
                    </button>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-red-500/80 rounded-md transition-colors group-hover:bg-red-500"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-black/20">
                {children}
            </div>
        </motion.div>
    );
};
