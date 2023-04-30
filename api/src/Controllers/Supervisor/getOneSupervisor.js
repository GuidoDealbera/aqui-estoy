const { Supervisor, CityTimeZone } = require("../../db");
const bcrypt = require("bcrypt");

//Controlador para verificar login de un Supervisor y llenar el perfil
const getOneSupervisor = async (req, res) => {
  try {
    let supervisor;
    let rol;
    //Se obtiene el email y contraseña desde el formulario
    const { email } = req.body;
    //Se busca el supervisor por email
    supervisor = await Supervisor.findOne({ where: { email } });
    rol = "Supervisor";
    if(supervisor.isSuperAdmin){
      rol = "SuperAdmin"
    }
    //Si existe el supervisor y la contraseña coincide se procede a responder
    if (supervisor) {
      //Retorna un supervisor con todos sus datos (Sirve para cargar el perfil)
      const response = {
        ...supervisor.toJSON(),
        rol: rol,
      };
      res.status(200).json(response);
    } else {
      //Devuelve error si alguno de los datos no coincide
      res.status(404).json("El Supervisor no se encontro");
    }
  } catch (error) {
    res.status(404).json("El Supervisor no se encontro");

  }
};

module.exports = getOneSupervisor;
