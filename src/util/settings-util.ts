export async function getSetting(key: string) {
    return await window.api.invoke('get-setting', key)
}

export async function getSettings() {
    return await window.api.invoke('get-settings')
}

export async function setSetting(key: string, val) {
    return await window.api.send('set-setting', key, val)
}

export async function setSettings(settings) {
    return await window.api.send('set-settings', settings)
}
