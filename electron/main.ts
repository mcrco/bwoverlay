import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import settings from 'electron-settings'
import chokidar, { FSWatcher } from 'chokidar'
import { getPlayers } from '../src/util/log-processor'
import { getAllStats } from '../src/util/hypixel'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, 'index.html'))
    }
}

function startLogWatcher() {
    // Create log file watcher
    let logWatcher = chokidar.watch(settings.getSync('logPath') as string)
    console.log('Log watcher started.')
    // Keep track of player array
    let prevPlayers: string[] = []
    // Keep track of how many times api calls have been made
    let apiCount = 0

    // Use IPC to send player list updates to renderer
    logWatcher.on('change', async () => {
        console.log('Log file modified.')
        const players = await getPlayers(await settings.get('logPath') as string)
        const apiKeys = await settings.get('apiKeys') as string[]
        const stats = await getAllStats(players, apiKeys[apiCount % apiKeys.length])
        const playersChanged = !(prevPlayers.every(x => players.includes(x)) &&
            players.every(x => prevPlayers.includes(x)))
        if (playersChanged) {
            prevPlayers = players
            win?.webContents.send('stats-update', stats)
        }
    })

    // Restart log watcher when user updates log path
    function restartLogWatcher(logPath: string) {
        console.log('Log file watcher restarted.')
        logWatcher.unwatch(Object.keys(logWatcher.getWatched()))
        logWatcher.add(logPath)
    }
    ipcMain.on('log-path-update', (event, path) => {
        console.log('Log file path updated.')
        restartLogWatcher(path)
    })
}

app.on('window-all-closed', () => {
    win = null
})

app.whenReady().then(() => {
    createWindow()
    startLogWatcher()
})

// Make sure settings aren't null
if (!settings.hasSync('apiKeys')) {
    settings.setSync('apiKeys', [])
}
if (!settings.hasSync('logPath')) {
    settings.setSync('logPath', '')
}
if (!settings.hasSync('sortField')) {
    settings.setSync('sortField', 'ws')
}

// Allow renderer processes to access settings
ipcMain.handle('get-setting', (event, key) => { return settings.getSync(key) })
ipcMain.handle('get-settings', (event) => { return settings.getSync() })
ipcMain.on('set-setting', (event, key, val) => { settings.setSync(key, val) })
ipcMain.on('set-settings', (event, val) => { settings.setSync(val) })


