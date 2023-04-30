const { Companion, CityTimeZone } = require("../../db");
const bcrypt = require("bcrypt");

//Controlador para verificar login de un acompañante y llenar el perfil
const getOneCompanion = async (req, res) => {
  try {
    const { email } = req.body;
      let companion;
      companion = await Companion.findOne({ where: { email } });
      rol = "Companion";
      if (companion) {
        //Retorna un acompañante con todos sus datos (Sirve para cargar el perfil)
        const response = {
          ...companion.toJSON(),
          rol: rol,
        };
        res.status(200).json(response);
      } else {
        res.status(400).json("Los datos ingresados son incorrectos");
      }
  } catch (error) {
    res.status(404).json("El Acompañante no se encontro");
  }
};

module.exports = getOneCompanion;
