const { Supervisor, Companion, SupervisorShift, CityTimeZone } = require('../../db');

const postSupervisorCharge = async (req, res) => {
  try {
    const { idSupervisor } = req.params;
    const supervisor = await Supervisor.findByPk(idSupervisor);
    const { arrayCompanion } = req.body;
    for (const idCompanion of arrayCompanion) {
    const companion = await Companion.findByPk(idCompanion);
    if (!companion) {
      return res.status(404).json({ error: 'Acompañante no encontrado' });
    }
    await companion.setSupervisor(supervisor);
    }
    const supervisorUpdate = await Supervisor.findByPk(idSupervisor,{include: [
      {
        model: Companion,
      },
      {
        model: CityTimeZone,
        attributes: ["id", "zoneName", "offSet"],
      },
      {
        model: SupervisorShift,
          attributes: ["id", "day", "time", "timezone"],
          through: { attributes: [] },
      },
    ]});
   return res.status(200).json(supervisorUpdate);
  } catch (error) {
   return res.status(500).send({ error: error.message });
  }
};
module.exports = postSupervisorCharge;