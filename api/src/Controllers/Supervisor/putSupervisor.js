const { Supervisor, Companion, SupervisorShift } = require("../../db");

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
     await Supervisor.update(
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
    const supervisor = await Supervisor.findByPk(id,{
      include: [
        {
          model: SupervisorShift,
          attributes: ["id", "day", "time", "timezone"],
          through: { attributes: [] },
        },
        {
          model: Companion,
        },
      ],
    });
    // Devuelve el supervisor actualizado
    res.status(200).json(supervisor);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = putSupervisor;
