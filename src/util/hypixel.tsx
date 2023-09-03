export function getStats(username: string) {
    const url = `https://api.hypixel.net/player/stats/bedwars?player=${username}`

    let ret;
    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                ret = response.json()
            } else {
                throw new Error(`Error fetching stats for ${username}: ${response.status}`)
            }
        })
        .catch((response) => {
            console.log(response)
        })

    return ret;
}

export function getAllStats(players: string[]) {
    const linkStats = (player: string) => {
        return { player: getStats(player) }
    }
    return players.map(linkStats)
}
