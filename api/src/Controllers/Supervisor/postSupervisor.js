const { Supervisor } = require("../../db");
const bcrypt = require("bcrypt");

//Controlador para crear un Supervisor
const postSupervisor = async (req, res) => {
  try {
    const { email, password, rol } = req.body;
    const exist = await Supervisor.findOne({ where: { email: email } });
    if (exist !== null) {
      return res.status(400).send("El supervisor ya existe");
    }
    if (email === "admin@admin.com") {
      const passwordHash = await bcrypt.hashSync(password, 10);
      const startingSuperAdmin = await Supervisor.create({
        email: email,
        password: passwordHash,
        rol: rol,
      });
      return res.status(200).json(startingSuperAdmin);
    }
    //El superAdmin debe ingresar email y contraseña para poder crear un nuevo supervisor
    if (email && password) {
      // Generar hash de la contraseña
      const passwordHash = await bcrypt.hashSync(password, 10);
      //Crear el Supervisor con el email ingresado y password hasheada y si es superAdmin o no
      if (rol === "SuperAdmin") {
        const newSupervisor = await Supervisor.create({
          email: email,
          password: passwordHash,
          rol: rol,
        });
        return res.status(201).json(newSupervisor);
      } else {
        const newSupervisor = await Supervisor.create({
          email: email,
          password: passwordHash,
          rol: rol,
        });
        //Retorna un objeto de tipo Supervisor con todos sus datos
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
