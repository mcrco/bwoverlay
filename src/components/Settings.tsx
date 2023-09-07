import { useEffect } from "react";
import { getSetting, getSettings } from "../util/settings-util"

function Settings(props) {
    let apiKeys: string[];
    let logPath: string;
    let sortField: string;

    useEffect(() => {
        ipcRenderer.invoke('get-settings').then((settings) => {
            apiKeys = settings.apiKeys
            logPath = settings.logPath
            sortField = settings.sortField
        })
    }, [])

    const getApiKeyInputs = () => {
        let keys = []
        // for (let i = 0; i < apiKeys.length; i++)
    }

    const saveChanges = () => {
        // settings.setSync(
        //     {
        //         apiKeys: apiKeys,
        //         logPath: logPath,
        //         sortField: sortField
        //     }
        // )
        props.setLogPath(logPath)
    }

    let apiKeyFields = []
    for (let i = 0; i < apiKeys.length; i++) {
        apiKeyFields.push(
            <input type='text' id={'apiKey' + i} name={'apiKey' + i}
                value={apiKeys[i]} />
        )
    }

    return (
        <>
            <div>
                <label htmlFor='apiKeys'> API Keys </label>
                {apiKeyFields}

                <label htmlFor='logPath'> Log File Location </label>
                <input type='text' id='logPath' name='logloc' placeholder='Separate keys with a comma (no space)'
                    value={logPath} onChange={(e) => { logPath = e.target.value }} />

                <label htmlFor='sortField'> Sort By </label>
                <select id='sortField' name='logloc' placeholder='Separate keys with a comma (no space)' value={sortField}
                    onChange={(e) => { sortField = e.target.value }}>
                    <option value='ws'> Winstreak </option>
                    <option value='fkdr'> FKDR </option>
                    <option value='level'> Level </option>
                </select>

                <button onClick={saveChanges}> Save Changes </button>
            </div>
        </>
    )
}

export default Settings
