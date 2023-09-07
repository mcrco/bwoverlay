import { useEffect, useState } from 'react'

import './App.css'

import StatsList from './components/StatsList'
import Settings from './components/Settings'

function App() {
    // 2 tabs/pages: one for stats list, one for settings
    const [tab, setTab] = useState<string>('stats')

    return (
        <>
            <div style={{ borderRadius: '13px', width: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px', margin: '10px', backgroundColor: 'rgba(50, 50, 50, 1)' }}>
                <div style={{ width: '50%', color: tab == 'stats' ? 'white' : 'grey', fontSize: '20px', textAlign: 'left', paddingLeft: '20px', cursor: 'pointer' }} onClick={() => { setTab('stats') }}> <b>Stats</b> </div>
                <div style={{ width: '50%', color: tab == 'settings' ? 'white' : 'grey', fontSize: '20px', textAlign: 'right', paddingRight: '20px', cursor: 'pointer' }} onClick={() => { setTab('settings') }}> <b>Settings</b> </div>
            </div>
            {tab == 'stats' ? <StatsList /> : <Settings />}
        </>
    )
}

export default App
