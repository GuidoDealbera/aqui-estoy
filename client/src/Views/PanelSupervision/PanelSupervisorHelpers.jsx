export function groupTurns(turnos) {
    const firstTurno = turnos[0];
    const lastTurno = turnos[turnos.length - 1];
    const start = firstTurno.time.split('-')[0].split(":")[0]
    const end = lastTurno.time.split('-')[1].split(":")[0]

    return {
        idPersona: firstTurno.idPersona,
        name: firstTurno.name,
        email: firstTurno.email,
        phone: firstTurno.phone,
        day: firstTurno.day,
        time: `${start}-${end}`,
        timezone: firstTurno.timezone
    };
}

export function groupConsecutiveTurns(turnos) {
    const result = turnos.map((arrayTurnos) => {
        arrayTurnos.sort((a, b) => a.id - b.id);
        const result = [];
        let currentGroup = [];

        for (let i = 0; i < arrayTurnos.length; i++) {
            const turno = arrayTurnos[i];
            const prevTurno = arrayTurnos[i - 1];

            if (!prevTurno || prevTurno.id + 1 === turno.id) {
                currentGroup.push(turno);
            } else {
                result.push(groupTurns(currentGroup));
                currentGroup = [turno];
            }
        }
        if (currentGroup.length > 0) {
            result.push(groupTurns(currentGroup));
        }

        return result;

    })
    return result;
}

export function sortByDay(turnos) {
    const allTurnos = turnos.flat();
    const result = [[], [], [], [], [], [], []]
    allTurnos.forEach((turno) => {
        const { day } = turno;
        result[day].push(turno)
    })
    return result;
}

export function sortByTime(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].sort((a, b) => {
            const aTime = parseInt(a.time.split("-")[0]);
            const bTime = parseInt(b.time.split("-")[0]);
            return aTime - bTime;
        });
    }
    return arr;
}