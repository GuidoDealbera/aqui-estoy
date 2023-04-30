const {SupervisorShift} = require("../../db");

//* Funcion que setea la tabla SuperiorShift con turnos cada 1 hs, por 24 hs, 7 dias.
async function fillSupervisorShifts() {
  const startHour = 0; // hora de inicio de los turnos
  const endHour = 23; // hora de fin de los turnos
  const timeZone = -3; // timezone para Argentina
  const shifts = [];

  for (let day = 0; day < 7; day++) {
    let hs = '';
    for (let hour = startHour; hour <= endHour; hour++) {
      if (hour === 23) {
        hs = '23:00-00:00';
      } else {
        const startHourStr = hour.toString().padStart(2, '0');
        const endHourStr = (hour + 1).toString().padStart(2, '0');
        hs = `${startHourStr}:00-${endHourStr}:00`;
      }
      const shift = {
        day: day,
        time: hs,
        timezone: timeZone,
      };
      shifts.push(shift);
    }
  }

  await SupervisorShift.bulkCreate(shifts);
}

  //* Ruta que trae la tabla SuperiorShift con todos los turnos creados
  const getSupervisorShift= async(req,res) => {
    try {
        await fillSupervisorShifts()
        const dbSupervisorShift = await SupervisorShift.findAll()
        res.status(200).json(dbSupervisorShift);
       
      } catch (error) {
        res.status(400).json({error: 'Error del servidor'})
      }
    };


  module.exports = {getSupervisorShift, fillSupervisorShifts};