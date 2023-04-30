const { Supervisor } = require("../../db");
const bcrypt = require("bcrypt");

//Controlador para crear un Supervisor
const postSupervisor = async (req, res) => {
  try {
    const { email, password, rol} = req.body;
    //El superAdmin debe ingresar email y contraseña para poder crear un nuevo supervisor
    if (email && password) {
      // Generar hash de la contraseña
      const passwordHash = await bcrypt.hashSync(password, 10);
      //Crear el Supervisor con el email ingresado y password hasheada y si es superAdmin o no
      if(rol == "SuperAdmin"){
      const newSupervisor = await Supervisor.create({
        email: email,
        password: passwordHash,
        isSuperAdmin: true,
      });
      res.status(201).json(newSupervisor);
    }else{
      const newSupervisor = await Supervisor.create({
        email: email,
        password: passwordHash,
        isSuperAdmin: false,
      });
      res.status(201).json(newSupervisor);
    }
      //Retorna un objeto de tipo Supervisor con todos sus datos
      
    } else {
      res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor al postear Supervisor" });
  }
};

module.exports = postSupervisor;
