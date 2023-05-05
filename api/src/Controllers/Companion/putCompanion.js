const { Companion, Supervisor, CompanionShift } = require("../../db");

//Controlador para actualizar datos de un usuario
const putCompanion = async (req, res) => {
  const {
    name,
    lastName,
    profilePhoto,
    birthdayDate,
    nationality,
    country,
    CityTimeZoneId,
    phone,
    profession,
    studies,
    gender,
    rol,
  } = req.body;
  //Requiere el id del usuario enviado por parametro
  const { id } = req.params;
  const newDate = new Date(birthdayDate);
  try {
    //Modifica los datos del Acompañante con los datos enviados desde el front
    const result = await Companion.update(
      {
        name,
        lastName,
        profilePhoto,
        birthdayDate: newDate,
        nationality,
        country,
        CityTimeZoneId,
        phone,
        profession,
        studies,
        gender,
      },
      {
        where: { id: id },
        returning: true, // Agregamos este parámetro para que devuelva el objeto actualizado
      }
    );
    // Encuentra el acompañante actualizado
    const companion = await Companion.findByPk(id, {
      include: [
        {
          model: CompanionShift,
          attributes: ["id", "day", "time", "timezone"],
          through: { attributes: [] },
        },
        {
          model: Supervisor,
        },
      ],
    });
    // Devuelve el acompañante actualizado
    res.status(200).json(companion);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = putCompanion;
