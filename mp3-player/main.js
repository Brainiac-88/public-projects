const electron = require('electron');
const url = require('url');
const path = require('path');
const jsmediatags = require("jsmediatags");

const {app, BrowserWindow, Menu} = electron;
const {dialog} = require('electron');

const os = require('os');
const storage = require('electron-json-storage');

storage.setDataPath(os.tmpdir());

let mainWindow;
let addWindow;

	
//App Ready
app.on('ready', function(){
	
	//Create window
	mainWindow = new BrowserWindow({});
	
	//Load HTML
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'main_window.html'),
		protocol: 'file',
		slashes: true
	}));
	

	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	
	Menu.setApplicationMenu(mainMenu);
	
	//X-re kilépés
	mainWindow.on('closed', function(){
		app.quit();
	});
	
	
	//Automatikus betöltés:
	
		storage.get('last_played', function(error, data) {
		if (error) throw error;
			if(typeof data.file != 'undefined') {
			
			var fileName = data.file;
			var xc_artist;
			var xc_album;
			var xc_year;
			var xc_genre;
			
			
			var xo_obj = {
				path: fileName
			}
			
			var mappa = fileName.substring(0,fileName.lastIndexOf("\\")+1);
			var fs = require('fs');
			var files = fs.readdirSync(mappa).filter(function(file) { return file.substr(-4) === '.mp3'; });

			var xo_folder_obj = {
				songs: [files]
			}
			
			
				mainWindow.webContents.executeJavaScript('window.openedfile='+JSON.stringify(xo_obj)+';window.autoStart=false;window.xc_artist='+xc_artist+'; window.xc_album='+xc_album+';window.xc_year='+xc_year+';window.xc_genre='+xc_genre+';window.songList='+JSON.stringify(xo_folder_obj)+'; OpenCallback()');
			}
		});
	

});


//Add Window

function createAddWindow() {

	addWindow = new BrowserWindow({
		width: 300,
		height: 200,
		title: 'Info',
		resizable: false,
		minimizable: false,
		fullscreenable: false
	});
	
	addWindow.setMenu(null);
	//Load HTML
	
	addWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'add_window.html'),
		protocol: 'file',
		slashes: true
	}));
	
	//Garbage Collection
	addWindow.on('close', function(){
		addWindow = null;
	});
}

function openFileWindow(){
	
	const electron = require('electron');
	const ipc = require('electron').ipcMain;
	
	dialog.showOpenDialog(
		{ 
			filters: [
				{ name: 'Zene | Mp3', extensions: ['mp3','ogg'] }
			],
		},
		function (fileNames) {
			if (fileNames === undefined) return;
			var fileName = fileNames[0];
			
			var xc_artist;
			var xc_album;
			var xc_year;
			var xc_genre;
			
			
			var xo_obj = {
				path: fileName
			}
			
			var mappa = fileName.substring(0,fileName.lastIndexOf("\\")+1);
			var fs = require('fs');
			var files = fs.readdirSync(mappa).filter(function(file) { return file.substr(-4) === '.mp3'; });

			var xo_folder_obj = {
				songs: [files]
			}
			
			
			mainWindow.webContents.executeJavaScript('window.openedfile='+JSON.stringify(xo_obj)+';window.xc_artist='+xc_artist+';window.autoStart=true; window.xc_album='+xc_album+';window.xc_year='+xc_year+';window.xc_genre='+xc_genre+';window.songList='+JSON.stringify(xo_folder_obj)+'; OpenCallback()');
				
			
		}
	);
	
}

//Create menu template

const mainMenuTemplate = [
	{
		label: 'File',
		submenu:[
			{
				label: 'Megnyitás',
				click(){
					openFileWindow();
				}
			},
			{
				label: 'Info',
				click(){
					createAddWindow();
				}
			},
			{
				label: 'Kilépés', //darwin: macOSX
				accelerator : process.platform == 'darwin' ? 'Command+Q' : 'ctrl+q',
				click(){
					app.quit();
				}
			}
		]
	}
];

//Ha OSX akkor a file menu-t korrigálni kell.
if(process.platform == 'darwin'){
	mainMenuTemplate.unshift({});
}

//Add Developer Tools in not production mode

/*
if(process.env.NODE_ENV !== 'production'){
	mainMenuTemplate.push({
		label: 'Developer Tools',
		submenu: [
			{
				label: 'Toggle Devtools',
				accelerator : process.platform == 'darwin' ? 'Command+I' : 'ctrl+i',
				click(item, focusedWindow){
					focusedWindow.toggleDevTools();
				}
			},
			{
				role: 'reload'
			}
		]
	})
} */