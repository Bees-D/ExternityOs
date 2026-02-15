import React, { useState, useEffect, useRef } from 'react';

export const Terminal: React.FC = () => {
    const [history, setHistory] = useState<string[]>([
        "ExternityOS Kernel v1.0.0 (x86_64-web)",
        "Initializing Ignition Engine... OK",
        "Welcome, root. Type 'help' for available commands.",
        ""
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        const newHistory = [...history, `root@externity:~$ ${input}`];

        switch (cmd) {
            case 'help':
                newHistory.push("Available commands: help, clear, version, whoami, ignition, ls");
                break;
            case 'clear':
                setHistory([]);
                setInput("");
                return;
            case 'version':
                newHistory.push("ExternityOS v1.0.0-alpha");
                break;
            case 'whoami':
                newHistory.push("root / administrator");
                break;
            case 'ignition':
                newHistory.push("Ignition Web Proxy: V3.0 (Active)");
                newHistory.push("Status: Connected via Wisp/Wrangler");
                break;
            case 'ls':
                newHistory.push("apps/  bin/  etc/  home/  root/  sys/  var/");
                break;
            default:
                newHistory.push(`sh: command not found: ${cmd}`);
        }

        newHistory.push("");
        setHistory(newHistory);
        setInput("");
    };

    return (
        <div
            className="flex flex-col h-full bg-[#0c0c0c] text-[#00ff00] font-mono text-sm p-4 overflow-hidden"
            onClick={() => document.getElementById('terminal-input')?.focus()}
        >
            <div ref={scrollRef} className="flex-1 overflow-auto whitespace-pre-wrap mb-2 scrollbar-thin scrollbar-thumb-white/10">
                {history.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
            <form onSubmit={handleCommand} className="flex gap-2 shrink-0">
                <span className="text-blue-400 font-bold">root@externity:~$</span>
                <input
                    id="terminal-input"
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none border-none text-[#00ff00]"
                    autoComplete="off"
                />
            </form>
        </div>
    );
};
