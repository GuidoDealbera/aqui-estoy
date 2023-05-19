const { Companion } = require("../../db");
const bcrypt = require("bcrypt");
const passwordGenerator = require("../passwordGenerator");
const axios = require("axios");

const postCompanion = async (req, res) => {
  try {
    const { email, password, rol } = req.body;

    if (email) {
      const { password } = req.body;
      if (password) {
        const passwordHash = bcrypt.hashSync(password, 10);
        const newCompanion = await Companion.create({
          email: email,
          password: passwordHash,
          rol: rol,
        });
        const user = {
          email: newCompanion.email,
          password: password,
          rol: newCompanion.rol,
        };
        axios.post("/postCreatedAccount", user);
        return res.status(201).json(newCompanion);
      } else {
        let pass = passwordGenerator(8)
        const passwordHash = bcrypt.hashSync(pass, 10);
        const newCompanion = await Companion.create({
          email: email,
          password: passwordHash,
          rol: rol,
        });
        const user = {
          email: newCompanion.email,
          password: pass,
          rol: newCompanion.rol,
        };
        axios.post("/postCreatedAccount", user);
        return res.status(201).json(newCompanion);
      }
    } else {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor al postear" });
  }
};

module.exports = postCompanion;
