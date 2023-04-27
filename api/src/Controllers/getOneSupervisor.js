const { Supervisor } = require("../db");
const bcrypt = require("bcrypt");

//Controlador para verificar login de un Supervisor y llenar el perfil
const getOneSupervisor = async (req, res) => {
  try {
    //Se obtiene el email y contraseña desde el formulario
    const { email, password } = req.body;

    //Se busca el supervisor por email
    const supervisor = await Supervisor.findOne({ where: { email } });
    //Se compara la contraseña enviada en el formulario contra la hasheada en bd
    const match = await bcrypt.compare(password, supervisor.password);
    //Si existe el acompañante y la contraseña coincide se procede a responder
    if (supervisor && match) {
      //Retorna un supervisor con todos sus datos (Sirve para cargar el perfil)
      return res.status(200).json({ supervisor });
    } else {
      //Devuelve error si alguno de los datos no coincide
      res.status(400).json("Supervisor no encontrado");
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = getOneSupervisor;
