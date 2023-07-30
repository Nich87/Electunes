const windowStateManager = require('electron-window-state');
const { app, BrowserWindow, ipcMain,dialog } = require('electron');
const contextMenu = require('electron-context-menu');
const serve = require('electron-serve');
const path = require('path');
const fs = require('fs');
const exts = ['mp3', 'wav', 'flac', 'ogg', 'aac', 'm4a', 'wma', 'alac', 'webm'];
const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 5173;
const dev = !app.isPackaged;
let mainWindow;

// TODO:electron-storeで設定保存
try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}


function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 800,
		defaultHeight: 600,
	});

	const mainWindow = new BrowserWindow({
		autoHideMenuBar: true,
		minHeight: 720,
		minWidth: 1280,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			webSecurity:false,
			preload: path.join(__dirname, 'preload.cjs'),
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
	});

	windowState.manage(mainWindow);
	// mainWindow.setAlwaysOnTop(true, 'screen-saver');

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow);
	});

	return mainWindow;
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: '🎵Load Music',
			click:() => openFolderDialog()
		},
	],
});

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function createMainWindow() {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) loadVite(port);
	else serveURL(mainWindow);
}

app.once('ready', createMainWindow);
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('to-main', (event, count) => {
	return mainWindow.webContents.send('from-main', `next count is ${count + 1}`);
});


function openFolderDialog() {
  dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }).then(
    (result) => {
      const filePath = result.filePaths[0];
      if (filePath) scanDir(filePath);
    },
    (error) => {
      throw error;
    }
  );
}

function scanDir(filePath) {
  if (!filePath || filePath[0] === 'undefined') return;
  console.log(walkSync(filePath));
  mainWindow.webContents.send('start', walkSync(filePath));
}

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir, 'utf8');
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) return walkSync(filepath, filelist);
    const ext = file.slice(file.lastIndexOf('.') + 1);
    if (exts.includes(ext)) filelist.push(filepath);
  });
  return filelist;
}