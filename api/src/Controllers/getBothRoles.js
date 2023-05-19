const {Companion,CityTimeZone,CompanionShift,Supervisor,SupervisorShift} = require("../db");
const bcrypt = require("bcrypt");

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
    if (supervisor && supervisor.isActive) {
      return res.status(200).json(supervisor);
    }
    if (companion && !companion.isActive) {
      return res.status(400).json("Cuenta inactiva comuniquese con el administrador");
    }
    if (supervisor && !supervisor.isActive) {
      return res.status(400).json("Cuenta inactiva comuniquese con el administrador");
    } else {
      return res.status(400).json("Los datos ingresados son incorrectos");
    }
  } catch (error) {
   return res.status(404).json("No se encontro el usuario");
  }
};

const requireLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const supervisor = await Supervisor.findOne({
      where: { email: email },
    });
    if (supervisor && supervisor.isActive) {
      const match = await bcrypt.compare(password, supervisor.password);
      if (match) {
        next();
        return;
      }
    }
    const companion = await Companion.findOne({
      where: { email: email },
    });
    if (companion && companion.isActive) {
      const match = await bcrypt.compare(password, companion.password);
      if (match) {
        next();
        return;
      }
    }
   return res.status(401).json("Error en los datos ingresados");
  } catch (error) {
   return res.status(500).json("Error interno del servidor");
  }
};
module.exports = { getBothRoles, requireLogin };
