const { Companion } = require("../db");
const bcrypt = require("bcrypt");
const getOneCompanion = async (req, res) => {
  try {
    const { email, password } = req.body;
    const companion = await Companion.findOne({ where: { email: email } });
    const match = await bcrypt.compare(password, companion.password);
    if (companion && match) {
      res.status(200).json(companion);
    } else {
      res.status(404).json("El Acompañante no se encontro");
    }
  } catch (error) {
    res.status(404).json("El Acompañante no se encontro");
  }
};

module.exports = getOneCompanion;
