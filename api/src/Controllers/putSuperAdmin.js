const { Supervisor } = require("../db");
//Funcion para pasar un usuario tipo Supervisor a superAdmin

//Funcion a probar
const putSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const supervisor = await Supervisor.findOne({
      where: { id: id },
    });
    if (!supervisor) {
      return res.status(404).send("Supervisor no encontrado");
    }
    await supervisor.save();
    //Se busca el supervisor por id y se setea isSuperAdmin en el valor opuesto
    supervisor.isSuperAdmin = !supervisor.isSuperAdmin;

    res.status(200).json(supervisor);
  } catch (error) {
    res.status(500).send("Error al actualizar el supervisor");
  }
};
const requireSuperAdmin = (req, res, next) => {
    const {user}= req.body
    if (!user || !user.isSuperAdmin) {
      return res.status(401).send("No autorizado");
    }
  
    // Si el usuario es un superAdmin, permitir el acceso al controlador
    next();
  };
  module.exports = {putSuperAdmin, requireSuperAdmin};