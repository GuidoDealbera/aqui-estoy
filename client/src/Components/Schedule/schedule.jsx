import  { useState } from 'react';
import DatePicker from 'react-modern-calendar-datepicker';
import moment from 'moment';

export default function TurnosPorDia() {
  const [selectedDay] = useState(null);
  const [turnos, setTurnos] = useState([]);

  function handleDateChange(day) {
    const diaDeLaSemana = moment({ year: day.year, month: day.month - 1, day: day.day }).day();
    // Aquí puedes hacer una solicitud a tu servidor para obtener los turnos correspondientes para el día de la semana seleccionado
    // La función getTurnosParaDiaDeLaSemana() es un ejemplo, debes implementar la función adecuada para tu caso de uso.
    const turnosParaDiaDeLaSemana = getTurnosParaDiaDeLaSemana(diaDeLaSemana);
    setTurnos(turnosParaDiaDeLaSemana);
  }

  return (
    <div>
      <h1>Seleccionar fecha para ver los turnos:</h1>
      <DatePicker
  value={selectedDay}
  onChange={handleDateChange}
  shouldHighlightWeekends
/>
      <h2>Turnos para el {selectedDay ? `${selectedDay.year}/${selectedDay.month}/${selectedDay.day}` : 'día seleccionado'}:</h2>
      <table>
  <thead>
    <tr>
      <th>Hora</th>
      <th>Cantidad de integrantes</th>
      <th>Zona horaria</th>
      <th>ID</th>
    </tr>
  </thead>
  <tbody>
    {turnos.map((turno) => (
      <tr key={turno.id}>
        <td>{turno.hora}</td>
        <td>{turno.cantidadIntegrantes}</td>
        <td>{turno.zonaHoraria}</td>
        <td>{turno.id}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}
function getTurnosParaDiaDeLaSemana(diaDeLaSemana) {
  const turnos = [
    { hora: '08:00', cantidadIntegrantes: 2, zonaHoraria: 'UTC-3', id: 1 },
    { hora: '09:00', cantidadIntegrantes: 1, zonaHoraria: 'UTC-3', id: 2 },
    { hora: '10:00', cantidadIntegrantes: 3, zonaHoraria: 'UTC-3', id: 3 },
    { hora: '11:00', cantidadIntegrantes: 4, zonaHoraria: 'UTC-3', id: 4 },
    { hora: '12:00', cantidadIntegrantes: 2, zonaHoraria: 'UTC-3', id: 5 },
    { hora: '13:00', cantidadIntegrantes: 1, zonaHoraria: 'UTC-3', id: 6 },
    { hora: '14:00', cantidadIntegrantes: 3, zonaHoraria: 'UTC-3', id: 7 },
    { hora: '15:00', cantidadIntegrantes: 4, zonaHoraria: 'UTC-3', id: 8 },
    { hora: '16:00', cantidadIntegrantes: 2, zonaHoraria: 'UTC-3', id: 9 },
    { hora: '17:00', cantidadIntegrantes: 1, zonaHoraria: 'UTC-3', id: 10 },
    { hora: '18:00', cantidadIntegrantes: 3, zonaHoraria: 'UTC-3', id: 11 },
    { hora: '19:00', cantidadIntegrantes: 4, zonaHoraria: 'UTC-3', id: 12 },
  ];
  const turnosParaDiaDeLaSemana = turnos.filter((turno) => {
    const hora = parseInt(turno.hora.slice(0, 2));
    const horaFinal = hora + 1;
    const diaDeLaSemanaDeTurno = moment().day('Sunday').hour(hora).minute(0).second(0).millisecond(0).day(diaDeLaSemana);
    return moment().day(diaDeLaSemana).hour(hora).minute(0).second(0).millisecond(0).isSameOrBefore(moment()) || moment().day(diaDeLaSemana).hour(hora).minute(0).second(0).millisecond(0).isSameOrAfter(moment()) && moment().day(diaDeLaSemanaDeTurno).hour(horaFinal).minute(0).second(0).millisecond(0).isAfter(moment());
  });
  return turnosParaDiaDeLaSemana;
}
