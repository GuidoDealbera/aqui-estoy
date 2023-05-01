const { Supervisor, Companion } = require('../../db');

const getSupervisorCharge = async (req, res) => {
  try {
    const { idSupervisor } = req.params;

    // Buscar Supervisor con el ID dado y cargar todas las instancias de Companion relacionadas
    const supervisorOnCharge = await Supervisor.findByPk(idSupervisor, {
      include: [Companion],
    });

    if (!supervisorOnCharge) {
      return res.status(404).json({ error: 'Supervisor no encontrado' });
    }

    res.status(200).json(supervisorOnCharge);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getSupervisorCharge;
