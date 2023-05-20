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
  try {
    let firstName = name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[0].slice(1);
    let secondName = "";
    if (name.split(" ")[1]) {
      secondName = name.split(" ")[1].charAt(0).toUpperCase() + name.split(" ")[1].slice(1);
    }
    let fullName = firstName + " " + secondName
    let firstLastName = lastName.split(" ")[0].charAt(0).toUpperCase() + lastName.split(" ")[0].slice(1);
    let secondLastName = "";
    if (lastName.split(" ")[1]) {
      secondLastName = lastName.split(" ")[1].charAt(0).toUpperCase() + lastName.split(" ")[1].slice(1);
    }
    let fullLastName = firstLastName + " " + secondLastName
    await Supervisor.update(
      {
        name: fullName,
        lastName: fullLastName,
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
      { 
        where: { id: id },
        returning: true,
     }
    );
    const supervisor = await Supervisor.findByPk(id);
    
    let newDate = birthdayDate !== supervisor.birthdayDate? new Date(birthdayDate) : supervisor.birthdayDate;
    if(supervisor.birthdayDate !== newDate && newDate){
      supervisor.birthdayDate = newDate;
     await supervisor.save();
    }
    if(isActive === false){
      await supervisor.setSupervisorShifts([]);
    }
    const timezone = await CityTimeZone.findByPk(cityTimeZone);
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
