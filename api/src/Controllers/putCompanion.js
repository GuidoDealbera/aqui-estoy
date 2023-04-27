const { Companion } = require("../db");

//Controlador para actualizar datos de un usuario
const putCompanion = async (req, res) => {
  const {
    name,
    lastName,
    profilePhoto,
    birthdayDate,
    nationality,
    country,
    cityTimeZone,
    phone,
    profession,
    studies,
    gender,
  } = req.body;
//Requiere el id del usuario enviado por parametro
  const { id } = req.params;
  try {
    //Modifica los datos del Acompañante con los datos enviados desde el front
    const result = await Companion.update(
      {
        name,
        lastName,
        profilePhoto,
        birthdayDate,
        nationality,
        country,
        cityTimeZone,
        phone,
        profession,
        studies,
        gender,
      },
      { where: { id: id } }
    );
    //Devuelve el acompañante actualizado
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = putCompanion;
