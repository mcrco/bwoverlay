import fs from 'fs/promises'

export async function getPlayers(logFilePath: string) {
    const logContent = await fs.readFile(logFilePath, 'utf8')
    let lines = logContent.split('\n')

    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].includes('ONLINE: ')) {
            let players: string[] = lines[i].slice(lines[i].indexOf('ONLINE') + 8).split(', ')
            return players
        }
    }

    return []
}
