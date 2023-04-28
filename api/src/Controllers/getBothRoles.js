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
      return res.status(200).json(response);
    }
  } catch (error) {
    //Si no se encuentra un supervisor, buscar en la tabla de acompañantes
    const { email } = req.body;
    let companion;
    try {
      companion = await Companion.findOne({ where: { email } });
      rol = "Companion";
    } catch (error) {
      //Si también falla la búsqueda de acompañante, responder con error
      return res.status(404).json("No se encontro el usuario");
    }
    if (companion) {
      //Retorna un acompañante con todos sus datos (Sirve para cargar el perfil)
      const response = {
        ...companion.toJSON(),
        rol: rol,
      };
      return res.status(200).json(response);
    }
  }
  //Si no se encuentra un usuario o la contraseña no coincide, responder con error
  res.status(404).json("No se encontro el usuario");
};

//Validacion del usuario autorizado a hacer dicho cambio(debe ser un SuperAdmin)
const requireLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Busca el usuario en la base de datos que solicito la ejecucion del controlador
    const user = await Supervisor.findOne({
      where: { email: email },
    });

    //Comprueba sus datos contra los datos en la bd
    const match = await bcrypt.compare(password, user.password);

    if (user && match) {
      next();
    }
  } catch (error) {
    const { email, password } = req.body;

    // Busca el usuario en la base de datos que solicito la ejecucion del controlador
    const user = await Companion.findOne({
      where: { email: email },
    });
    //Comprueba sus datos contra los datos en la bd
    const match = await bcrypt.compare(password, user.password);
    // Si el usuario es correcto permitir el acceso al controlador de arriba
    if (user && match) {
      next();
    } else {
      res.status(404).json("Error en los datos ingresados");
    }
  }
};
module.exports = { getBothRoles, requireLogin };
