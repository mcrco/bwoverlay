export async function getSetting(key: string) {
    return await window.api.send('get-setting', key)
}

export async function getSettings() {
    return await window.api.send('get-settings')
}
