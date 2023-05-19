const { Supervisor, SupervisorShift, Companion, CityTimeZone } = require("../../db");

const getSupervisor = async (req, res) => {
  try {
    const results = await Supervisor.findAll({
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
          attributes: ["id", "zoneName", "offSet"],
        },
      ],
    });

   return res.status(200).json(results);
  } catch (error) {
   return res.status(400).json({ error: "Error al buscar datos" });
  }
};

module.exports = getSupervisor;
