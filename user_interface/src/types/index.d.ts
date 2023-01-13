
declare type ElectronAPI = {
    handleCounter: (callback: (event, value) => void) => void;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
};
export {}