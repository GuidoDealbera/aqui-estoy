const { Companion , CompanionShift, Supervisor, CityTimeZone} = require("../../db");

//Controlador para traer todos los Acompañantes de la bd
const getCompanion = async (req, res) => {
  try {
    //Buscar todos los Acompañantes guardados en bd
    const results = await Companion.findAll({include: [
      {
        model: CompanionShift,
        attributes: ["id", "day", "time", "timezone"],
        through: { attributes: [] },
      },
      {
        model: Supervisor,
      },
      {
        model: CityTimeZone,
      },
    ],});
    //Retorna todos los acompañantes como un array de objetos
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: "Error al buscar datos" });
  }
};

module.exports = getCompanion;
