const {
  Companion,
  CityTimeZone,
  CompanionShift,
  Supervisor,
  SupervisorShift,
} = require("../db");

const bcrypt = require("bcrypt");

//Controlador para verificar login de un Supervisor y llenar el perfil
const getBothRoles = async (req, res) => {
  try {
    const { email } = req.body;
    const companion = await Companion.findOne({
      where: { email: email },
      include: [
        {
          model: CompanionShift,
          through: { attributes: [] },
        },
        {
          model: Supervisor,
          attributes: ["name", "lastName", "phone", "profilePhoto"],
        },
        {
          model: CityTimeZone,
        },
      ],
    });
    if (companion && companion.isActive) {
      //Retorna un acompañante con todos sus datos (Sirve para cargar el perfil)
      return res.status(200).json(companion);
    }
    const supervisor = await Supervisor.findOne({
      where: { email: email },
      include: [
        {
          model: SupervisorShift,
          attributes: ["id", "day", "time", "timezone"],
          through: { attributes: [] },
        },
        {
          model: Companion,
          attributes: ["name", "lastName", "phone", "profilePhoto", "country"],
        },
        {
          model: CityTimeZone,
        },
      ],
    });
    //Si existe el supervisor y la contraseña coincide se procede a responder
    if (supervisor && supervisor.isActive) {
      //Retorna un supervisor con todos sus datos (Sirve para cargar el perfil)
      return res.status(200).json(supervisor);
    }
    if (companion && !companion.isActive) {
      return res
        .status(400)
        .json("Cuenta inactiva comuniquese con el administrador");
    }
    if (supervisor && !supervisor.isActive) {
      return res
        .status(400)
        .json("Cuenta inactiva comuniquese con el administrador");
    } else {
      return res.status(400).json("Los datos ingresados son incorrectos");
    }
  } catch (error) {
    res.status(404).json("No se encontro el usuario");
  }
};

const requireLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Busca el usuario en la base de datos que solicito la ejecucion del controlador
    const supervisor = await Supervisor.findOne({
      where: { email: email },
    });
    if (supervisor && supervisor.isActive) {
      //Comprueba sus datos contra los datos en la bd
      const match = await bcrypt.compare(password, supervisor.password);
      if (match) {
        next();
        return;
      }
    }
    // Si no es un Supervisor, buscar en la tabla de Companion
    const companion = await Companion.findOne({
      where: { email: email },
    });
    if (companion && companion.isActive) {
      //Comprueba sus datos contra los datos en la bd
      const match = await bcrypt.compare(password, companion.password);
      if (match) {
        next();
        return;
      }
    }
    res.status(400).json("Error en los datos ingresados");
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};
module.exports = { getBothRoles, requireLogin };
