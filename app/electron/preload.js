const { contextBridge, ipcRenderer } = require('electron');

const API = {
	// Renderer to Main (FFMPEG uses this one to send filePath to Main)
	send: (channel, data) => {
		let validChannels = ['nodeV:data'];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},

	// Bi-directional
	invoke: (channel, data) => {
		let validChannels = [];
		if (validChannels.includes(channel)) {
			ipcRenderer.invoke(channel, data);
		}
	},

	receive: (channel, func) => {
		let validChannels = [];
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (_, ...args) => func(...args));
		}
	},

	openNativeFile: () => ipcRenderer.invoke('dialog:openNativeFile'),

	checkNodeV: window => ipcRenderer.invoke('check:node', window),
	checkFile: () => ipcRenderer.invoke('check:file'),
};

contextBridge.exposeInMainWorld('api', API);
