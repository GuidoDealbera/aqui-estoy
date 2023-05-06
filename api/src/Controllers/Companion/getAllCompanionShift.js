const { CompanionShift } = require("../../db");
const { Companion } = require("../../db");

const getAllCompanionShift = async (req, res) => {
  try {
    const shifts = await Companion.findAll({
      include: {
        model: CompanionShift,
        through: { attributes: [] },
        required: true,
      },
    });
    res.status(200).json(shifts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getAllCompanionShift;
