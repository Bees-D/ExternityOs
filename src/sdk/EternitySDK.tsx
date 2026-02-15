import React, { createContext, useContext, useCallback } from 'react';

export interface FileSystem {
    readFile: (path: string) => Promise<string | ArrayBuffer>;
    writeFile: (path: string, content: string | ArrayBuffer) => Promise<void>;
    ls: (path: string) => Promise<string[]>;
    mkdir: (path: string) => Promise<void>;
}

export interface Process {
    id: string;
    name: string;
    terminate: () => void;
}

export interface OSContextType {
    fs: FileSystem;
    openApp: (id: string, params?: any) => void;
    closeApp: (id: string) => void;
    notify: (title: string, body: string, icon?: string) => void;
    getTheme: () => 'dark' | 'light';
}

const OSContext = createContext<OSContextType | null>(null);

export const useOS = () => {
    const context = useContext(OSContext);
    if (!context) throw new Error("useOS must be used within an EternityProvider");
    return context;
};

// Mock File System for now (Local Storage based)
const createFileSystem = (): FileSystem => ({
    readFile: async (path) => localStorage.getItem(`fs:${path}`) || '',
    writeFile: async (path, content) => {
        if (typeof content === 'string') localStorage.setItem(`fs:${path}`, content);
        else console.warn("Binary writes not yet supported in mock FS");
    },
    ls: async (path) => Object.keys(localStorage).filter(k => k.startsWith(`fs:${path}`)).map(k => k.replace(`fs:${path}`, '')),
    mkdir: async (path) => console.log("Mkdir", path),
});

export const EternityProvider: React.FC<{ children: React.ReactNode, openApp: (id: string) => void, closeApp: (id: string) => void }> = ({ children, openApp, closeApp }) => {
    const fs = createFileSystem();

    const notify = useCallback((title: string, body: string) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, { body });
        } else {
            console.log(`OS Notification: ${title} - ${body}`);
        }
    }, []);

    const value: OSContextType = {
        fs,
        openApp,
        closeApp,
        notify,
        getTheme: () => 'dark',
    };

    return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
};
