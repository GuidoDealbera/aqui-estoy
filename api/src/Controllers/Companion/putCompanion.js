const {Companion,Supervisor,CompanionShift,CityTimeZone} = require("../../db");

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
    await Companion.update(
      {
        name:fullName,
        lastName:fullLastName,
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
    const companion = await Companion.findByPk(id);
    let newDate = birthdayDate !== companion.birthdayDate ? new Date(birthdayDate) : companion.birthdayDate;
    if(companion.birthdayDate !== newDate && newDate){
      companion.birthdayDate = newDate;
      await companion.save();
    }
    if(isActive === false){
      await companion.setCompanionShifts([]);
    }
  const timezone = await CityTimeZone.findByPk(cityTimeZone);
  if (timezone) {
    await companion.setCityTimeZone(timezone.id);
  }
    const companionUpdated = await Companion.findByPk(id, {
      include: [
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
      ],
    });
   return res.status(200).json(companionUpdated);
  } catch (error) {
   return res.status(400).json(error.message);
  }
};

module.exports = putCompanion;
