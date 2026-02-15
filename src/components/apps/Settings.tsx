import React from 'react';
import { Shield, Monitor, Globe, Bell, User, Lock, Trash2 } from 'lucide-react';

export const SettingsApp: React.FC = () => {
    const sections = [
        { id: 'appearance', name: 'Appearance', icon: <Monitor className="w-5 h-5" />, desc: 'Wallpaper, themes, fonts' },
        { id: 'network', name: 'Ignition Proxy', icon: <Globe className="w-5 h-5" />, desc: 'Wisp server, browser settings' },
        { id: 'security', name: 'Security', icon: <Shield className="w-5 h-5" />, desc: 'Permissions, firewalls' },
        { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" />, desc: 'Sound, alerts' },
        { id: 'account', name: 'User Profile', icon: <User className="w-5 h-5" />, desc: 'Identity, HWID' },
        { id: 'storage', name: 'Storage', icon: <Trash2 className="w-5 h-5" />, desc: 'VFS management, cache' },
    ];

    return (
        <div className="flex h-full bg-[#1a1a1a] text-white overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/5 bg-black/20 p-4 flex flex-col gap-1">
                <h2 className="px-3 mb-4 text-xs font-bold text-white/40 uppercase tracking-widest">Settings</h2>
                {sections.map(s => (
                    <button key={s.id} className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left group">
                        <div className="text-white/40 group-hover:text-blue-400 transition-colors">{s.icon}</div>
                        <span className="text-sm font-medium text-white/80">{s.name}</span>
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                <div className="max-w-2xl">
                    <h1 className="text-3xl font-bold mb-2">Eternity OS</h1>
                    <p className="text-white/40 mb-8">System Version 3.0.0 (Ignition Powered)</p>

                    <div className="grid gap-6">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-semibold mb-1">System Health</h3>
                            <p className="text-sm text-white/40 mb-4">Kernel is running within normal parameters.</p>
                            <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Lock className="w-5 h-5 text-green-400" />
                                    <div>
                                        <p className="text-sm font-medium">Ignition Firewall</p>
                                        <p className="text-[10px] text-white/20">Active & Protecting Transmission</p>
                                    </div>
                                </div>
                                <button className="text-xs text-blue-400 font-medium">Manage</button>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-semibold mb-4">Wisp Configuration</h3>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs text-white/40">Server URL</label>
                                    <input
                                        type="text"
                                        defaultValue="wss://wisp.mercuryworkshop.me/"
                                        className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                </div>
                                <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">Apply Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
