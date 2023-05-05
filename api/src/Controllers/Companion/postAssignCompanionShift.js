const { CompanionShift } = require("../../db");
const { Companion } = require("../../db");

const assignCompanionShift = async (req, res) => {
  try {
    const { idCompanion } = req.params;
    const companion = await Companion.findOne({ where: { id: idCompanion } });
    const { idShift, rol } = req.body;
    const shift = await CompanionShift.findOne({ where: { id: idShift } });

    if (companion.isSuperCompanion) {
      await companion.addCompanionShifts(shift);
      const updatedCompanion = await Companion.findOne({
        where: { id: idCompanion },
        include: [{ model: CompanionShift, through: { attributes: [] } }],
      });
      const response = {
        ...updatedCompanion.toJSON(),
        rol: rol,
      };
      res.json(response);
      return;
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
        include: [{ model: CompanionShift, through: { attributes: [] } }],
      });
      const response = {
        ...updatedCompanion.toJSON(),
        rol: rol,
      };
      res.json(response);
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al asignar turno");
  }
};

module.exports = assignCompanionShift;
