const { Supervisor } = require('../../db');
const { Companion } = require('../../db');

const putSupervisorCharge = async (req, res) => {
  try {
    // Recibo Supervisor por params, y lo busco por id
    const { idSupervisor } = req.params;
    const supervisor = await Supervisor.findByPk(idSupervisor);
  
    if (!supervisor) {
      return res.status(404).json({ error: 'Supervisor no encontrado' });
    }
    // Recibo array de IdCompanion por body
    const { arrayCompanion } = req.body;
    // Busco cada Companion y elimino la relación con el Supervisor
    for (const idCompanion of arrayCompanion) {
      const companion = await Companion.findOne({ where: { id: idCompanion }});
      console.log(companion);
      if (!companion) {
        return res.status(404).json({ error: 'Acompañante no encontrado' });
      }
      await companion.setSupervisor(null);
    }
    // Se devuelve Supervisor con Companion ya desasignado
    const supervisorUpdate = await Supervisor.findByPk(idSupervisor, { include: Companion });

    res.status(200).json(supervisorUpdate);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = putSupervisorCharge;
