const { SupervisorShift, Supervisor } = require("../../db");

const getAllSupervisorsPerShift = async (req, res) => {
  try {
    const shifts = await SupervisorShift.findAll({
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
   return res.status(200).json(shiftsWithCount);
  } catch (error) {
   return res.status(400).json({ error: error.message });
  }
};

module.exports = getAllSupervisorsPerShift;
