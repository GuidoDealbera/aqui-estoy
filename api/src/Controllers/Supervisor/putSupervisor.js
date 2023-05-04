const { Supervisor } = require("../../db");

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
    CityTimeZoneId,
    phone,
    profession,
    studies,
    gender,
  } = req.body;
  //Recibe id por params
  const { id } = req.params;
  const newDate = new Date(birthdayDate);
  try {
    //Realiza un update del supervisor con ese id en la bd
    const result = await Supervisor.update(
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
      { where: { id: id } }
    );
      
    // Encuentra el supervisor actualizado
    const supervisor = await Supervisor.findOne({ where: { id: id } });
    // Devuelve el supervisor actualizado
    res.status(200).json(supervisor);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = putSupervisor;
