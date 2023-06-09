const { SupervisorShift, CityTimeZone } = require("../../db");
const { Supervisor, Companion } = require("../../db");

const assignSupervisorShift = async (req, res) => {
  try {
    const { idSupervisor } = req.params;
    const supervisor = await Supervisor.findOne({ where: { id: idSupervisor } });
    const { idShift } = req.body;
    const shift = await SupervisorShift.findOne({ where: { id: idShift } });
    const currentSupervisors = await shift.getSupervisors();
    const maxSupervisors = shift.maxSupervisors;

    if (currentSupervisors.length >= maxSupervisors) {
      return res.status(400).json({ error: "El turno ya tiene el máximo de supervisores asignados" });
    }
    await supervisor.addSupervisorShifts(shift);
    const updatedSupervisor = await Supervisor.findOne({
      where: { id: idSupervisor },
      include: [
        {
          model: SupervisorShift,
          attributes: ["id", "day", "time", "timezone"],
          through: { attributes: [] },
        },
        {
          model: Companion,
        },
        {
          model: CityTimeZone,
        },
      ],
    });
    return res.json(updatedSupervisor);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al asignar turno");
  }
};

module.exports = assignSupervisorShift;
