const { SupervisorShift, Supervisor } = require("../../db");

const getAllSupervisorsPerShift = async (req, res) => {
  try {
    const shifts = await SupervisorShift.findAll({
      include: {
        model: Supervisor,
        through: { attributes: [] },
      },
      order: [["id", "ASC"]], // Ordenar por ID de menor a mayor
    });

    const shiftsWithCount = shifts.map((shift) => ({
      shiftId: shift.id,      
      shiftSupervisors: shift.Supervisors,
      supervisorCount: shift.Supervisors.length,
      maxSupervisors: shift.maxSupervisors,
      hasRules: shift.hasRules,
    }));

    res.status(200).json(shiftsWithCount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getAllSupervisorsPerShift;
