const {
  Supervisor,
  Companion,
  SupervisorShift,
  CityTimeZone,
} = require("../../db");

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
    isActive,
  } = req.body;
  //Recibe id por params
  const { id } = req.params;
  let newDate = birthdayDate ? new Date(birthdayDate) : undefined;
  const timezone = await CityTimeZone.findByPk(cityTimeZone);
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
        phone,
        profession,
        studies,
        gender,
        isActive: isActive !== null && isActive !== undefined ? isActive : true
      },
      { where: { id: id } }
    );

    if (timezone) {
      const supervisor = await Supervisor.findByPk(id);
      await supervisor.setCityTimeZone(timezone.id);
    }
    // Encuentra el supervisor actualizado
    const supervisorUpdated = await Supervisor.findByPk(id, {
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
        },
      ],
    });
    // Devuelve el supervisor actualizado
    res.status(200).json(supervisorUpdated);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = putSupervisor;
