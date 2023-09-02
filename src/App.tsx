import { useState } from 'react'
// import chokidar from 'chokidar'
import settings from 'electron-settings'

import './App.css'

import { getPlayers } from './util/log-processor'
import { getAllStats } from './util/hypixel'
import StatsList from './components/StatsList'
import Settings from './components/Settings'
import { getSetting, getSettings } from './util/settings-util'

type PlayerStats = {
    name: string;
    level: number;
    fkdr: number;
    ws: number;
}

type SettingsType = {
    apiKeys: string[],
    logPath: string,
    sortField: string
}

function App() {
    const [tab, setTab] = useState('stats')

    console.log('hi')

    const [config, setConfig] = useState<SettingsType>(getSettings() as SettingsType)
    // const [apiKeys, setApiKeys] = useState(settings.getSync('apiKeys'))
    // const [logPath, setLogPath] = useState<string>(settings.getSync('logPath') as string)
    // const [sortField, setSortField] = useState(settings.getSync(''))
    // const [stats, setStats] = useState([])

    // let apiKeys = config.apiKeys
    // let logPath = config.logPath
    // let sortField = config.sortField

    // const logWatcher = chokidar.watch(logPath)
    // logWatcher.on('change', () => {
    //     let players: string[] = getPlayers(logPath)
    //     setStats(getAllStats(players))
    // })

    return (
        <>
            <div style={{ borderRadius: '13px', width: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px', margin: '10px', backgroundColor: 'rgba(50, 50, 50, 1)' }}>
                <div style={{ width: '50%', color: tab == 'stats' ? 'white' : 'grey', fontSize: '20px', textAlign: 'left', paddingLeft: '20px', cursor: 'pointer' }} onClick={() => { setTab('stats') }}> <b>Stats</b> </div>
                <div style={{ width: '50%', color: tab == 'settings' ? 'white' : 'grey', fontSize: '20px', textAlign: 'right', paddingRight: '20px', cursor: 'pointer' }} onClick={() => { setTab('settings') }}> <b>Settings</b> </div>
            </div>
            {tab == 'stats' ? <StatsList data={stats} /> : <Settings setConfig={setConfig} />}
        </>
    )
}

export default App
