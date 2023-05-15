const mailer = require("../mailerConfig/mailer");
const { Supervisor, Companion } = require("../../../db");
const {
  passwordRecoveryCode,
  wrongMail,
} = require("../htmlMails/MailPassword");
const getPasswordRecoveryCode = async (req, res) => {
  try {
    let mailOptions = {};
    const transporter = await mailer();
    const { email } = req.params;
    const cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    let typeUser = "";
    for (let i = 1; i < 7; i++) {
      code += cadena[Math.floor(Math.random() * (26 - 1) + 1)];
    }
    const supervisor = await Supervisor.findOne({ where: { email: email } });
    if (supervisor && supervisor.isActive) {
      typeUser = "Supervisor";
      mailOptions = {
        from: "aquiestoy.prueba01@gmail.com",
        to: email, // //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
        subject: "Recupera tu cuenta en Aqui Estoy!",
        html: passwordRecoveryCode(code),
      };
    }
    const companion = await Companion.findOne({ where: { email: email } });
    if (companion && companion.isActive) {
      typeUser = "Companion";
      mailOptions = {
        from: "aquiestoy.prueba01@gmail.com",
        to: email, // //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
        subject: "Recupera tu cuenta en Aqui Estoy!",
        html: passwordRecoveryCode(code),
      };
    }
    if (!companion && !supervisor) {
      mailOptions = {
        from: "aquiestoy.prueba01@gmail.com",
        to: email, // //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
        subject: "Error al recuperar tu cuenta",
        html: wrongMail(email),
      };
    }
    transporter.sendMail(mailOptions, (error, info) => {
      try {
        return info;
      } catch (error) {
        return error.message;
      }
    });
    res.status(200).json({ code, typeUser, email });
  } catch (error) {
    res.status(404).json("No se pudo mandar el mail");
  }
};
module.exports = getPasswordRecoveryCode;
