const { Supervisor, Companion } = require("../../../db");
const bcrypt = require("bcrypt");
const mailer = require("../mailerConfig/mailer");
const { passwordHasChange } = require("../htmlMails/MailPassword");
const putUserPassword = async (req, res) => {
  try {
    const transporter = await mailer();
    const { typeUser, email, password } = req.body;
    const passwordHash = await bcrypt.hashSync(password, 10);
    let mailOptions = {};

    if (typeUser === "Companion") {
      const companion = await Companion.findOne({ where: { email: email } });
      if (companion && companion.isActive) {
        await Companion.update(
          { password: passwordHash },
          { where: { id: companion.id } }
        );
        mailOptions = {
          from: "aquiestoy.prueba01@gmail.com",
          to: email, // //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
          subject: "Tu contraseña ha sido cambiada",
          html: passwordHasChange(email, password),
        };

        transporter.sendMail(mailOptions, (error, info) => {
          try {
            return info;
          } catch (error) {
            return error.message;
          }
        });
        res.status(200).json("El usuario se ha actualizado");
      }
    }
    if (typeUser === "Supervisor") {
      const supervisor = await Supervisor.findOne({ where: { email: email } });
      if (supervisor && supervisor.isActive) {
        await Supervisor.update(
          { password: passwordHash },
          { where: { email: email } }
        );
        mailOptions = {
          from: "aquiestoy.prueba01@gmail.com",
          to: email, // //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
          subject: "Tu contraseña ha sido cambiada",
          html: passwordHasChange(email, password),
        };
        transporter.sendMail(mailOptions, (error, info) => {
          try {
            return info;
          } catch (error) {
            return error.message;
          }
        });
        res.status(200).json("El usuario se ha actualizado");
      }
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
module.exports = putUserPassword;
