import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    // Add methods here to expose to the renderer
    // sendMessage: (message: string) => ipcRenderer.send('message', message),
});
