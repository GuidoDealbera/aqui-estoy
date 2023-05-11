const { Supervisor, SupervisorShift } = require("../../db");
const moment = require("moment-timezone");
const { Op } = require('sequelize');

const getOnlineSupervisor = async (req, res) => {
  try {
    const { CityTimeZone } = req.body;
    const { zoneName } = CityTimeZone;

    const userDateTime = moment().tz(zoneName);
    const actualTime = userDateTime.clone().tz("America/Argentina/Buenos_Aires");
    const actualHour = actualTime.format("HH:mm");
    const actualDayOfWeek = actualTime.format('dddd');
    let actualDay = null

    switch (actualDayOfWeek) {
        case 'Monday':
            actualDay = 0
          break;
        case 'Tuesday':
            actualDay = 1
          break;
        case 'Wednesday':
            actualDay = 2
          break;
        case 'Thursday':
            actualDay = 3
          break;
        case 'Friday':
            actualDay = 4
          break;
        case 'Saturday':
            actualDay = 5
          break;
        case 'Sunday':
            actualDay = 6
          break;
        default:
      }
      let [startTime, endTime] = actualHour.split(':');
      endTime = startTime+":"+endTime;
      startTime = startTime+":"+"00";
      const activeSupervisor = await SupervisorShift.findOne({
            where: {
              day: actualDay,
              time: {
                [Op.gte]: startTime,
                [Op.lt]: endTime,
              },
            },
            include: [{
             model: Supervisor,
             attributes: ['name', 'lastName', 'phone', 'profilePhoto'],
             through: { attributes: [] },
      }],
      });

      res.json(activeSupervisor)
  } catch (error) {
    res.status(500).json("Get Online Supervisor fallo")
  }
};
module.exports = getOnlineSupervisor;
