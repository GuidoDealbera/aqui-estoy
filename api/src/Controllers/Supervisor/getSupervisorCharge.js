const { Supervisor, Companion, SupervisorShift } = require('../../db');

const getSupervisorCharge = async (req, res) => {
  try {
    const { idSupervisor } = req.params;
    // Buscar Supervisor con el ID dado y cargar todas las instancias de Companion relacionadas
    const supervisorOnCharge = await Supervisor.findByPk(idSupervisor, {
      include: [
        {
          model: Companion,
        },
        {
          model: SupervisorShift,
        },
      ],
    });
    if (!supervisorOnCharge) {
      return res.status(404).json({ error: 'Supervisor no encontrado' });
    }
    const companions = supervisorOnCharge.Companions;
    res.status(200).json(companions);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getSupervisorCharge;
