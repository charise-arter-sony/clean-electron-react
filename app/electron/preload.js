const { contextBridge, ipcRenderer } = require('electron');

const API = {
	// Renderer to Main
	send: (channel, data) => {
		let validChannels = [];
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

	// Render to Main example
	// Main listens for messages from renderer
	// (data ) => (channel MAIN should listen for, data )
	sendMsgToMain: (msg) => ipcRenderer.send('msg:renderer', msg),

	// Main to Renderer example
	// Renderer listens for messages from Main
	// listen by passing in callback function
	// takes channel name from main (ex. count)

	onCount: (callback) =>
		ipcRenderer.on('count', (event, args) => {
			// callback function WITH ARGS
			callback(args);
			// renderer process creates callback function
		}),

	alertNodeMsg: (callback) =>
		ipcRenderer.on('alert:node', (event, args) => {
			callback(args);
		}),
};

contextBridge.exposeInMainWorld('api', API);
