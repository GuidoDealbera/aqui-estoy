const { Supervisor, SupervisorShift, CityTimeZone } = require("../../db");
const { Companion } = require("../../db");

const putSupervisorCharge = async (req, res) => {
  try {
    const { idSupervisor } = req.params;
    const supervisor = await Supervisor.findByPk(idSupervisor);
    if (!supervisor) {
      return res.status(404).json({ error: "Supervisor no encontrado" });
    }
    const { arrayCompanion } = req.body;
    for (const idCompanion of arrayCompanion) {
      const companion = await Companion.findOne({ where: { id: idCompanion } });
      if (!companion) {
        return res.status(404).json({ error: "Acompañante no encontrado" });
      }
      await companion.setSupervisor(null);
    }
    const supervisorUpdate = await Supervisor.findByPk(idSupervisor, {
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
      ]
    });
   return res.status(200).json(supervisorUpdate);
  } catch (error) {
   return res.status(500).send({ error: error.message });
  }
};

module.exports = putSupervisorCharge;
