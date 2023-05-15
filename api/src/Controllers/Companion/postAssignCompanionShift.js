const { CompanionShift, Supervisor, CityTimeZone } = require("../../db");
const { Companion } = require("../../db");

const assignCompanionShift = async (req, res) => {
  try {
    const { idCompanion } = req.params;
    const companion = await Companion.findOne({ where: { id: idCompanion } });
    const { idShift } = req.body;
    const shift = await CompanionShift.findOne({ where: { id: idShift } });

     // Verificar si el turno ya tiene el número máximo de companions asignados
     const currentCompanions = await shift.getCompanions();
     const maxCompanions = shift.maxCompanions;
 
     if (currentCompanions.length >= maxCompanions) {
       return res.status(404).json({ error: "El turno ya tiene el máximo de acompañantes asignados" });
     }

    if (companion.rol === "Companion2") {
      await companion.addCompanionShifts(shift);
      const updatedCompanion = await Companion.findOne({
        where: { id: idCompanion },
          include: [
            {
              model: CompanionShift,
              through: { attributes: [] },
            },
            {
              model: Supervisor,
            },
            {
              model: CityTimeZone,
            },
          ],
        },
      );
      return res.json(updatedCompanion);
    }

    const hasShifts = await Companion.findOne({
      where: { id: idCompanion },
      include: [{ model: CompanionShift }],
    });

    if (hasShifts.CompanionShifts.length > 0) {
      res.status(400).send("El acompañante ya cuenta con 1 turno asignado");
      return;
    } else {
      await companion.addCompanionShifts(shift);
      const updatedCompanion = await Companion.findOne({
        where: { id: idCompanion },
          include: [
            {
              model: CompanionShift,
              attributes: ["id", "day", "time", "timezone"],
              through: { attributes: [] },
            },
            {
              model: Supervisor,
            },
            {
              model: CityTimeZone,
            },
          ],
        },
      );
      return res.json(updatedCompanion);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al asignar turno");
  }
};

module.exports = assignCompanionShift;
