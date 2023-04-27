const { Supervisor } = require("../db");

//Controlador para modificar un supervisor
const putSupervisor = async (req, res) => {
  //Recibe la info por body desde el front
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
  //Recibe id por params
  const { id } = req.params;
  try {
    //Realiza un update del supervisor con ese id en la bd
    const result = await Supervisor.update(
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
    //Devuelve un supervisor con todos sus datos actualizados
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = putSupervisor;
