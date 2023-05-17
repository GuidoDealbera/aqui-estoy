const { Companion } = require("../../db");
const { Supervisor } = require("../../db");
const bcrypt = require("bcrypt");
const passwordGenerator = require("../passwordGenerator");
const axios = require("axios")
const rankUpCompanion = async (req, res) => {
  try {
    const { id, rol } = req.body;
    const companion = await Companion.findOne({ where: { id: id } });
    companion.isActive = false;
    await companion.save();
    const { email,name,lastName,birthdayDate,gender,studies,profession,phone,
      profilePhoto,nationality,country,CityTimeZoneId } = companion;
    const supervisor = await Supervisor.findOne({ where: { email: email } });
    if (supervisor) {
      supervisor.isActive = true;
      if (rol !== supervisor.rol) {
        supervisor.rol = rol;
      }
      await supervisor.save();
      return res.status(201).json(supervisor);
    } else if (email && !companion.isActive) {
      const newPassword = passwordGenerator(8);
      const passwordHash = bcrypt.hashSync(newPassword, 10);
      const newSupervisor = await Supervisor.create({
        email: email,
        password: passwordHash,
        rol: rol,
        name: name,
        lastName: lastName,
        birthdayDate: birthdayDate,
        profilePhoto: profilePhoto,
        nationality: nationality,
        country: country,
        CityTimeZoneId: CityTimeZoneId,
        phone: phone,
        profession: profession,
        studies: studies,
        gender: gender,
      });
      const user = {
        email:newSupervisor.email,password:newPassword,rol:newSupervisor.rol
      }
      await axios.post("/postCreatedAccount", user);
      // await axios.post("http://localhost:3001/postCreatedAccount", user);

      return res.status(201).json({ newSupervisor, newPassword });
      //Retorna un objeto de tipo Supervisor con todos sus datos
    } else {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor Rank Up Companion" });
  }
};

module.exports = rankUpCompanion;
