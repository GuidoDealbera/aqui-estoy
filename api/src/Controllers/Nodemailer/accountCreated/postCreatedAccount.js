const mailer = require("../mailerConfig/mailer");
const {superAdminEmailAccountCreated,companionEmailAccountCreated,
  supervisorEmailAccountCreated} = require("../htmlMails/MailCreatedAccount");
const postCreatedAccount = async (req, res) => {
  try {
    const transporter = await mailer();
    let mailOptionsUserCreated = {};
    const { email, password, rol } = req.body;
    if (rol === "Companion1" || rol === "Companion2") {
      mailOptionsUserCreated = {
        from: "aquiestoy.notificacion@gmail.com",
        to: email,
        subject: "Cuenta creada en Aqui Estoy!",
        html: companionEmailAccountCreated(email, password),
      };
    }
    if (rol === "Supervisor") {
      mailOptionsUserCreated = {
        from: "aquiestoy.notificacion@gmail.com",
        to: email,
        subject: "Cuenta creada en Aqui Estoy!",
        html: supervisorEmailAccountCreated(email, password),
      };
    }
    if (rol === "SuperAdmin") {
      mailOptionsUserCreated = {
        from: "aquiestoy.notificacion@gmail.com",
        to: email,
        subject: "Cuenta creada en Aqui Estoy!",
        html: superAdminEmailAccountCreated(email, password),
      };
    }
    await transporter.sendMail(mailOptionsUserCreated, (error, info) => {
      try {
        return info;
      } catch (error) {
        res.status(404).json(error.message);
      }
    });
    res.status(200).json("El mail esta enviado");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = postCreatedAccount;
