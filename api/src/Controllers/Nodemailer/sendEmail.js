const mailer = require("./mailer");

const sendEmail = async ({ email, password, rol }) => {
  const transporter = await mailer();
  let mailOptionsUserCreated = {};
  switch (rol) {
    case "Companion1":
      mailOptionsUserCreated = {
        from: "aquiestoy.prueba01@gmail.com",
        to: email,
        subject: "Cuenta creada en Aqui Estoy!",
        text: `Bienvenido a nuestra fundacion Aqui Estoy, a partir de ahora pasas a formar parte de nuestra fundacion como acompañante. Una cuenta se ah creado para ti para que puedas utilizar nuestra plataforma de reserva de turnos, la misma tiene las siguientes credenciales Correo Electronico: ${email}, Contraseña: ${password}`,
      };
      break;
    case "Companion2":
      mailOptionsUserCreated = {
        from: "aquiestoy.prueba01@gmail.com",
        to: email,
        subject: "Cuenta creada en Aqui Estoy!",
        text: `Bienvenido a nuestra fundacion Aqui Estoy, a partir de ahora pasas a formar parte de nuestra fundacion como acompañante. Una cuenta se ah creado para ti para que puedas utilizar nuestra plataforma de reserva de turnos, la misma tiene las siguientes credenciales Correo Electronico: ${email}, Contraseña: ${password}`,
      };
      break;
    case "Supervisor":
      mailOptionsUserCreated = {
        from: "aquiestoy.prueba01@gmail.com",
        to: email,
        subject: "Cuenta creada en Aqui Estoy!",
        text: `Bienvenido a nuestra fundacion Aqui Estoy, a partir de ahora pasas a formar parte de nuestra fundacion como Supervisor. Una cuenta se ah creado para ti para que puedas utilizar nuestra plataforma de reserva de turnos, la misma tiene las siguientes credenciales Correo Electronico: ${email}, Contraseña: ${password}`,
      };
      break;
    case "SuperAdmin":
      mailOptionsUserCreated = {
        from: "aquiestoy.prueba01@gmail.com",
        to: email,
        subject: "Cuenta creada en Aqui Estoy!",
        text: `Bienvenido a nuestra fundacion Aqui Estoy, a partir de ahora pasas a formar parte de nuestra fundacion como SuperAdmin. Una cuenta se ah creado para ti para que puedas utilizar nuestra plataforma de reserva de turnos, la misma tiene las siguientes credenciales Correo Electronico: ${email}, Contraseña: ${password}`,
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
