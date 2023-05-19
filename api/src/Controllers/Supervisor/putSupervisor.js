const {Supervisor,Companion,SupervisorShift,CityTimeZone,} = require("../../db");

const putSupervisor = async (req, res) => {
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
    rol
  } = req.body;
  const { id } = req.params;
  const timezone = await CityTimeZone.findByPk(cityTimeZone);
  try {
    await Supervisor.update(
      {
        name,
        lastName,
        profilePhoto,
        nationality,
        country,
        phone,
        profession,
        studies,
        gender,
        isActive: isActive !== null && isActive !== undefined ? isActive : true,
        rol
      },
      { where: { id: id } }
    );
    const supervisor = await Supervisor.findByPk(id);
    
    let newDate = birthdayDate !== supervisor.birthdayDate? new Date(birthdayDate) : supervisor.birthdayDate;
    if(supervisor.birthdayDate !== newDate && newDate){
      supervisor.birthdayDate = newDate;
     await supervisor.save();
    }
    if (timezone) {
      
      await supervisor.setCityTimeZone(timezone.id);
    }
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
   return res.status(200).json(supervisorUpdated);
  } catch (error) {
   return res.status(400).json(error.message);
  }
};

module.exports = putSupervisor;
