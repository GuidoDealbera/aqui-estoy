export default function TimezoneMiddlewareSettings({ startTime, endTime, max }, timezone, mode) {
    let start = parseInt(startTime.split(':')[0]);
    let end = parseInt(endTime.split(':')[0]);
    let diferencia = (parseInt(timezone.split("C")[1].split(":")[0])) - (-3);
    diferencia = -(diferencia)
    if (mode === 'Supervisor') {
        if (start + (diferencia) < 0 || end + (diferencia) > 24) {//Si se sale del rango
            if (end + (diferencia) > 24) {//Si se sale para adelante
                start = start - 24 + (diferencia);
                end = end - 24 + (diferencia);
            } else {//Si se sale para atras
                start = 24 + (start + (diferencia));
                end = 24 + (end + (diferencia));
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
    } else { //Si es Companion
        if (start === 23 && end === 1) {//Si es el caso especial del turno 23:00-01:00
            if (diferencia > 0) {//Si la diferencia es positiva
                start = -1 + (diferencia)
                end = 1 + (diferencia)
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
                }

            } else {//Si se sale para atras
                if ((start + (diferencia) + 24 === 23) && (end + (diferencia) + 24 === 25)) {//Si es el primero y solo baja 1 hora
                    start = 23;
                    end = 1;
                } else {
                    start = start + (diferencia) + 24;
                    end = end + (diferencia) + 24;
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
    }

    max = parseInt(max)
    if (end === "00:00") {
        end = "24:00";
    }
    return { startTime: start, endTime: end, max }
}