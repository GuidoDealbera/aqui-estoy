const sendEmail = require("./sendEmail");

const postEmailController = async (req, res) => {
  try {
    console.log("body", req.body);
    await sendEmail(req.body);
    res.status(200).json("Tu correo fue enviado");
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = postEmailController;
