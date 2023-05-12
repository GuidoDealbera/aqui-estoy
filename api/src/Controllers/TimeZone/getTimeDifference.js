const moment = require("moment-timezone");

const getTimeDifference = (zoneName)=>{
    const userDateTime = moment().tz(zoneName);
    const actualTime = userDateTime.clone().tz("America/Argentina/Buenos_Aires");
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
      return updatedTime = {
        time: actualTime,
        actualDay: actualDay
      }
}

module.exports = getTimeDifference