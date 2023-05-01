const { Supervisor } = require("../../db");
const bcrypt = require("bcrypt");

//Controlador para crear un Supervisor
let firstRequest = true
const postSupervisor = async (req, res) => {
  try {
    if(firstRequest){
      const passwordHash = await bcrypt.hashSync("admin123", 10);
      const startingSuperAdmin = await Supervisor.create({
        email: "admin@admin.com",
        password: passwordHash,
        isSuperAdmin: true,
      });
      firstRequest = false;
      return res.status(201).json(startingSuperAdmin);
    }else{
    const { email, password, rol } = req.body;
    //El superAdmin debe ingresar email y contraseña para poder crear un nuevo supervisor
    const exist = Supervisor.findOne({ where: { email: email } });
    if (exist === null) {
      return res.status(400).send("El supervisor ya existe");
    }
    if (email && password) {
      // Generar hash de la contraseña
      const passwordHash = await bcrypt.hashSync(password, 10);
      //Crear el Supervisor con el email ingresado y password hasheada y si es superAdmin o no
      if (rol == "SuperAdmin") {
        const newSupervisor = await Supervisor.create({
          email: email,
          password: passwordHash,
          isSuperAdmin: true,
        });
        return res.status(201).json(newSupervisor);
      } else {
        const newSupervisor = await Supervisor.create({
          email: email,
          password: passwordHash,
          isSuperAdmin: false,
        });
        //Retorna un objeto de tipo Supervisor con todos sus datos
        return res.status(201).json(newSupervisor);
      }
    } else {
     return res.status(400).json({ error: "Faltan datos obligatorios" });
    }}
  } catch (error) {
   res.status(500)
   res.json({ error: "Error del servidor al postear Supervisor" });
  }
};

module.exports = postSupervisor;
