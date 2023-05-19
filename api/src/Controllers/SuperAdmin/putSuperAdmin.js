const { Supervisor, SupervisorShift, Companion } = require("../../db");

const putSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
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
    supervisor.rol = "SuperAdmin"
    await supervisor.save();
    res.status(200).json(supervisor);
  } catch (error) {
    res.status(500).send("Error al actualizar el supervisor");
  }
};


const requireSuperAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Supervisor.findOne({
    where: { email: email },
  });
  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }
  const match = password === user.password ? true : false;
  if (!match) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }
  if (user.rol !== "SuperAdmin") {
    return res.status(401).send("No autorizado");
  }
  next();
};
module.exports = { putSuperAdmin, requireSuperAdmin };
