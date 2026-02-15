# Eternity OS

A next-generation, browser-based operating system built with React, Tailwind CSS, and TypeScript. Powered by the **Ignition Engine** for seamless web proxying and secure transmissions.

## ✨ Features
- **Modern UI**: High-end glassmorphic design with smooth animations (Framer Motion).
- **Ignition Powered**: Advanced web proxy integration with Service Worker support.
- **Eternity SDK**: Robust API for third-party app development.
- **Vibrant Desktop**: Dynamic wallpapers and intuitive window management.

## 🛠️ Technology Stack
- **Core**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Engine**: Ignition V3.0

## 🧪 Development SDK
Developers can build apps for EternityOS using the provided SDK.

### Usage Example:
```tsx
import { useOS } from '@/sdk/EternitySDK';

const MyApp = () => {
  const { fs, notify, openApp } = useOS();

  const handleSave = async () => {
    await fs.writeFile('/home/user/note.txt', 'Hello World');
    notify('Success', 'File saved to VFS');
  };

  return (
    <div className="p-4">
      <button onClick={handleSave}>Save File</button>
    </div>
  );
};
```

## 🚀 Getting Started
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

## 📂 Project Structure
- `src/components`: UI components (Taskbar, Window, Desktop)
- `src/components/apps`: Built-in OS applications
- `src/sdk`: Eternity OS developer tools
- `public/ignition`: Ignition Engine core artifacts
