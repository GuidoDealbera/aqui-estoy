const { Supervisor } = require("../db");
const bcrypt = require("bcrypt");
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
    //Se busca el supervisor por id y se setea isSuperAdmin en el valor opuesto
    supervisor.isSuperAdmin = !supervisor.isSuperAdmin;
    
    await supervisor.save();

    res.status(200).json(supervisor);
  } catch (error) {
    res.status(500).send("Error al actualizar el supervisor");
  }
};
const requireSuperAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  // Busca el usuario en la base de datos
  const user = await Supervisor.findOne({
    where: { email: email }
  });
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  if (!user.isSuperAdmin) {
    return res.status(401).send("No autorizado");
  }
  // Si el usuario es un SuperAdmin y la contraseña es correcta, permitir el acceso al controlador
  next();
};
  module.exports = {putSuperAdmin, requireSuperAdmin};