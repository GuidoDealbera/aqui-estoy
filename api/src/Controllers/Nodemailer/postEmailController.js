const sendEmail = require("./sendEmail");

const postEmailController = async (req, res) => {
  try {
    await sendEmail(req.body, req.body.type);
    res.status(200).json("Tu correo fue enviado");
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = postEmailController;
