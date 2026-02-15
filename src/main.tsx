import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const registerSW = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/xen-sw.js', {
        scope: '/'
      });
      console.log('SW registered successfully:', registration);
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  }
};

registerSW();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
