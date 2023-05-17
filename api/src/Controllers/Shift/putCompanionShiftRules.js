const { CompanionShift, Companion } = require("../../db");

const putCompanionShiftRules = async (req, res) => {
  try {
    const { shiftId } = req.body;
    for (const id of shiftId) {
      const shift = await CompanionShift.findByPk(id);
      shift.hasRules = false;
      await shift.save();
    }
    let shifts = await CompanionShift.findAll({
      include: {
        model: Companion,
        through: { attributes: [] },
      },
      order: [["id", "ASC"]],
    });
    const shiftsWithCount = shifts.map((shift) => ({
      shiftId: shift.id,
      day: shift.day,
      time: shift.time,
      shiftCompanions: shift.Companions,
      companionCount: shift.Companions.length,
      maxCompanions: shift.maxCompanions,
      hasRules: shift.hasRules,
    }));
    return res.json(shiftsWithCount);
  } catch (error) {
    res.status(500).json("Fallo al hacer un put Companion Shift Rules");
  }
};
module.exports = putCompanionShiftRules;
