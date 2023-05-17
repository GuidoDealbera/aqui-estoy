const { Supervisor } = require("../../db");
const bcrypt = require("bcrypt");
const passwordGenerator = require("../passwordGenerator");
const axios = require("axios")
//Controlador para crear un Supervisor
const postSupervisor = async (req, res) => {
  try {
    const { email, rol } = req.body;
    const exist = await Supervisor.findOne({ where: { email: email } });
    if (exist) {
      return res.status(400).send("El supervisor ya existe");
    }
    //El superAdmin debe ingresar email y contraseña para poder crear un nuevo supervisor
    if (email) {
      const {password}= req.body
     
      if (password) {
        // Generar hash de la contraseña
        const passwordHash = bcrypt.hashSync(password, 10);
        //Crear el Supervisor con el email ingresado y password hasheada y si es superAdmin o no
        const newSupervisor = await Supervisor.create({
          email: email,
          password: passwordHash,
          rol: rol,
        });
        const user = {
          email:newSupervisor.email,password:password,rol:newSupervisor.rol
        }
        axios.post("/postCreatedAccount", user);
        // axios.post("http://localhost:3001/postCreatedAccount", user);
        return res.status(201).json(newSupervisor);
      } else {
        let pass = passwordGenerator(8)
        const passwordHash = bcrypt.hashSync(pass, 10);
        const newSupervisor = await Supervisor.create({
          email: email,
          password: passwordHash,
          rol: rol,
        });
        //Retorna un objeto de tipo Supervisor con todos sus datos
        const user = {
          email:newSupervisor.email,password:pass,rol:newSupervisor.rol
        }
        axios.post("/postCreatedAccount", user);
        // axios.post("http://localhost:3001/postCreatedAccount", user);
        return res.status(201).json(newSupervisor);
      }
    } else {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  } catch (error) {
    // Devolver la respuesta de error y detener la ejecución
    return res
      .status(500)
      .json({ error: "Error del servidor al postear Supervisor" });
  }
};

module.exports = postSupervisor;
