const { Supervisor, SupervisorShift } = require("../../db");
const { Op } = require('sequelize');
const getTimeDifference = require("../TimeZone/getTimeDifference")
const getOnlineSupervisor = async (req, res) => {
  try {
    const { CityTimeZone } = req.body;
    const { zoneName } = CityTimeZone;
    const actualTime = getTimeDifference(zoneName)
    const startTime = actualTime.time.clone().format("HH:mm");
    const endTime = actualTime.time.clone().add(1, "hour").format("HH:mm"); 

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
      order: [
        ['time', 'DESC']
      ],
      });

    return res.json(activeSupervisor)
  } catch (error) {
   return res.status(500).json("Get Online Supervisor fallo")
  }
};
module.exports = getOnlineSupervisor;
