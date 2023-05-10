const mailer = require("../mailerConfig/mailer");
const { Supervisor, Companion } = require("../../../db");
const getPasswordRecoveryCode = async (req, res) => {
  try {
    let mailOptions = {};
    const transporter = await mailer();
    const { email } = req.params;
    const cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 1; i < 6; i++) {
      code += cadena[Math.floor(Math.random() * (27 - 1) + 1)];
    }
    console.log(code);
    const supervisor = await Supervisor.findOne({ where: { email: email } });
    if (supervisor) {
      mailOptions = {
        from: "aquiestoy.prueba01@gmail.com",
        to: "carlavega231323@gmail.com", // email, // //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
        subject: "Recupera tu cuenta en Aqui Estoy!",
        text: `${code}`,
      };
    }
    const companion = await Companion.findOne({ where: { email: email } });
    if (companion) {
      mailOptions = {
        from: "aquiestoy.prueba01@gmail.com",
        to: "carlavega231323@gmail.com", // email, // //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
        subject: "Recupera tu cuenta en Aqui Estoy!",
        text: `${code}`,
      };
    }
    if (!companion && !supervisor) {
      mailOptions = {
        from: "aquiestoy.prueba01@gmail.com",
        to: "carlavega231323@gmail.com", // email, // //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
        subject: "Error al recuperar tu cuenta",
        text: `El email proporcionado no pertenece a un usuario activo en la fundacion `,
      };
    }
    transporter.sendMail(mailOptions, (error, info) => {
      try {
        return info;
      } catch (error) {
        return error.message;
      }
    });
    res.status(200).json(code);
  } catch (error) {
    res.status(404).json("No se pudo mandar el mail");
  }
};
module.exports = getPasswordRecoveryCode;
