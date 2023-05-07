const { Companion } = require("../../db");
const bcrypt = require("bcrypt");

const postCompanion = async (req, res) => {
  try {
    const { email, password, rol } = req.body;
    console.log("back rol");
    console.log(rol);
    if (email && password) {
      // Generar hash de la contraseña
      const passwordHash = await bcrypt.hashSync(password, 10);
      //Crear el acompañante con el email ingresado y password hasheada
      const newCompanion = await Companion.create({
        email: email,
        password: passwordHash,
        rol: rol,
      });
      res.status(201).json(newCompanion);
    } else {
      res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor al postear" });
  }
};

module.exports = postCompanion;
