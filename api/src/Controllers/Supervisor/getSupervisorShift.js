const {SupervisorShift} = require("../../db");

async function fillSupervisorShifts() {
  const startHour = 0;
  const endHour = 23;
  const timeZone = -3;
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
  const supervisorShift = await SupervisorShift.findAll()
  if(!supervisorShift.length) await SupervisorShift.bulkCreate(shifts);
}
const getSupervisorShift= async(req,res) => {
    try {
        await fillSupervisorShifts()
        const dbSupervisorShift = await SupervisorShift.findAll()
       return res.status(200).json(dbSupervisorShift);
       
      } catch (error) {
      return  res.status(400).json({error: 'Error del servidor'})
      }
    };


  module.exports = {getSupervisorShift, fillSupervisorShifts};