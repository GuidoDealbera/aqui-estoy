const companionEmailAccountCreated = (email, password) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <title>Bienvenido a nuestra fundación</title>
      <style>
          body {
              font-family:Georgia, 'Times New Roman', Times, serif;
              background-color: #f5f5f5;
              color: #1b1554;
              text-align: center;
              padding: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              background-color: aliceblue;
          }
          h1 {
              font-size: 2.5em;
              margin-bottom: 20px;
          }
          p {
              font-size: 1.2em;
              margin-bottom: 10px;
          }
          .credentials {
              background-color: #01cab66f;
              border: 2px solid #ccc;
              border-radius: 2.5em;
              padding: 2em;
              box-shadow: 0em 0em 1em 0.1em #25252597;
              margin-top: 20px;
              text-align: left;
              display: inline-block;
          }
          .credentials p {
              margin: 0;
          }
          img{
             margin-top: 2em;
              width: 15rem;
          }
      </style>
  </head>
  <body>
      <h1>Bienvenido a nuestra fundación</h1>
      <p>A partir de ahora pasas a formar parte de nuestra fundación como acompañante. </p>
      <p>Una cuenta se ha creado para ti para que puedas utilizar nuestra plataforma de reserva de turnos, la misma tiene las siguientes credenciales</p>
      <div class="credentials">
          <p><strong>Correo Electrónico:</strong> ${email}</p>
          <p><strong>Contraseña:</strong> ${password}</p>
      </div>
  </body>
  </html>
`;
};

const supervisorEmailAccountCreated = (email, password) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Bienvenido a nuestra fundación</title>
        <style>
            body {
                font-family:Georgia, 'Times New Roman', Times, serif;
                background-color: #f5f5f5;
                color: #1b1554;
                text-align: center;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: aliceblue;
            }
            h1 {
                font-size: 2.5em;
                margin-bottom: 20px;
            }
            p {
                font-size: 1.2em;
                margin-bottom: 10px;
            }
            .credentials {
                background-color: #01cab66f;
                border: 2px solid #ccc;
                border-radius: 2.5em;
                padding: 2em;
                box-shadow: 0em 0em 1em 0.1em #25252597;
                margin-top: 20px;
                text-align: left;
                display: inline-block;
            }
            .credentials p {
                margin: 0;
            }
            img{
               margin-top: 2em;
                width: 15rem;
            }
        </style>
    </head>
    <body>
        <h1>Bienvenido a nuestra fundación</h1>
        <p>A partir de ahora pasas a formar parte de nuestra fundación como supervisor. </p>
        <p>Una cuenta se ha creado para ti para que puedas utilizar nuestra plataforma de reserva de turnos, la misma tiene las siguientes credenciales</p>
        <div class="credentials">
            <p><strong>Correo Electrónico:</strong> ${email}</p>
            <p><strong>Contraseña:</strong> ${password}</p>
        </div>
    </body>
    </html>
  `;
};

const superAdminEmailAccountCreated = (email, password) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Bienvenido a nuestra fundación</title>
        <style>
            body {
                font-family:Georgia, 'Times New Roman', Times, serif;
                background-color: #f5f5f5;
                color: #1b1554;
                text-align: center;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: aliceblue;
            }
            h1 {
                font-size: 2.5em;
                margin-bottom: 20px;
            }
            p {
                font-size: 1.2em;
                margin-bottom: 10px;
            }
            .credentials {
                background-color: #01cab66f;
                border: 2px solid #ccc;
                border-radius: 2.5em;
                padding: 2em;
                box-shadow: 0em 0em 1em 0.1em #25252597;
                margin-top: 20px;
                text-align: left;
                display: inline-block;
            }
            .credentials p {
                margin: 0;
            }
            img{
               margin-top: 2em;
                width: 15rem;
            }
        </style>
    </head>
    <body>
        <h1>Bienvenido a nuestra fundación</h1>
        <p>A partir de ahora pasas a formar parte de nuestra fundación como superAdmin. </p>
        <p>Una cuenta se ha creado para ti para que puedas utilizar nuestra plataforma de reserva de turnos, la misma tiene las siguientes credenciales</p>
        <div class="credentials">
            <p><strong>Correo Electrónico:</strong> ${email}</p>
            <p><strong>Contraseña:</strong> ${password}</p>
        </div>
    </body>
    </html>
  `;
};
module.exports = {
  companionEmailAccountCreated,
  supervisorEmailAccountCreated,
  superAdminEmailAccountCreated,
};
