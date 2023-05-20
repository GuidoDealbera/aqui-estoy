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
  console.log(isActive);
  try {
    await Companion.update(
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
