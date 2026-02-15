export interface WindowState {
    id: string;
    title: string;
    icon: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    focused: boolean;
    content: React.ReactNode;
    width?: number | string;
    height?: number | string;
    x?: number;
    y?: number;
}

export interface AppConfig {
    id: string;
    name: string;
    icon: string;
    component: React.ComponentType;
}
