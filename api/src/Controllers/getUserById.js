const { Supervisor, Companion } = require("../db");
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundS = await Supervisor.findOne({ where: { id: id } });
    const foundC = await Companion.findOne({ where: { id: id } });
    if (foundS) {
      res.status(200).json(foundS);
    }
    if (foundC) {
      res.status(200).json(foundC);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = getUserById;
