//* main.js

const { app, BrowserWindow, dialog, ipcMain} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");

var mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 960,
    height: 600,
    maximizable: false,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    }
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "/../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    ipcMain.on("makeMessage", (event, args) =>{
      dialog.showMessageBox(mainWindow, {
        title: 'Cipher AES Alert!',
        message: args,
        type: 'warning',
        buttons: ['Okey']
      })
    })

    ipcMain.handle("getImageFile", async (event, args) => {
      const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Images", extensions: ["bmp"] }]
      });

      if(result.canceled){
        return null
      }else{
        const files = result.filePaths;

        const base64 = fs.readFileSync(files[0]).toString('base64');
        const obj ={name: files[0], data: base64};
        return obj;  
      }
    })

    ipcMain.on("writeImageFile", (event, args) =>{
      console.log(args.name);
      var bitmap = Buffer.from(args.data,'base64');
      fs.writeFileSync(args.name,bitmap);
    })


});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
} 

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.