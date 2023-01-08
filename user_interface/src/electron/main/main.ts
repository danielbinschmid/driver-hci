// src/electron/main/main.ts
import { join } from 'path';
import {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} from 'electron';


// https://www.electronjs.org/de/docs/latest/tutorial/ipc

const isDev = process.env.npm_lifecycle_event === "app:dev" ? true : false;

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, '../preload/preload.js'),
        },
    });

    const menu = Menu.buildFromTemplate([
            {
                label: app.name,
                submenu: [
                {
                click: () => mainWindow.webContents.send('update-counter', 1),
                label: 'Increment',
                },
                {
                click: () => mainWindow.webContents.send('update-counter', -1),
                label: 'Decrement',
                }]
            }
    ])
    Menu.setApplicationMenu(menu);


    // and load the index.html of the app.
    mainWindow.loadURL(
        isDev ?
        'http://localhost:5173' :
        join(__dirname, '../../index.html')
    );
    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    ipcMain.on('counter-value', (_event, value) => {
        console.log(value);
    })

    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
