const { Supervisor } = require("../db");
const { Companion } = require("../db");
const bcrypt = require("bcrypt");

//Controlador para verificar login de un Supervisor y llenar el perfil
const getBothRoles = async (req, res) => {
  try {
    //Se obtiene el email y contraseña desde el formulario
    const { email, password } = req.body;
    //Se busca el supervisor por email
    const supervisor = await Supervisor.findOne({ where: { email } });
    //Se compara la contraseña enviada en el formulario contra la hasheada en bd
    const match = await bcrypt.compare(password, supervisor.password);
    //Si existe el supervisor y la contraseña coincide se procede a responder
    if (supervisor && match) {
      //Retorna un supervisor con todos sus datos (Sirve para cargar el perfil)
      return res.status(200).json({ supervisor });
    } 
  } catch (error) {
    //Si no se encuentra un supervisor, buscar en la tabla de acompañantes
    const { email, password } = req.body;
    let companion;
    try {
      companion = await Companion.findOne({ where: { email: email } });
    } catch (error) {
      //Si también falla la búsqueda de acompañante, responder con error
      return res.status(404).json("No se encontro el usuario");
    }
    if (companion) {
      //Se compara la contraseña enviada en el formulario contra la hasheada en bd
      const match = await bcrypt.compare(password, companion.password);
      //Si existe el acompañante y la contraseña coincide se procede a responder
      if (match) {
        //Retorna un acompañante con todos sus datos (Sirve para cargar el perfil)
        return res.status(200).json(companion);
      } 
    }
  }
  //Si no se encuentra un usuario o la contraseña no coincide, responder con error
  res.status(404).json("No se encontro el usuario");
};

module.exports = getBothRoles;