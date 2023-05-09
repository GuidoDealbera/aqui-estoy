const { Companion } = require("../../db");
const { Supervisor } = require("../../db");
const bcrypt = require("bcrypt");
const passwordGenerator = require("../passwordGenerator");

const rankUpCompanion = async (req, res) => {
  try {
    const { id, rol } = req.body;
    const companion = await Companion.findOne({ where: { id: id } });
    companion.isActive = false;
    await companion.save();
    const {email}= companion
    const supervisor = await Supervisor.findOne({ where: { email: email } });
    if (supervisor) {
      supervisor.isActive = true;
      await supervisor.save();
      return res.status(201).json(supervisor);
    } else if (email && !companion.isActive) {
      const newPassword = passwordGenerator(8);
      const passwordHash = bcrypt.hashSync(newPassword, 10);
      if (rol === "SuperAdmin") {
        const newSuperAdmin = await Supervisor.create({
          email: email,
          password: passwordHash,
          rol: "SuperAdmin",
        });
        return res.status(201).json(newSuperAdmin);
      } else {
        const newSupervisor = await Supervisor.create({
          email: email,
          password: passwordHash,
          rol: "Supervisor",
        });
        return res.status(201).json(newSupervisor);
      }
      //Retorna un objeto de tipo Supervisor con todos sus datos
    } else {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor Rank Up Companion" });
  }
};

module.exports = rankUpCompanion;
