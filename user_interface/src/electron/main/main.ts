// src/electron/main/main.ts
import { join } from 'path';
import {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    MenuItem
} from 'electron';

import express from "express";
import bodyParser from "body-parser";

function startListening() {
    
    
    const port = 40002;
    const router = express.Router();
    const app = express();
    
    // add router in express app
    app.use("/",router);

    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(bodyParser.json());
    var jsonParser = function(req: any, res: any, next: any){
        var data = "";
        req.on('data', function(chunk: any){ data += chunk})
        req.on('end', function(){
            req.body = JSON.parse(data);;
            // req.jsonBody = JSON.parse(data);
            next();
        })
     }
    
    
    // bodyParser.json();

    router.get('/' ,(req, res) => {
        res.send('Hello World!');
    });

    router.post('/login', jsonParser, (req, res) => {
        console.log("post request incoming");
        console.log(req.body);
        res.end("yes");
        // var user_name = req.body.user;
        // var password = req.body.password;
        // console.log("User name = "+user_name+", password is "+password);
        // res.end("yes");
    });

    app.listen(port,() => {
        console.log("now listening on port " + port);
    })



}

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

    const menuItemOptions: Electron.MenuItemConstructorOptions = {}
    menuItemOptions.label = app.name;
    menuItemOptions.submenu = [
        {
        click: () => mainWindow.webContents.send('update-counter', 1),
        label: 'Increment',
        },
        {
        click: () => mainWindow.webContents.send('update-counter', -1),
        label: 'Decrement',
        }];
    const menuItem = new MenuItem(menuItemOptions);
    const defaultMenu = Menu.getApplicationMenu();
    defaultMenu?.insert(0, menuItem);
    Menu.setApplicationMenu(defaultMenu);


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
        console.log("working");
    })

    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });

    
    startListening();
    
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
