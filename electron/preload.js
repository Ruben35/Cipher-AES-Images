//* preload.js

const {ipcRenderer, contextBridge} = require('electron');

const WINDOW_API = {
    makeMessage: (message) => ipcRenderer.send("makeMessage", message),
    getImageFile: () => ipcRenderer.invoke("getImageFile"),
    writeImageFile: (objectImage) => ipcRenderer.send("writeImageFile", objectImage)
}

contextBridge.exposeInMainWorld('api', WINDOW_API);