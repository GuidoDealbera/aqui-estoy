const { Supervisor } = require("../db");
const { Companion } = require("../db");
const bcrypt = require("bcrypt");

//Controlador para verificar login de un Supervisor y llenar el perfil
const getBothRoles = async (req, res) => {
  try {
    let supervisor;
    let rol;
    //Se obtiene el email y contraseña desde el formulario
    const { email } = req.body;
    //Se busca el supervisor por email
    supervisor = await Supervisor.findOne({ where: { email } });
    rol = "Supervisor";
    //Si existe el supervisor y la contraseña coincide se procede a responder
    if (supervisor) {
      //Retorna un supervisor con todos sus datos (Sirve para cargar el perfil)
      const response = {
        ...supervisor.toJSON(),
        rol: rol,
      };
      res.status(200).json(response);
    } else {
      const { email } = req.body;
      let companion;
      let rol;
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
    }
  } catch (error) {
    //Si no se encuentra un supervisor, buscar en la tabla de acompañantes

    res.status(404).json("No se encontro el usuario");
  }
};

//Validacion del usuario autorizado a hacer dicho cambio(debe ser un SuperAdmin)
const requireLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Busca el usuario en la base de datos que solicito la ejecucion del controlador
    const supervisor = await Supervisor.findOne({
      where: { email: email },
    });
    if (supervisor) {
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
    if (companion) {
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
