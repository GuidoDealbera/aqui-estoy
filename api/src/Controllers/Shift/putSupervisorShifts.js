const {SupervisorShift, Supervisor} = require("../../db");

const putSupervisorShifts = async (req, res) => {
  try {
    const { day, max, hour } = req.body;
      if (max < 0 || max === undefined) {
      return res.status(401).json("No se asignó ningun valor máximo");
      }
    let shifts = []
    if (day && max && hour) {
      const shift = await SupervisorShift.findOne({where:{
        day: day,
        time: hour
      }});
      shift.maxSupervisors = max;
      shift.hasRules = true;
      await shift.save();
    } else {
      shifts = await SupervisorShift.findAll({
        include: {
        model: Supervisor,
        through: { attributes: [] },
      },
        order: [['id', 'ASC']]
      });
      const response =  shifts.map((shift) => {
        if (!shift.hasRules) {
          shift.maxSupervisors = max;
          shift.save();
        }
        return shift
      });
    }
    shifts = await SupervisorShift.findAll({
      include: {
      model: Supervisor,
      through: { attributes: [] },
    },
      order: [['id', 'ASC']]
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

   return res.status(200).json(shiftsWithCount);
  } catch (error) {
    res.status(500).json("Fallo al hacer un put Supervisor Shift");
  }
};

module.exports = putSupervisorShifts;
