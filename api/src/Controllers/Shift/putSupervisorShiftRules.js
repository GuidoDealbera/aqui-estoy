const { SupervisorShift, Supervisor } = require("../../db");

const putSupervisorShiftRules = async (req, res) => {
  try {
    const { shiftId } = req.body;
    for (const id of shiftId) {
      const shift = await SupervisorShift.findByPk(id);
      shift.hasRules = false;
      await shift.save();
    }
    let shifts = await SupervisorShift.findAll({
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
    res.status(500).json("Fallo al hacer un put Supervisor Shift Rules");
  }
};
module.exports = putSupervisorShiftRules;
