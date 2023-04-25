const { Companion } = require("../db");
const bcrypt = require("bcrypt");

const postCompanion = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      // Generar hash de la contraseña
      const passwordHash = await bcrypt.hashSync(password, 10);

      const newCompanion = await Companion.create({
        email: email,
        password: passwordHash,
      });
      res.status(201).json(newCompanion);
    }else{
        res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor al postear" });
  }
};

module.exports = postCompanion;