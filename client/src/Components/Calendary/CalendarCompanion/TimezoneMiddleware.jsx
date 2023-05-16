export default function TimezoneMiddleware(shifts, timezone) {
    return shifts.map((turno) => {
        let { companionCount, day, hasRules, maxCompanions, shiftCompanions, shiftId, time } = turno;
        const diferencia = (parseInt(timezone.split("C")[1].split(":")[0])) - (-3);
        let start = parseInt(time.split('-')[0].split(':')[0]);
        let end = parseInt(time.split('-')[1].split(':')[0]);
        if (diferencia !== 0) {//Si hay cambio de timezone
            // ------------------- CAMBIO DEL ID -------------------
            if ((shiftId + (diferencia) > 168) || (shiftId + (diferencia) < 1)) {//Si se sale del rango
                if (shiftId + (diferencia) > 168) {//Si se sale para arriba.
                    shiftId = (shiftId + (diferencia)) - 168;
                } else {//Si se sale para abajo.
                    shiftId = 168 + (shiftId + (diferencia));
                }
            } else {//Si no se sale del rango
                shiftId = shiftId + (diferencia);
            }
            // ------------------- CAMBIO DEL TIME ------------------
            if (start === 23 && end === 1) {//Si es el caso especial del turno 23:00-01:00
                if (diferencia > 0) {//Si la diferencia es positiva
                    start = -1 + (diferencia)
                    end = 1 + (diferencia)
                    if (day + 1 > 6) {
                        day = 0;
                    } else {
                        day = day + 1;
                    }
                } else {//Si la diferencia es negativa
                    start = 23 + (diferencia)
                    end = 25 + (diferencia)
                }
            } else if (start + (diferencia) < 0 || end + (diferencia) > 24) {//Si se sale del rango
                if (end + (diferencia) > 24) {//Si se sale para adelante
                    if ((start - 24 + (diferencia) === -1) && (end - 24 + (diferencia) === 1)) {
                        start = 23;
                        end = 1;
                    } else {
                        start = start - 24 + (diferencia);
                        end = end - 24 + (diferencia);
                        if ((day + 1) > 6) {
                            day = 0
                        } else {
                            day = day + 1
                        }
                    }

                } else {//Si se sale para atras
                    if ((start + (diferencia) + 24 === 23) && (end + (diferencia) + 24 === 25)) {//Si es el primero y solo baja 1 hora
                        start = 23;
                        end = 1;
                        if (day - 1 < 0) {
                            day = 6
                        } else {
                            day = day - 1
                        }
                    } else {
                        start = start + (diferencia) + 24;
                        end = end + (diferencia) + 24;
                        if ((day - 1) < 0) {
                            day = 6
                        } else {
                            day = day - 1
                        }
                    }
                }
            } else {//Si no se sale del rango
                start = start + (diferencia);
                end = end + (diferencia);
            }
            if (start < 10) {
                start = `0${start}:00`
            } else {
                start = `${start}:00`
            }
            if (end < 10) {
                end = `0${end}:00`
            } else {
                end = `${end}:00`
            }
            time = `${start}-${end}`
            return {
                shiftId,
                day,
                time,
                shiftCompanions,
                companionCount,
                maxCompanions,
                hasRules,
                originalShift: turno
            }
        } else { //Si la diferencia entre timezones es 0, es decir, tiene la misma timezone
            return {
                shiftId,
                day,
                time,
                shiftCompanions,
                companionCount,
                maxCompanions,
                hasRules,
                originalShift: turno
            }
        }

    })
}