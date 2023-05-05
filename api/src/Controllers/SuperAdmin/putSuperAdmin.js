const { Supervisor, SupervisorShift, Companion } = require("../../db");
const bcrypt = require("bcrypt");

//Controlador para convertir un usuario tipo Supervisor a SuperAdmin
const putSuperAdmin = async (req, res) => {
  try {
    //Requiere el id del supervisor a modificar
    const { id } = req.params;
    //Busca el supervisor en bd
    const supervisor = await Supervisor.findOne({
      where: { id: id },
      include: [
        {
          model: Companion,
        },
        {
          model: SupervisorShift,
          attributes: ["id", "day", "time", "timezone"],
          through: { attributes: [] },
        },
      ]
    });
    if (!supervisor) {
      return res.status(404).send("Supervisor no encontrado");
    }
    //Se setea isSuperAdmin en el valor opuesto(esto permite bajar un superAdmin en caso de error)
    supervisor.rol = "SuperAdmin"
    //Actualiza el supervisor en bd con el nuevo valor de isSuperAdmin
    await supervisor.save();
    //Retorna un supervisor con todos sus datos
    res.status(200).json(supervisor);
  } catch (error) {
    res.status(500).send("Error al actualizar el supervisor");
  }
};

//Validacion del usuario autorizado a hacer dicho cambio(debe ser un SuperAdmin)
const requireSuperAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  // Busca el usuario en la base de datos que solicito la ejecucion del controlador
  const user = await Supervisor.findOne({
    where: { email: email },
  });
  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }
  //Comprueba sus datos contra los datos en la bd
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }
  if (user.rol !== "SuperAdmin") {
    return res.status(401).send("No autorizado");
  }
  // Si el usuario es un SuperAdmin y la contraseña es correcta,
  // permitir el acceso al controlador de arriba
  next();
};
module.exports = { putSuperAdmin, requireSuperAdmin };
