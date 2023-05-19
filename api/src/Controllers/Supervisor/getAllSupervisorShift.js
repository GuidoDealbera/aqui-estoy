const { Supervisor, SupervisorShift } = require("../../db");

const getAllSupervisorShift = async (req, res) => {
  try {
    const response = await Supervisor.findAll({
      include: [
        {
          model: SupervisorShift,
          attributes: ["id", "day", "time", "timezone"],
          through: { attributes: [] }
        },
      ],
    });
   return res.status(200).json(response);
  } catch (error) {
   return res.status(500).send("Error del servidor al obtener turnos de supervisores");
  }
};
module.exports = getAllSupervisorShift;
