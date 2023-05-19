const { Supervisor } = require("../../db");
const bcrypt = require("bcrypt");
const passwordGenerator = require("../passwordGenerator");
const axios = require("axios")

const postSupervisor = async (req, res) => {
  try {
    const { email, rol } = req.body;
    const exist = await Supervisor.findOne({ where: { email: email } });
    if (exist) {
      return res.status(400).send("El supervisor ya existe");
    }
    if (email) {
      const {password}= req.body
     
      if (password) {
        const passwordHash = bcrypt.hashSync(password, 10);
        const newSupervisor = await Supervisor.create({
          email: email,
          password: passwordHash,
          rol: rol,
        });
        const user = {
          email:newSupervisor.email,password:password,rol:newSupervisor.rol
        }
        axios.post("/postCreatedAccount", user);
        return res.status(201).json(newSupervisor);
      } else {
        let pass = passwordGenerator(8)
        const passwordHash = bcrypt.hashSync(pass, 10);
        const newSupervisor = await Supervisor.create({
          email: email,
          password: passwordHash,
          rol: rol,
        });
        const user = {
          email:newSupervisor.email,password:pass,rol:newSupervisor.rol
        }
        axios.post("/postCreatedAccount", user);
        return res.status(201).json(newSupervisor);
      }
    } else {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor al postear Supervisor" });
  }
};

module.exports = postSupervisor;
