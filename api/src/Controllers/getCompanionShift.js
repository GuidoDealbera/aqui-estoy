const {CompanionShift} = require("../db");

//* Funcion que setea la tabla CompanionShift con turnos cada 2 hs(interpuestas entre si), por 24 hs, 7 dias.
async function fillCompanionShifts() {
    const startHour = 1; // hora de inicio de los turnos
    const endHour = 24; // hora de fin de los turnos
    const timeZone = -3; // timezone para Argentina
    const shifts = [];
  
    for (let day = 0; day < 7; day++) {
        let hs = '';
      for (let hour = startHour; hour <= endHour; hour++) {
        
        if(hour == 23){
            hs = '23 -1'
        }
        if(hour == 24){
            hs = '24 -2'
        } 
        if(hour <23){
            hs = hour.toString() + - + (hour+2).toString(); 
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