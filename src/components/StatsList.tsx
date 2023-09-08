import React, { useEffect, useState } from 'react'
import '../App.css'
import { PlayerStatsType } from '../util/type-util';
import { getSetting } from '../util/settings-util';
import { starColor, fkdrColor, wsColor } from '../util/color-utils'

type PropsType = {
    stats: PlayerStatsType[]
}

export default function StatsList(props: PropsType) {
    let stats: PlayerStatsType[] = props.stats

    let [sortField, setSortField] = useState('')
    // Load sort field on first render
    useEffect(() => {
        getSetting('sortField').then((val) => setSortField(val))
    })
    let list = []
    const compFn = (a: PlayerStatsType, b: PlayerStatsType) => {
        if (a[sortField] == undefined) {
            return -1
        }
        if (b[sortField] == undefined) {
            return 1
        }
        if (typeof a[sortField] == 'number' && typeof b[sortField] == 'number') {
            return b[sortField] - a[sortField]
        }
        if (typeof a[sortField] == 'string' && typeof b[sortField] == 'string') {
            return b[sortField].localeCompare(a[sortField])
        }
    }
    let sortedStats = [...stats].sort(compFn)
    for (const playerStats of sortedStats) {
        const ws_display = playerStats.ws == undefined ? 'HIDDEN' : playerStats.ws
        list.push(
            <div className='stats-entry'>
                <div style={{ textAlign: 'left', paddingLeft: '40px', width: '25%' }}>{playerStats.name}</div>
                <div style={{ textAlign: 'center', paddingLeft: '40px', width: '25%', color: starColor(playerStats.level) }}>{playerStats.level} stars</div>
                <div style={{ textAlign: 'center', paddingLeft: '40px', width: '25%', color: fkdrColor(playerStats.fkdr) }}>{playerStats.fkdr} fkdr </div>
                <div style={{ textAlign: 'right', paddingRight: '40px', width: '25%', color: wsColor(playerStats.ws) }}>{ws_display} ws </div>
            </div>
        )
    }

    return (
        <>
            <div> {list} </div>
        </>
    )
}
