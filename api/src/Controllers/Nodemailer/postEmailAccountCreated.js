const { sendEmail } = require("./mailer");

const postEmailAccountCreated = (req, res) => {
  // const { to, subject, text } = req.body;
  try {
    sendEmail();
    res.status(200).json("email enviado");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = postEmailAccountCreated;
