import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ipcMain } from 'electron'
import settings from 'electron-settings'
import './index.css'

if (!settings.hasSync('apiKeys')) {
    settings.setSync('apiKeys', [])
}
if (!settings.hasSync('logPath')) {
    settings.setSync('logPath', '')
}
if (!settings.hasSync('sortField')) {
    settings.setSync('sortField', '')
}

ipcMain.handle('getSetting', (event, key) => {
    return settings.getSync(key);
});
ipcMain.handle('getSettings', (event) => {
    return settings.getSync();
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
