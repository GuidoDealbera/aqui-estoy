const { Companion } = require("../db");
const { Supervisor } = require("../db");
const bcrypt = require("bcrypt");

const rankUpCompanion = async (req, res) => {
  try {
    const { id } = req.params;
    const companion = await Companion.findOne({ where: { id:id } });
    const { email, password } = companion;
    companion.isActive = false;
    await companion.save();
    if (email && password && !companion.isActive) {
      // Generar hash de la contraseña
      const passwordHash = await bcrypt.hashSync(password, 10);
      //Crear el Supervisor con el email ingresado y password hasheada y si es superAdmin o no
      const newSupervisor = await Supervisor.create({
        email: email,
        password: passwordHash,
        isSuperAdmin: false,
      });
      //Retorna un objeto de tipo Supervisor con todos sus datos
      res.status(201).json(newSupervisor);
    } else {
      res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor Rank Up Companion" });
  }
};

module.exports = rankUpCompanion;
