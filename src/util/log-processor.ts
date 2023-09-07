export function getPlayers(logFilePath: string) {
    let lines: string[] = []
    const logFile = new File(logFilePath)
    const reader = new FileReader()
    reader.onload = () => {
        const contents = reader.result as string
        lines = contents.split('\n')
    }
    reader.readAsText(logFile)

    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].includes('ONLINE: ')) {
            let players: string[] = lines[i].slice(8).split(', ')
            console.log(players)
            return players
        }
    }

    return []
}
