const mailer = require("./mailer");
const {
  companionEmailAccountCreated,
  supervisorEmailAccountCreated,
  superAdminEmailAccountCreated,
} = require("./htmlMails/MailCreatedAccount");

const sendEmail = async ({ email, password, rol }, type) => {
  const transporter = await mailer();
  let mailOptionsUserCreated = {};
  switch (rol) {
    case "Companion1":
      mailOptionsUserCreated = {
        from: "aquiestoy.prueba01@gmail.com",
        to: email,
        subject: "Cuenta creada en Aqui Estoy!",
        html: companionEmailAccountCreated(email, password),
      };
      break;
    case "Companion2":
      mailOptionsUserCreated = {
        from: "aquiestoy.prueba01@gmail.com",
        to: email,
        subject: "Cuenta creada en Aqui Estoy!",
        html: companionEmailAccountCreated(email, password),
      };
      break;
    case "Supervisor":
      mailOptionsUserCreated = {
        from: "aquiestoy.prueba01@gmail.com",
        to: email,
        subject: "Cuenta creada en Aqui Estoy!",
        html: supervisorEmailAccountCreated(email, password),
      };
      break;
    case "SuperAdmin":
      mailOptionsUserCreated = {
        from: "aquiestoy.prueba01@gmail.com",
        to: email,
        subject: "Cuenta creada en Aqui Estoy!",
        html: superAdminEmailAccountCreated(email, password),
      };
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
