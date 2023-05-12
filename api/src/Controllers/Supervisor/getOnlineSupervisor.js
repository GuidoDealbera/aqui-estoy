const { Supervisor, SupervisorShift } = require("../../db");
const { Op } = require('sequelize');
const getTimeDifference = require("../TimeZone/getTimeDifference")
const getOnlineSupervisor = async (req, res) => {
  try {
    const { CityTimeZone } = req.body;
    const { zoneName } = CityTimeZone;
    const actualTime = getTimeDifference(zoneName)
    
    const startTime = actualTime.time.clone().format("HH:mm"); // Obtener la hora actual en formato "hh:mm"
    const endTime = actualTime.time.clone().add(1, "hour").format("HH:mm"); // Agregar 1 hora y obtener el formato "hh:mm" para el segundo horario

    const timeRange = `${startTime}-${endTime}`;
      const activeSupervisor = await SupervisorShift.findOne({
            where: {
              day: actualTime.actualDay,
              time: {
                [Op.lte]: timeRange,
              },
            },
            include: [{
             model: Supervisor,
             attributes: ['name', 'lastName', 'phone', 'profilePhoto'],
             through: { attributes: [] },
      }],
      //Los ordeno en descendente para que te devuelva el turno actual correctamente
      order: [
        ['time', 'DESC']
      ],
      });

    return res.json(activeSupervisor)
  } catch (error) {
    res.status(500).json("Get Online Supervisor fallo")
  }
};
module.exports = getOnlineSupervisor;
