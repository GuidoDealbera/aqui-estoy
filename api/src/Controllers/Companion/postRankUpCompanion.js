const { Companion } = require("../../db");
const { Supervisor } = require("../../db");
const bcrypt = require("bcrypt");

const rankUpCompanion = async (req, res) => {
  try {
    const { id } = req.params;
    const companion = await Companion.findOne({ where: { id: id } });
    const { email } = companion;
    companion.isActive = false;
    await companion.save();
    const supervisor = await Supervisor.findOne({ where: { email: email } });
    if (supervisor) {
      supervisor.isActive = true;
      await supervisor.save();
      res.status(201).json(supervisor);
      return;
    } else if (email && !companion.isActive) {
      const { newPassword } = req.body;
      // Generar hash de la contraseña
      const passwordHash = await bcrypt.hashSync(newPassword, 10);
      //Crear el Supervisor con el email ingresado y password hasheada y si es superAdmin o no
      const newSupervisor = await Supervisor.create({
        email: email,
        password: passwordHash,
        isSuperAdmin: false,
      });
      //Retorna un objeto de tipo Supervisor con todos sus datos
      res.status(201).json(newSupervisor);
      return;
    } else {
      res.status(400).json({ error: "Faltan datos obligatorios" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor Rank Up Companion" });
  }
};

module.exports = rankUpCompanion;
