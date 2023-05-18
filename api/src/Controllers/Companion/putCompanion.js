const {
  Companion,
  Supervisor,
  CompanionShift,
  CityTimeZone,
} = require("../../db");

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
    isActive,
    rol
  } = req.body;
  //Requiere el id del usuario enviado por parametro
  const { id } = req.params;
  
  try {
    //Modifica los datos del Acompañante con los datos enviados desde el front
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
        returning: true, // Agregamos este parámetro para que devuelva el objeto actualizado
      }
    );
    const companion = await Companion.findByPk(id);
    let newDate = birthdayDate !== companion.birthdayDate ? new Date(birthdayDate) : companion.birthdayDate;
    if(companion.birthdayDate !== newDate && newDate){
      companion.birthdayDate = newDate;
     await companion.save();
    }
    
  const timezone = await CityTimeZone.findByPk(cityTimeZone);
  if (timezone) {
    
    await companion.setCityTimeZone(timezone.id);
  }
    // Encuentra el acompañante actualizado
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
    // Devuelve el acompañante actualizado
   return res.status(200).json(companionUpdated);
  } catch (error) {
   return res.status(400).json(error.message);
  }
};

module.exports = putCompanion;
