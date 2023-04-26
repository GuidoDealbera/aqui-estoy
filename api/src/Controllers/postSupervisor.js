const { Supervisor } = require("../db");
const bcrypt = require("bcrypt");

const postSupervisor = async (req, res) => {
  try {
    const { email, password, isSuperAdmin } = req.body;

    if (email && password) {
      // Generar hash de la contraseña
      const passwordHash = await bcrypt.hashSync(password, 10);

      const newSupervisor = await Supervisor.create({
        email: email,
        password: passwordHash,
        isSuperAdmin: isSuperAdmin,
      });
      res.status(201).json(newSupervisor);
    }else{
        res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor al postear Supervisor" });
  }
};

module.exports = postSupervisor;