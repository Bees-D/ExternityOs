import React, { useState } from 'react';
import { Search, RotateCw, ChevronLeft, ChevronRight, Home } from 'lucide-react';

export const Browser: React.FC = () => {
    const [url, setUrl] = useState('https://google.com');
    const [iframeUrl, setIframeUrl] = useState('/ign-proxy/https://google.com');

    const handleNavigate = (e: React.FormEvent) => {
        e.preventDefault();
        let targetUrl = url;
        if (!url.startsWith('http')) {
            targetUrl = 'https://' + url;
        }
        setIframeUrl(`/ign-proxy/${targetUrl}`);
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Toolbar */}
            <div className="h-12 bg-[#f3f3f3] border-b border-gray-300 flex items-center px-2 gap-2 shrink-0">
                <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-gray-200 rounded-md"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-md"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-md" onClick={() => setIframeUrl(iframeUrl)}><RotateCw className="w-4 h-4 text-gray-600" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-md" onClick={() => { setUrl('https://google.com'); setIframeUrl('/ign-proxy/https://google.com'); }}><Home className="w-4 h-4 text-gray-600" /></button>
                </div>

                <form onSubmit={handleNavigate} className="flex-1 flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 gap-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1 text-sm outline-none text-gray-700 bg-transparent"
                        placeholder="Search or enter URL"
                    />
                </form>
            </div>

            {/* Web content */}
            <div className="flex-1 relative bg-white">
                <iframe
                    src={iframeUrl}
                    className="absolute inset-0 w-full h-full border-none"
                    title="Ignition Proxy"
                />
            </div>
        </div>
    );
};
