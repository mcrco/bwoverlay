import { ipcRenderer } from 'electron'

export function getSetting(key: string) {
    let setting;
    ipcRenderer.invoke('getSetting', key)
        .then((val) => {setting = val})
    return setting
}

export function getSettings() {
    let settings;
    ipcRenderer.invoke('getSettings')
        .then((val) => {settings = val})
    return settings
}
