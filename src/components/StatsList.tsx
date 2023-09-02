import React from 'react'
import '../App.css'

type Player = {
    name: string;
    level: number;
    fkdr: number;
    ws: number;
}

export default function StatsList(props: {data: Player[]}) {
    const playerData = props.data
    const entryStyle: React.CSSProperties = {
        borderRadius: '13px',
        backgroundColor: 'rgba(50, 50, 50, 1)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px',
        width: '1000px',
        margin: '10px'
    }

    const starColor = (level: number) => {
        switch(true) {
            case level >= 1000:
                return 'black'
            case level >= 900:
                return 'purple'
            case level >= 800:
                return 'blue'
            case level >= 700:
                return 'magenta'
            case level >= 600:
                return 'red'
            case level >= 500:
                return 'cyan'
            case level >= 400:
                return 'green'
            case level >= 300:
                return 'aqua'
            case level >= 200:
                return 'yellow'
            case level >= 100:
                return 'white'
            default:
                return 'grey'
        }
    }

    const fkdrColor = (fkdr: number) => {
        switch(true) {
            case fkdr >= 50:
                return 'purple'
            case fkdr >= 25:
                return 'red'
            case fkdr >= 15:
                return 'orange'
            case fkdr >= 10:
                return 'yellow'
            case fkdr >= 5:
                return 'LightYellow'
            default: 
                return 'grey'
        }
    }

    const wsColor = (ws: number) => {
        switch(true) {
            case ws >= 200:
                return 'purple'
            case ws >= 100:
                return 'red'
            case ws >= 50:
                return 'orange'
            case ws >= 10:
                return 'yellow'
            case ws >= 3:
                return 'LightYellow'
            default: 
                return 'grey'
        }
    }

    let list = []
    console.log(playerData)
    for (const player of playerData) {
        list.push(
            <div style={entryStyle}>
                <div style={{textAlign: 'left', paddingLeft: '40px', width: '25%'}}>{player.name}</div> 
                <div style={{textAlign: 'center', paddingLeft: '40px', width: '25%', color: starColor(player.level)}}>{player.level} stars</div> 
                <div style={{textAlign: 'center', paddingLeft: '40px', width: '25%', color: fkdrColor(player.fkdr)}}>{player.fkdr} fkdr </div> 
                <div style={{textAlign: 'right', paddingRight: '40px', width: '25%', color: wsColor(player.ws)}}>{player.ws} ws </div>
            </div>
        )
    }
        
    return (
        <>
            <div> {list} </div>
        </>
    )
}
