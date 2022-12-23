const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';

// Alert test modules
const { getNodeVersion } = require('./modules/checkNode');
// const { getDummyFile } = require('./modules/checkDummyFile');

let window;
let count = 0;
let result = '';

// Show Dialog - Native
// const handleNativeFileOpen = async () => {
// 	const { canceled, filePaths } = await dialog.showOpenDialog();
// 	if (canceled) {
// 		return;
// 	} else {
// 		return filePaths[0];
// 	}
// };

function createWindow() {
	// Create a new window
	window = new BrowserWindow({
		width: 800,
		height: 600,
		show: false,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: false,
			nodeIntegrationInWorker: false,
			nodeIntegrationInSubFrames: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// Event listeners on the window
	window.webContents.on('did-finish-load', () => {
		window.show();
		window.focus();
	});

	// Send message to renderer

	// Load our HTML file
	if (isDevelopment) {
		window.loadURL('http://localhost:40992');
	} else {
		window.loadFile('app/dist/index.html');
	}
	return window;
}

// This method is called when Electron
// has finished initializing
app.whenReady().then(async () => {
	let x = createWindow();
	result = await getNodeVersion(window);
	x.webContents.send('helloWorld', result);

	setInterval(() => {
		// channel and data
		window.webContents.send('count', count++);
		console.log(`Result from main: ${result}`);
	}, 2000);

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// IPC practice

// send message FROM Main to renderer

// every second send a message with channel name of count and pass
// along this data

// window.webContents.send('alert:node', nodeMsg);
// Listen for message from RENDERER
// main should listen for channel set in preload function for Renderer --> Main
// event has information about what process sent the message
ipcMain.on('msg:renderer', (event, args) => {
	console.log(`Args from Renderer: ${args}`);
});

// IPC events
// Open file
//ipcMain.handle('dialog:openNativeFile', handleNativeFileOpen);

// Alert test
