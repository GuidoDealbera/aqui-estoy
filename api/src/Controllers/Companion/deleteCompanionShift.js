const { Companion } = require("../../db");
const deleteCompanionShift = async (req, res) => {
  try {
    const { id, idShift } = req.body;
    const companion = await Companion.findOne({ where: { id: id } });
    if (companion && companion.isSuperCompanion) {
      companion.removeCompanionShift(idShift);
      res.status(200).json("Turno eliminado");
    } else {
      res
        .status(400)
        .json(
          "el Acompañante no existe o no esta autorizado para eliminar turnos"
        );
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = deleteCompanionShift;
