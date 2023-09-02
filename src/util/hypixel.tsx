export function getStats(username: string) {
    const url = `https://api.hypixel.net/player/stats/bedwars?player=${username}`

    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error(`Error fetching stats for ${username}: ${response.status}`)
            }
        });
}

export function getAllStats(players: string[]) {
    const linkStats = (player: string) => {
        return { player: getStats(player) }
    }
    return players.map(linkStats)
}
