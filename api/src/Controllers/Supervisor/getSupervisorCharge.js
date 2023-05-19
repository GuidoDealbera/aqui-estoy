const { Supervisor, Companion, SupervisorShift , CityTimeZone} = require('../../db');

const getSupervisorCharge = async (req, res) => {
  try {
    const { idSupervisor } = req.params;
    const supervisorOnCharge = await Supervisor.findByPk(idSupervisor, {
      include: [
        {
          model: Companion,
          include: [
            {
              model: CityTimeZone
            }
          ]
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
      ],
    });
    if (!supervisorOnCharge) {
      return res.status(404).json({ error: 'Supervisor no encontrado' });
    }
    const companions = supervisorOnCharge.Companions;
   return res.status(200).json(companions);
  } catch (error) {
   return res.status(500).send({ error: error.message });
  }
};

module.exports = getSupervisorCharge;
