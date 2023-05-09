const mailer = require("./mailer");
const {
  companionEmailAccountCreated,
  supervisorEmailAccountCreated,
  superAdminEmailAccountCreated,
} = require("./htmlMails/MailCreatedAccount");

const sendEmail = async (user, type) => {
  const transporter = await mailer();
  let mailOptionsUserCreated = {};

  switch (type) {
    case "accountCreated":
      const { email, password, rol } = user;
      switch (rol) {
        case "Companion1":
          mailOptionsUserCreated = {
            from: "aquiestoy.prueba01@gmail.com",
            to: email, //"carlavega231323@gmail.com", //, //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
            subject: "Cuenta creada en Aqui Estoy!",
            html: companionEmailAccountCreated(email, password),
          };
          break;
        case "Companion2":
          mailOptionsUserCreated = {
            from: "aquiestoy.prueba01@gmail.com",
            to: email, //"carlavega231323@gmail.com", //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
            subject: "Cuenta creada en Aqui Estoy!",
            html: companionEmailAccountCreated(email, password),
          };
          break;
        case "Supervisor":
          mailOptionsUserCreated = {
            from: "aquiestoy.prueba01@gmail.com",
            to: email, //"carlavega231323@gmail.com", //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
            subject: "Cuenta creada en Aqui Estoy!",
            html: supervisorEmailAccountCreated(email, password),
          };
          break;
        case "SuperAdmin":
          mailOptionsUserCreated = {
            from: "aquiestoy.prueba01@gmail.com",
            to: email, //"carlavega231323@gmail.com", //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
            subject: "Cuenta creada en Aqui Estoy!",
            html: superAdminEmailAccountCreated(email, password),
          };
          break;
        default:
          break;
      }
      break;

    default:
      break;
  }

  await transporter.sendMail(mailOptionsUserCreated, (error, info) => {
    try {
      return info;
    } catch (error) {
      return error.message;
    }
  });
};
module.exports = sendEmail;
