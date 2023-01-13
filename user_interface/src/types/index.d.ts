
declare type ElectronAPI = {
    handleCounter: (callback: (event, value) => void) => void;
    handleEvent: (callback: (event, value: EventJSON) => void) => void;
}



declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
};
export {}