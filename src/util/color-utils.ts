export const starColor = (level: number) => {
    switch (true) {
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

export const fkdrColor = (fkdr: number) => {
    switch (true) {
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

export const wsColor = (ws: number) => {
    switch (true) {
        case ws == undefined:
            return 'white'
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

