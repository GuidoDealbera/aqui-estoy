const { Supervisor } = require('../../db');
const { Companion } = require('../../db');

const postSupervisorCharge = async (req, res) => {
  try {
    //Recibo Supervisor por params, y lo busco por id
    const { idSupervisor } = req.params;
    const supervisor = await Supervisor.findByPk(idSupervisor);
    //Recibo array de IdCompanion por body
    const { arrayCompanion } = req.body;
    //Busco cada Companion
    for (const idCompanion of arrayCompanion) {
    const companion = await Companion.findByPk(idCompanion);
    if (!companion) {
      return res.status(404).json({ error: 'Acompañante no encontrado' });
    }
    //Se asigna relacion companion-supervisor 
    await companion.setSupervisor(supervisor);
    }
    //Se devuelve Supervisor con Companion ya asignado
    const supervisorUpdate = await Supervisor.findByPk(idSupervisor, { include: Companion });

    res.status(200).json(supervisorUpdate);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = postSupervisorCharge;