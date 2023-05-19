const { CompanionShift, Companion } = require("../../db");

const putCompanionShifts = async (req, res) => {
  try {
    let { day, max, hour, startTime, endTime } = req.body;
    if (max < 0 || max === undefined) {
      return res.status(401).json("No se asignó ningun valor máximo");
    }
    let shifts = [];
    if (hour && max >=0) {
      const shift = await CompanionShift.findOne({
        where: {
          day: day,
          time: hour,
        },
      });
      shift.maxCompanions = max;
      shift.hasRules = true;
      await shift.save();
    } else {
      shifts = await CompanionShift.findAll({
        include: {
          model: Companion,
          through: { attributes: [] },
        },
        order: [["id", "ASC"]],
      });
      if(startTime && endTime){
        let adjustedEndTime = endTime;
        if (endTime === "01:00") {
          adjustedEndTime = "25:00";
        }
        await Promise.all(
          shifts.map(async (shift) => {
            if (!shift.hasRules) {
              const [shiftStartTime, shiftEndTime] = shift.time.split('-');
             
              if (shiftStartTime >= startTime && shiftEndTime <= adjustedEndTime) {
                shift.maxCompanions = max;
                await shift.save();
              }
            }
          })
        );
      }else{
      await Promise.all(
        shifts.map(async (shift) => {
          if (!shift.hasRules) {
            shift.maxCompanions = max;
            await shift.save();
          }
        })
      );
    }
  }
    shifts = await CompanionShift.findAll({
      include: {
        model: Companion,
        through: { attributes: [] },
      },
      order: [["id", "ASC"]],
    });
    const shiftsWithCount = shifts.map((shift) => ({
      shiftId: shift.id,
      day: shift.day,
      time: shift.time,
      shiftCompanions: shift.Companions,
      companionCount: shift.Companions.length,
      maxCompanions: shift.maxCompanions,
      hasRules: shift.hasRules,
    }));
    return res.json(shiftsWithCount);
  } catch (error) {
    res.status(500).json("Fallo al hacer un put Companion Shift");
  }
};

module.exports = putCompanionShifts;
