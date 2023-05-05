const { CompanionShift, Supervisor } = require("../../db");
const { Companion } = require("../../db");

const assignCompanionShift = async (req, res) => {
  try {
    const { idCompanion } = req.params;
    const companion = await Companion.findOne({ where: { id: idCompanion } });
    const { idShift } = req.body;
    const shift = await CompanionShift.findOne({ where: { id: idShift } });

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
