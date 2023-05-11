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

// export function groupConsecutiveTurns(turnos) {
//     console.log(turnos);
//     const result = turnos.map((arrayTurnos) => {
//         arrayTurnos.sort((a, b) => a.id - b.id);
//         const result = [];
//         let currentGroup = [];

//         for (let i = 0; i < arrayTurnos.length; i++) {
//             const turno = arrayTurnos[i];
//             const prevTurno = arrayTurnos[i - 1];

//             if (!prevTurno || prevTurno.id + 1 === turno.id) {
//                 currentGroup.push(turno);
//             } else {
//                 result.push(groupTurns(currentGroup));
//                 currentGroup = [turno];
//             }
//         }
//         if (currentGroup.length > 0) {
//             result.push(groupTurns(currentGroup));
//         }

//         return result;

//     })
//     return result;
// }

export function groupConsecutiveTurns(turnos) {
    const result = turnos.map((arrayTurnos) => {
        arrayTurnos.sort((a, b) => {
            const aTime = new Date(`1970-01-01T${a.time.split('-')[0]}:00Z`).getTime();
            const bTime = new Date(`1970-01-01T${b.time.split('-')[0]}:00Z`).getTime();
            return aTime - bTime;
        });

        const groups = [];
        let currentGroup = [];

        for (let i = 0; i < arrayTurnos.length; i++) {
            const turno = arrayTurnos[i];
            const prevTurno = arrayTurnos[i - 1];

            if (
                ((!prevTurno || prevTurno.time.split("-")[1] === turno.time.split("-")[0]) &&
                    (!prevTurno || prevTurno.day === turno.day)) || (!prevTurno || prevTurno.id + 1 === turno.id)
            ) {
                currentGroup.push(turno);
            } else {
                groups.push(groupTurns(currentGroup));
                currentGroup = [turno];
            }
        }

        if (currentGroup.length > 0) {
            groups.push(groupTurns(currentGroup));
        }

        return groups;
    });

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

export function sortCompanionTimezones(CompanionShifts, data) {
    const {name, lastName, email, phone, idPersona, user} = data;
    return CompanionShifts.map((turnos) => {
        let { id, day, time, timezone } = turnos;
        const userTimezone = parseInt(user.CityTimeZone.offSet.split("C")[1].split(":")[0]);
        const diferencia = userTimezone - (timezone)
        if (diferencia === 0) { //Si el usuario tiene la misma timezone que la default
            if (time === "23:00-01:00") {
                if (day === 0) {
                    return [{
                        idPersona,
                        id: -1,
                        name: `${name} ${lastName}`,
                        email,
                        phone,
                        day: 6,
                        time: "23:00-00:00",
                        timezone
                    }, {
                        idPersona,
                        id: -1,
                        name: `${name} ${lastName}`,
                        email,
                        phone,
                        day,
                        time: "00:00-01:00",
                        timezone
                    }]
                } else {
                    return ({
                        idPersona,
                        id: -1,
                        name: `${name} ${lastName}`,
                        email,
                        phone,
                        day: day - 1,
                        time: "23:00-00:00",
                        timezone
                    }, {
                        idPersona,
                        id: -1,
                        name: `${name} ${lastName}`,
                        email,
                        phone,
                        day,
                        time: "00:00-01:00",
                        timezone
                    })
                }
            }
            return {
                idPersona,
                id,
                name: `${name} ${lastName}`,
                email,
                phone,
                day,
                time,
                timezone
            }
        } else { //Si el usuario tiene un timezone diferente a la default
            let start = parseInt(time.split("-")[0].split(":")[0]);
            let end = parseInt(time.split("-")[1].split(":")[0]);
            if (end === 0) end = 24;
            if ((start + (diferencia) >= 0) && (end + (diferencia) <= 24)) { //No hay cambio de dia
                start = start + (diferencia);
                end = end + (diferencia);
                if ((start - 10) < 0) {
                    start = `0${start}:00`
                } else {
                    start = `${start}:00`
                }

                if ((end - 10) < 0) {
                    end = `0${end}:00`
                } else {
                    end = `${end}:00`
                }

                time = `${start}-${end}`;
            } else { //Hay cambio de día
                if (start + (diferencia) < 0) { //Si cambia el dia para atras
                    if ((start + (diferencia) === -1) && (end + (diferencia) === 1)) {
                        if (day === 0) {
                            return [{
                                idPersona,
                                id: -1,
                                name: `${name} ${lastName}`,
                                email,
                                phone,
                                day: 6,
                                time: "23:00-00:00",
                                timezone
                            }, {
                                idPersona,
                                id: -1,
                                name: `${name} ${lastName}`,
                                email,
                                phone,
                                day,
                                time: "00:00-01:00",
                                timezone
                            }]
                        } else {
                            return ({
                                idPersona,
                                id: -1,
                                name: `${name} ${lastName}`,
                                email,
                                phone,
                                day: day - 1,
                                time: "23:00-00:00",
                                timezone
                            }, {
                                idPersona,
                                id: -1,
                                name: `${name} ${lastName}`,
                                email,
                                phone,
                                day,
                                time: "00:00-01:00",
                                timezone
                            })
                        }
                    }
                    start = 24 + (diferencia);
                    end = 26 + (diferencia);
                    if ((start - 10) < 0) {
                        start = `0${start}:00`
                    } else {
                        start = `${start}:00`
                    }
                    if ((end - 10) < 0) {
                        end = `0${end}:00`
                    } else {
                        end = `${end}:00`
                    }

                    if (day - 1 === -1) {
                        day = 6
                    } else {
                        day = day - 1
                    }
                    time = `${start}-${end}`;
                } else { //Si cambia el dia para adelante
                    if ((start + (diferencia) === 23) && (end + (diferencia) === 25)) { //Si el turno desplazado cae entre 2 días.
                        if (day === 6) { //Si hay que desplazar para adelante y es domingo
                            return [{
                                idPersona,
                                id: -1,
                                name: `${name} ${lastName}`,
                                email,
                                phone,
                                day,
                                time: "23:00-00:00",
                                timezone
                            }, {
                                idPersona,
                                id: -1,
                                name: `${name} ${lastName}`,
                                email,
                                phone,
                                day: 0,
                                time: "00:00-01:00",
                                timezone
                            }]
                        } else { //Si hay que cambiar para adelante y no es domingo
                            return [{
                                idPersona,
                                id: -1,
                                name: `${name} ${lastName}`,
                                email,
                                phone,
                                day: day,
                                time: "23:00-00:00",
                                timezone
                            }, {
                                idPersona,
                                id: -1,
                                name: `${name} ${lastName}`,
                                email,
                                phone,
                                day: day + 1,
                                time: "00:00-01:00",
                                timezone
                            }]
                        }
                    }
                    //Si el turno desplazada no cae en la intersección de 2 días
                    start = -2 + (diferencia);
                    end = 0 + (diferencia);
                    //Formateo de hora (00:00hs) según 1 o 2 dígitos
                    if ((start - 10) < 0) {
                        start = `0${start}:00`
                    } else {
                        start = `${start}:00`
                    }
                    if ((end - 10) < 0) {
                        end = `0${end}:00`
                    } else {
                        end = `${end}:00`
                    }
                    //Para mantenerme en el rango de días 0-6
                    if (day + 1 === 7) {
                        day = 0
                    } else {
                        day = day + 1
                    }
                    time = `${start}-${end}`;
                }
            }
            //Retorna los nuevos turnos con sus nuevos horarios.
            return {
                idPersona,
                id,
                name: `${name} ${lastName}`,
                email,
                phone,
                day,
                time,
                timezone
            }
        }
    }).flat()
}

export function sortSupervisorTimezones(SupervisorShifts, data) {
    const {name, lastName, email, phone, idPersona, user} = data;
    return SupervisorShifts.map((turnos) => {
        let { id, day, time, timezone } = turnos;
        const userTimezone = parseInt(user.CityTimeZone.offSet.split("C")[1].split(":")[0]);
        const diferencia = userTimezone - (timezone)
        if (diferencia === 0) { //Si el usuario tiene la misma timezone que la default
            return {
                idPersona,
                id,
                name: `${name} ${lastName}`,
                email,
                phone,
                day,
                time,
                timezone
            }
        } else { //Si hay que hacer un cambio de timezone
            let start = parseInt(time.split("-")[0].split(":")[0]);
            let end = parseInt(time.split("-")[1].split(":")[0]);
            if (end === 0) end = 24;
            if ((start + (diferencia) >= 0) && (end + (diferencia) <= 24)) { //No hay cambio de dia
                start = start + (diferencia);
                end = end + (diferencia);
                if ((start - 10) < 0) {
                    start = `0${start}:00`
                } else {
                    start = `${start}:00`
                }

                if ((end - 10) < 0) {
                    end = `0${end}:00`
                } else {
                    end = `${end}:00`
                }
                time = `${start}-${end}`;
            } else { //Hay cambio de día
                if (start + (diferencia) < 0) { //Si cambia el dia para atras
                    start = 24 + (start + (diferencia));
                    end = 24 + (end+(diferencia));
                    if ((start - 10) < 0) {
                        start = `0${start}:00`
                    } else {
                        start = `${start}:00`
                    }
                    if ((end - 10) < 0) {
                        end = `0${end}:00`
                    } else {
                        end = `${end}:00`
                    }

                    if (day - 1 === -1) {
                        day = 6
                    } else {
                        day = day - 1
                    }
                    time = `${start}-${end}`;
                } else { //Si cambia el dia para adelante
                    start = -1 + (diferencia);
                    end = 0 + (diferencia);
                    if ((start - 10) < 0) {
                        start = `0${start}:00`
                    } else {
                        start = `${start}:00`
                    }
                    if ((end - 10) < 0) {
                        end = `0${end}:00`
                    } else {
                        end = `${end}:00`
                    }

                    if (day + 1 === 7) {
                        day = 0
                    } else {
                        day = day + 1
                    }
                    time = `${start}-${end}`;
                }
            }
            return {
                idPersona,
                id,
                name: `${name} ${lastName}`,
                email,
                phone,
                day,
                time,
                timezone
            }
        }
    })
}