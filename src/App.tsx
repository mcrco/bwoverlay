import { useEffect, useState } from 'react'
import chokidar from 'chokidar'

import './App.css'

import { getPlayers } from './util/log-processor'
import { getAllStats } from './util/hypixel'
import StatsList from './components/StatsList'
import Settings from './components/Settings'
import { getSetting } from './util/settings-util'

type PlayerStats = {
    name: string;
    level: number;
    fkdr: number;
    ws: number;
}

function App() {
    // 2 tabs/pages: one for stats list, one for settings
    const [tab, setTab] = useState<string>('stats')

    // Only setting we need is log path for starting log watcher
    const [logPath, setLogPath] = useState<string>('')

    // Set log path on first render
    useEffect(() => {
        getSetting('logPath').then((val: string) => {
            setLogPath(val)
        })
    }, [])

    // Stats of players in lobby
    const [stats, setStats] = useState([])

    // Update stats based on log file changes
    useEffect(() => {
        const logWatcher = chokidar.watch(logPath)
        logWatcher.on('change', () => {
            let players: string[] = getPlayers(logPath)
            setStats(getAllStats(players))
        })

        return (() => {logWatcher.close()})
    }, [logPath]) // Log watcher should restart when log path changes

    return (
        <>
            <div style={{ borderRadius: '13px', width: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px', margin: '10px', backgroundColor: 'rgba(50, 50, 50, 1)' }}>
                <div style={{ width: '50%', color: tab == 'stats' ? 'white' : 'grey', fontSize: '20px', textAlign: 'left', paddingLeft: '20px', cursor: 'pointer' }} onClick={() => { setTab('stats') }}> <b>Stats</b> </div>
                <div style={{ width: '50%', color: tab == 'settings' ? 'white' : 'grey', fontSize: '20px', textAlign: 'right', paddingRight: '20px', cursor: 'pointer' }} onClick={() => { setTab('settings') }}> <b>Settings</b> </div>
            </div>
            {tab == 'stats' ? <StatsList data={stats} /> : <Settings setLogPath={setLogPath} />}
        </>
    )
}

export default App
