export default function TimezoneMiddleware(shifts, timezone) {
    return shifts.map((turno) => {
        let { supervisorCount, day, hasRules, maxSupervisors, shiftSupervisors, shiftId, time } = turno;
        const diferencia = (parseInt(timezone.split("C")[1].split(":")[0])) - (-3);
        let start = parseInt(time.split('-')[0].split(':')[0]);
        let end = parseInt(time.split('-')[1].split(':')[0]);
        if (diferencia !== 0) {//Si hay cambio de timezone
            if (end === 0) {
                end = 24;
            }
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
            if (start + (diferencia) < 0 || end + (diferencia) > 24) {//Si se sale del rango
                if (end + (diferencia) > 24) {//Si se sale para adelante
                    start = start - 24 + (diferencia);
                    end = end - 24 + (diferencia);
                    if ((day + 1) > 6) {
                        day = 0
                    } else {
                        day = day + 1
                    }
                } else {//Si se sale para atras
                    start = 24 + (start + (diferencia));
                    end = 24 + (end + (diferencia));
                    if ((day - 1) < 0) {
                        day = 6
                    } else {
                        day = day - 1
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
                if (end !== 24) {
                    end = `${end}:00`
                } else {
                    end = "00:00"
                }
            }
            time = `${start}-${end}`
            return {
                shiftId,
                day,
                time,
                shiftSupervisors,
                supervisorCount,
                maxSupervisors,
                hasRules,
                originalShift: turno
            }
        } else { //Si la diferencia entre timezones es 0, es decir, tiene la misma timezone
            return {
                shiftId,
                day,
                time,
                shiftSupervisors,
                supervisorCount,
                maxSupervisors,
                hasRules,
                originalShift: turno
            }
        }

    })
}