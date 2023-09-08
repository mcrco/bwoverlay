async function getUUID(username: string) {
    const data = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    const player = await data.json()
    return player.id
}

async function getStats(username: string, apiKey: string) {
    const url = `https://api.hypixel.net/player?uuid=${await getUUID(username)}&key=${apiKey}`

    const response = await fetch(url)
    if (response.status === 200) {
        return await response.json()
    } else {
        throw new Error(`Error fetching stats for ${username}: ${response.status}`)
    }
}

async function getBedwarsStats(username: string, apiKey: string) {
    const data = await getStats(username, apiKey)
    const stats = data.player.stats.Bedwars
    const ret = {
        name: username,
        fkdr: (stats.final_kills_bedwars / stats.final_deaths_bedwars).toFixed(2),
        ws: stats.winstreak,
        level: data.player.achievements.bedwars_level
    }
    return ret
}

export async function getAllStats(players: string[], apiKey: string) {
    const stats = await Promise.all(players.map(async (player) => await getBedwarsStats(player, apiKey)))
    console.log(stats)
    return stats
}
