importScripts('/ignition/ignition.sw.js');

// Add custom OS worker logic here if needed
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});
