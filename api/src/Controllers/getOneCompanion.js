const { Companion, CityTimeZone } = require("../db");
const bcrypt = require("bcrypt");

//Controlador para verificar login de un acompañante y llenar el perfil
const getOneCompanion = async (req, res) => {
  try {
    //Se obtiene el email y contraseña desde el formulario
    const { email, password } = req.body;
    //Se busca el acompañante por email
    let companion = await Companion.findOne({ where: { email: email } });
    //Se compara la contraseña enviada en el formulario contra la hasheada en bd
    const match = await bcrypt.compare(password, companion.password);
    //Si existe el acompañante y la contraseña coincide se procede a responder
    if (companion && match) {
      const timeZoneData = await CityTimeZone.findOne({
        where: { id: companion.CityTimeZoneId },
      });
      companion = { ...companion.dataValues, timeZoneData: timeZoneData };
      //Retorna un acompañante con todos sus datos (Sirve para cargar el perfil)
      res.status(200).json(companion);
    } else {
      //Devuelve error si alguno de los datos no coincide
      res.status(404).json("El Acompañante no se encontro");
    }
  } catch (error) {
    res.status(404).json("El Acompañante no se encontro");
  }
};

module.exports = getOneCompanion;
