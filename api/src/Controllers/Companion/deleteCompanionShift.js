const { Companion, CompanionShift, CityTimeZone } = require("../../db");
const deleteCompanionShift = async (req, res) => {
  try {
    const { id, idShift } = req.body;
    let companion = await Companion.findOne({ where: { id: id }, include: { model: CompanionShift } });
    await companion.removeCompanionShift(idShift);
    await companion.save();
    companion = await Companion.findOne({ where: { id: id }, include: [{ model: CompanionShift }, { model: CityTimeZone }]});

    return res.status(200).json(companion);

  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports = deleteCompanionShift;
