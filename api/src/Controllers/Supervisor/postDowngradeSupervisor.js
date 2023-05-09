const { Companion } = require("../../db");
const { Supervisor } = require("../../db");
const bcrypt = require("bcrypt");
const passwordGenerator = require("../passwordGenerator")

const downgradeSupervisor = async (req, res) => {
  try {
    const { id, rol } = req.body;
    const supervisor = await Supervisor.findOne({ where: { id: id } });
    supervisor.isActive = false;
    await supervisor.save();
    const { email,name,lastName,birthdayDate,gender,studies,profession,phone,
      profilePhoto,nationality,country,CityTimeZoneId } = supervisor;
    const companion = await Companion.findOne({ where: { email: email } });
    if (companion) {
      companion.isActive = true;
      if (rol !== companion.rol) {
        companion.rol = rol;
      }
      await companion.save();
      return res.status(200).json(companion);
    } else if (email && !supervisor.isActive) {
      const newPassword = passwordGenerator(8);
      const passwordHash = bcrypt.hashSync(newPassword, 10);
      const newCompanion = await Companion.create({
        email: email,
        password: passwordHash,
        rol: rol,
        name: name,
        lastName: lastName,
        birthdayDate: birthdayDate,
        profilePhoto: profilePhoto,
        nationality: nationality,
        country: country,
        phone: phone,
        profession: profession,
        studies: studies,
        gender: gender,
        CityTimeZoneId: CityTimeZoneId
      });
      //Retorna un objeto de tipo Supervisor con todos sus datos
      return res.status(201).json({newCompanion, newPassword});
    } else {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor Downgrade Supervisor" });
  }
};

module.exports = downgradeSupervisor;
