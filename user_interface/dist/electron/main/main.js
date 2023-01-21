"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/electron/main/main.ts
const path_1 = require("path");
const electron_1 = require("electron");
const express_1 = __importDefault(require("express"));
const types_ = [
    {
        "type": "request",
        "fields": [
            "request_text",
            "choices",
            "default_choice",
            "time_remaining"
        ]
    },
    {
        "type": "user_response",
        "fields": [
            "decision"
        ]
    },
    {
        "type": "clear",
        "fields": []
    },
    {
        "type": "time_exceeded",
        "fields": []
    },
    {
        "type": "invalid_action",
        "fields": [
            "text"
        ]
    }
];
function checkIncomingJson(incoming) {
    var nValid = 0;
    for (const entry of types_) {
        if (incoming.type == entry.type) {
            var shouldBreak = false;
            for (const field of entry.fields) {
                if (incoming[field] === undefined)
                    shouldBreak = true;
            }
            if (!shouldBreak)
                nValid++;
        }
    }
    return nValid > 0;
}
function startListening(mainWindow) {
    const port = 40002;
    const router = express_1.default.Router();
    const app = (0, express_1.default)();
    // add router in express app
    app.use("/", router);
    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(bodyParser.json());
    var jsonParser = function (req, res, next) {
        var data = "";
        req.on('data', function (chunk) { data += chunk; });
        req.on('end', function () {
            req.body = JSON.parse(data);
            ;
            // req.jsonBody = JSON.parse(data);
            next();
        });
    };
    // bodyParser.json();
    router.get('/', (req, res) => {
        res.send('Hello World!');
    });
    router.post('/login', jsonParser, (req, res) => {
        console.log("post request incoming");
        console.log(req.body);
        const request = req.body;
        const response = checkIncomingJson(request);
        if (!response) {
            res.end("no");
        }
        else {
            const parsedRequest = {
                type: request.type,
                choices: request.choices !== undefined ? request.choices : [],
                time_remaining: request.time_remaining !== undefined ? request.time_remaining : 0,
                request_text: request.request_text !== undefined ? request.request_text : "",
                decision: request.decision !== undefined ? request.decision : -1,
                default_choice: request.default_choice !== undefined ? request.default_choice : 0,
                text: request.text !== undefined ? request.text : ""
            };
            mainWindow.webContents.send('fresh-event', parsedRequest);
            res.end("yes");
        }
        // var user_name = req.body.user;
        // var password = req.body.password;
        // console.log("User name = "+user_name+", password is "+password);
        // res.end("yes");
    });
    app.listen(port, () => {
        console.log("now listening on port " + port);
    });
}
// https://www.electronjs.org/de/docs/latest/tutorial/ipc
const isDev = process.env.npm_lifecycle_event === "app:dev" ? true : false;
function createWindow() {
    // Create the browser window.
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: (0, path_1.join)(__dirname, '../preload/preload.js'),
        },
    });
    const menuItemOptions = {};
    menuItemOptions.label = electron_1.app.name;
    menuItemOptions.submenu = [
        {
            click: () => mainWindow.webContents.send('update-counter', 1),
            label: 'Increment',
        },
        {
            click: () => mainWindow.webContents.send('update-counter', -1),
            label: 'Decrement',
        }
    ];
    const menuItem = new electron_1.MenuItem(menuItemOptions);
    const defaultMenu = electron_1.Menu.getApplicationMenu();
    defaultMenu?.insert(0, menuItem);
    electron_1.Menu.setApplicationMenu(defaultMenu);
    // and load the index.html of the app.
    mainWindow.loadURL(isDev ?
        'http://localhost:5173' :
        (0, path_1.join)(__dirname, '../../index.html'));
    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    startListening(mainWindow);
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
    electron_1.ipcMain.on('counter-value', (_event, value) => {
        console.log(value);
        console.log("working");
    });
    createWindow();
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map