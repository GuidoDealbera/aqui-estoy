const mailer = require("../mailerConfig/mailer");
const {
  Supervisor,
  Companion,
  SupervisorShift,
  CompanionShift,
} = require("../../../db");
const postDeleteShift = async (req, res) => {
  try {
    const transporter = await mailer();
    let mailOptions = {};
    const { idUser, idShift, rol } = req.body;
    if (rol === "Companion") {
      const companion = await Companion.findOne({ where: { id: idUser } });
      const shift = CompanionShift.findOne({ where: { id: idShift } });
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
      res.status(200).json("Se ha enviado el email");
    }
    if (rol === "Supervisor") {
      const supervisor = await Supervisor.findOne({ where: { id: idUser } });
      const shift = SupervisorShift.findOne({ where: { id: idShift } });
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

      res.status(200).json("Se ha enviado el email");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = postDeleteShift;
