const { Companion } = require("../../db");
const { Supervisor } = require("../../db");
const bcrypt = require("bcrypt");

const downgradeSupervisor = async (req, res) => {
  try {
    const { id } = req.params;
    const supervisor = await Supervisor.findOne({ where: { id: id } });
    const { email } = supervisor;
    supervisor.isActive = false;
    await supervisor.save();
    const { newPassword, rol } = req.body;
    const companion = await Companion.findOne({ where: { email: email } });
    if (companion) {
      companion.isActive = true;
      await companion.save();
      const response = {
        ...companion.toJSON(),
        rol: rol,
      };
      res.status(200).json(response);
      return;
    } else if (email && !supervisor.isActive && rol === "Companion1") {
      // Generar hash de la contraseña
      const passwordHash = await bcrypt.hashSync(newPassword, 10);
      //Crear el Supervisor con el email ingresado y password hasheada y si es superAdmin o no
      const newCompanion = await Companion.create({
        email: email,
        password: passwordHash,
        isSuperCompanion: false,
      });
      //Retorna un objeto de tipo Supervisor con todos sus datos
      const response = {
        ...newCompanion.toJSON(),
        rol: rol,
      };
      res.status(200).json(response);
      return;
    } else if (email && !supervisor.isActive && rol === "Companion2") {
      const passwordHash = await bcrypt.hashSync(newPassword, 10);
       const newCompanion = await Companion.create({
        email: email,
        password: passwordHash,
        isSuperCompanion: true,
      });
      //Retorna un objeto de tipo Supervisor con todos sus datos
      const response = {
        ...newCompanion.toJSON(),
        rol: rol,
      };
      res.status(200).json(response);
      return;
    } else {
      res.status(400).json({ error: "Faltan datos obligatorios" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor Downgrade Supervisor" });
  }
};

module.exports = downgradeSupervisor;
