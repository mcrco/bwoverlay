import { useEffect, useState } from "react";
import { getSetting, getSettings, setSettings } from "../util/settings-util"

type SettingsType = {
    apiKeys: string[];
    logPath: string;
    sortField: string;
}

function Settings() {
    const [settingsState, setSettingsState] = useState<SettingsType>({ apiKeys: [], logPath: '', sortField: '' })

    let apiKeys = settingsState.apiKeys
    let logPath = settingsState.logPath
    let sortField = settingsState.sortField

    useEffect(() => {
        getSettings().then((settings) => {
            setSettingsState(settings)
        })
    }, [])

    const updateSettings = (updates) => {
        setSettingsState({
            ...settingsState,
            ...updates
        })
    }

    let apiKeyFields = []
    for (let i = 0; i < apiKeys.length; i++) {
        const changeKey = (newKey: string) => {
            let apiKeysCopy = [...apiKeys]
            apiKeysCopy[i] = newKey
            return apiKeysCopy
        }

        const deleteKey = () => {
            return apiKeys.splice(0, i).concat(apiKeys.splice(i + 1))
        }

        apiKeyFields.push(
            <>
                <input
                    type='text' id={'apiKey' + i} name={'apiKey' + i} key={'apiKey' + i}
                    value={apiKeys[i]}
                    onChange={(e) => updateSettings({ apiKeys: changeKey(e.target.value) })}
                    style={{ width: '40vh', marginRight: '1vh' }}
                />
                <button onClick={() => updateSettings({ apiKeys: deleteKey() })}
                    style={{ fontSize: '14px', padding: '12px', paddingRight: '20px', paddingLeft: '20px', border: 'none' }}>
                    -
                </button>

                <div className='small-spacer' />
            </>
        )
    }

    const saveChanges = () => {
        getSetting('logPath').then((storedLogPath) => {
            if (storedLogPath != settingsState.logPath) {
                window.api.send('log-path-update', settingsState.logPath)
            }
        })
        setSettings(settingsState)
    }

    return (
        <>
            <div>
                <div>
                    <label htmlFor='apiKeys' style={{ fontSize: '18px' }}>
                        <b> API Keys </b>
                    </label>
                    <div className='small-spacer' />
                    {apiKeyFields}
                    <button
                        onClick={() => updateSettings({ apiKeys: apiKeys.concat(['']) })}>
                        +
                    </button>
                </div>

                <div className='med-spacer' />

                <div>
                    <label htmlFor='logPath' style={{ fontSize: '18px' }}>
                        <b>Log File Location</b>
                    </label>
                    <div className='small-spacer' />
                    <input
                        type='text' id='logPath'
                        placeholder='Separate keys with a comma (no space)'
                        value={logPath}
                        onChange={(e) => updateSettings({ logPath: e.target.value })}
                        style={{ width: '40vh' }}
                    />
                </div>

                <div className='med-spacer' />

                <div>
                    <label htmlFor='sortField' style={{ fontSize: '18px' }}>
                        <b>Sort By</b>
                    </label>
                    <div className='small-spacer' />
                    <select
                        id='sortField'
                        placeholder='Separate keys with a comma (no space)'
                        value={sortField}
                        onChange={(e) => updateSettings({ sortField: e.target.value })}>
                        <option value='ws'> Winstreak </option>
                        <option value='fkdr'> FKDR </option>
                        <option value='level'> Level </option>
                    </select>
                </div>

                <div className='med-spacer' />

                <button onClick={saveChanges}> Save Changes </button>
            </div>
        </>
    )
}

export default Settings
