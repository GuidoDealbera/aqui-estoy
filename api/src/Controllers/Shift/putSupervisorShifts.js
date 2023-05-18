const { SupervisorShift, Supervisor } = require("../../db");

const putSupervisorShifts = async (req, res) => {
  try {
    let { day, max, hour, startTime, endTime } = req.body;
    if (max < 0 || max === undefined) {
      return res.status(401).json("No se asignó ningun valor máximo");
    }
    let shifts = [];
    if (hour && max >=0) {
      const shift = await SupervisorShift.findOne({
        where: {
          day: day,
          time: hour,
        },
      });
      shift.maxSupervisors = max;
      shift.hasRules = true;
      await shift.save();
      
    } else {
      shifts = await SupervisorShift.findAll({
        include: {
          model: Supervisor,
          through: { attributes: [] },
        },
        order: [["id", "ASC"]],
      });
      
      if(startTime && endTime){
        let adjustedEndTime = endTime;
        if (endTime === "00:00") {
          adjustedEndTime = "24:00";
        }
        await Promise.all(
          shifts.map(async (shift) => {
            if (!shift.hasRules) {
              const [shiftStartTime, shiftEndTime] = shift.time.split('-');
             
              if (shiftStartTime >= startTime && shiftEndTime <= adjustedEndTime) {
                shift.maxSupervisors = max;
                await shift.save();
              }
            }
          })
        );
      }else{
      await Promise.all(
        shifts.map(async (shift) => {
          if (!shift.hasRules) {
            shift.maxSupervisors = max;
            await shift.save();
          }
        })
      );
    }
  }
    shifts = await SupervisorShift.findAll({
      include: {
        model: Supervisor,
        through: { attributes: [] },
      },
      order: [["id", "ASC"]],
    });
    const shiftsWithCount = shifts.map((shift) => ({
      shiftId: shift.id,  
      day: shift.day,
      time: shift.time,    
      shiftSupervisors: shift.Supervisors,
      supervisorCount: shift.Supervisors.length,
      maxSupervisors: shift.maxSupervisors,
      hasRules: shift.hasRules,
    }));
    return res.json(shiftsWithCount);
  } catch (error) {
    res.status(500).json("Fallo al hacer un put Companion Shift");
  }
};

module.exports = putSupervisorShifts;
