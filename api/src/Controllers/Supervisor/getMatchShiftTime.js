const { Supervisor, SupervisorShift } = require("../../db");
const { Companion, CompanionShift } = require("../../db");
const { Op } = require("sequelize");

const getMatchShiftTime = async (req, res) => {
  try {
    const { idCompanion } = req.params;
    const companion = await Companion.findByPk(idCompanion, {
      include: {
        model: CompanionShift,
        through: { attributes: [] },
      },
    });
    const companionShifts = companion.CompanionShifts;

    const supervisors = await Supervisor.findAll({
      include: {
        model: SupervisorShift,
        through: { attributes: [] },
        required: true,
      },
    });

    let match = null;

    companionShifts.forEach((companionShift) => {
      supervisors.forEach((supervisor) => {
        supervisor.SupervisorShifts.forEach((supervisorShift) => {
          if (
            companionShift.day === supervisorShift.day &&
            supervisorShift.time.startsWith(companionShift.time.split("-")[0]) &&
            match === null
          ) {
            match = {
              
              supervisor
             
            };
          }
        });
      });
    });

    res.status(200).json({ match });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getMatchShiftTime;
