"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/electron/preload/preload.ts
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
    handleCounter: (callback) => { ipcRenderer.on('update-counter', callback); },
    handleEvent: (callback) => { ipcRenderer.on('fresh-event', callback); }
});
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element)
            element.innerText = text;
    };
    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});
//# sourceMappingURL=preload.js.map