const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';

let window;

// Show Dialog - Native
const handleNativeFileOpen = async () => {
	const { canceled, filePaths } = await dialog.showOpenDialog();
	if (canceled) {
		return;
	} else {
		return filePaths[0];
	}
};

// Alert test

const randomData = async () => {
	let fakeData = [1, 2, 3, 4];
	let data = fakeData[Math.floor(Math.random() * fakeData.length)];
	console.log(`Auto Data is: ${data}`);
	return data;
};

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
		// run automatically after load is ready
		// randomData();
	});

	// Load our HTML file
	if (isDevelopment) {
		window.loadURL('http://localhost:40992');
	} else {
		window.loadFile('app/dist/index.html');
	}
}

// This method is called when Electron
// has finished initializing
app.whenReady().then(() => {
	createWindow();

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

// IPC events
// Open file
ipcMain.handle('dialog:openNativeFile', handleNativeFileOpen);

// Alert test
ipcMain.handle('alert:data', randomData);

// Node test
ipcMain.on('nodeTest', (e, args) => {
	e.sender.send(
		'test-succeeded',
		'Main -> Renderer:\n Message response from Main'
	);
	console.log(
		`Message from Renderer: Should call child process (Needs more work): \n ${args}`
	);
});

// // Alert test
// ipcMain.on('alertData', (e, data) => {
// 	let data = randomData(fakeData);
// 	e.sender.send('alertMsg', data);
// 	console.log(`Data sent from Main to Renderer: ${data}`);
// });

// // Alert message sent to renderer
// ipcMain.on('alertMsg', (e, message, data) => {
// 	e.sender.send(
// 		'Message test. \n',
// 		`Main to renderer DATA: ${data},\n MESSAGE: ${message}`,
// 		window.webContents.send('alertMessage', data)
// 	);
// });
