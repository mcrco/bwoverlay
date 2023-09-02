import { ipcRenderer } from 'electron'

export function getSetting(key: string) {
    ipcRenderer.invoke('getSetting', key)
        .then((setting) => { return setting })
}

export function getSettings() {
    ipcRenderer.invoke('getSettings')
        .then((setting) => { return setting })
}
