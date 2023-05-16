const mailer = require("../mailerConfig/mailer");
const {
  Supervisor,
  Companion,
  SupervisorShift,
  CompanionShift,
} = require("../../../db");
const { addShift } = require("../htmlMails/MailShifts");
const postAddShift = async (req, res) => {
  try {
    const transporter = await mailer();
    let mailOptions = {};
    const { idUser, idShift, rol } = req.body;
    if (rol === "Companion") {
      const companion = await Companion.findOne({ where: { id: idUser } });
      const shift = await CompanionShift.findOne({ where: { id: idShift } });

      let day = "";
      switch (shift.day) {
        case 0:
          day = "Lunes";
          break;
        case 1:
          day = "Martes";
          break;
        case 2:
          day = "Miercoles";
          break;
        case 3:
          day = "Jueves";
          break;
        case 4:
          day = "Viernes";
          break;
        case 5:
          day = "Sabado";
          break;
        case 6:
          day = "Domingo";
          break;

        default:
          break;
      }

      mailOptions = {
        from: "aquiestoy.notificacion@gmail.com",
        to: companion.email, // //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
        subject: "Se ha añadido un nuevo turno en tu agenda de Aqui Estoy!",
        html: addShift(day, shift.time),
      };
      transporter.sendMail(mailOptions, (error, info) => {
        try {
          console.log(error.message);
          return info;
        } catch (error) {
          return error.message;
        }
      });
      res.status(200).json("Se ha enviado el email");
    }
    if (rol === "Supervisor") {
      const supervisor = await Supervisor.findOne({ where: { id: idUser } });
      const shift = await SupervisorShift.findOne({ where: { id: idShift } });
      let day = "";
      switch (shift.day) {
        case 0:
          day = "Lunes";
          break;
        case 1:
          day = "Martes";
          break;
        case 2:
          day = "Miercoles";
          break;
        case 3:
          day = "Jueves";
          break;
        case 4:
          day = "Viernes";
          break;
        case 5:
          day = "Sabado";
          break;
        case 6:
          day = "Domingo";
          break;

        default:
          break;
      }
      mailOptions = {
        from: "aquiestoy.notificacion@gmail.com",
        to: supervisor.email, // //! ACA PUEDEN CAMBIAR ESTE PARAMETRO POR SU PROPIO MAIL PARA PROBAR
        subject: "Se ha añadido un nuevo turno en tu agenda de Aqui Estoy!",
        html: addShift(day, shift.time),
      };
      transporter.sendMail(mailOptions, (error, info) => {
        try {
          console.log(info);
          return info;
        } catch (error) {
          console.log(error.message);
          return error.message;
        }
      });
      res.status(200).json("Se ha enviado el email");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = postAddShift;
