const {CompanionShift} = require("../../db");

//* Funcion que setea la tabla CompanionShift con turnos cada 2 hs(interpuestas entre si), por 24 hs, 7 dias.
async function fillCompanionShifts() {
    const startHour = 0; // hora de inicio de los turnos
    const endHour = 23; // hora de fin de los turnos
    const timeZone = -3; // timezone para Argentina
    const shifts = [];
  
    for (let day = 0; day < 7; day++) {
      for (let hour = startHour; hour <= endHour; hour++) {
        let hs;
        if (hour === 23) {
          hs = '23:00-01:00';
        }else {
          const start = hour.toString().padStart(2, '0') + ':00';
          const end = (hour + 2).toString().padStart(2, '0') + ':00';
          hs = `${start}-${end}`;
        }
        const shift = {
          day: day,
          time: hs,
          timezone: timeZone,
        };
        shifts.push(shift);
      }
    }
  
    await CompanionShift.bulkCreate(shifts);
  }
  
  //* Ruta que trae la tabla CompanionShift con todos los turnos creados
  const getCompanionShift= async(req,res) => {
    try {
        await fillCompanionShifts()
        const dbCompanionShift = await CompanionShift.findAll()
        res.status(200).json(dbCompanionShift);
       
      } catch (error) {
        res.status(400).json({error: 'Error del servidor'})
      }
    };


  module.exports = {getCompanionShift, fillCompanionShifts};
