const {app, BrowserWindow} = require('electron')

let win

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600})

    // load start page of the app
    win.loadURL(`file://${__dirname}/index.html`)

    // Open DevTools
    //win.webContents.openDevTools()

    win.on('close', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
