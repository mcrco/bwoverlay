import { PlayerStatsType } from "./type-util";

async function getStats(username: string, apiKey: string) {
    const url = `https://api.hypixel.net/player/?name=${username}&key=${apiKey}`

    const response = await fetch(url)
    if (response.status === 200) {
        return await response.json()
    } else {
        throw new Error(`Error fetching stats for ${username}: ${response.status}`)
    }
}

async function getBedwarsStats(username: string, apiKey: string) {
    const stats = await getStats(username, apiKey)
}

export async function getAllStats(players: string[], apiKey: string) {
    const linkStats = async (player: string) => {
        return { ...(await getStats(player, apiKey)) as Object, name: player }
    }
    return await Promise.all(players.map(linkStats))
}
