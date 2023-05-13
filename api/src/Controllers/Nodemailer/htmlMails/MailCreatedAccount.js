const companionEmailAccountCreated = (email, password) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Bienvenido a nuestra fundación</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #ffffff;
                color: #333333;
                text-align: center;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            h1 {
                font-size: 2.5em;
                margin-bottom: 20px;
                color: #2E8BC0;
            }
            p {
                font-size: 1.1em;
                margin-bottom: 10px;
                line-height: 1.5;
            }
            .credentials {
                background-color: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 0.5em;
                padding: 2em;
                margin-top: 20px;
                text-align: left;
                display: inline-block;
            }
            .credentials p {
                margin: 0;
                margin-bottom: 5px;
            }
            a {
                display: inline-block;
                background-color: #2E8BC0;
                color: #ffffff;
                text-decoration: none;
                font-weight: bold;
                padding: 10px 20px;
                margin-top: 20px;
                border-radius: 5px;
            }
            a:hover {
                background-color: #1c597a;
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
        <a href="https://aefront-production.up.railway.app/">Click aquí para ir a la plataforma! .</a>
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
                  font-family: Arial, sans-serif;
                  background-color: #ffffff;
                  color: #333333;
                  text-align: center;
                  padding: 20px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
              }
              h1 {
                  font-size: 2.5em;
                  margin-bottom: 20px;
                  color: #2E8BC0;
              }
              p {
                  font-size: 1.1em;
                  margin-bottom: 10px;
                  line-height: 1.5;
              }
              .credentials {
                  background-color: #f8f9fa;
                  border: 1px solid #dee2e6;
                  border-radius: 0.5em;
                  padding: 2em;
                  margin-top: 20px;
                  text-align: left;
                  display: inline-block;
              }
              .credentials p {
                  margin: 0;
                  margin-bottom: 5px;
              }
              a {
                  display: inline-block;
                  background-color: #2E8BC0;
                  color: #ffffff;
                  text-decoration: none;
                  font-weight: bold;
                  padding: 10px 20px;
                  margin-top: 20px;
                  border-radius: 5px;
              }
              a:hover {
                  background-color: #1c597a;
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
          <a href="https://aefront-production.up.railway.app/">Click aquí para ir a la plataforma! .</a>
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
                  font-family: Arial, sans-serif;
                  background-color: #ffffff;
                  color: #333333;
                  text-align: center;
                  padding: 20px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
              }
              h1 {
                  font-size: 2.5em;
                  margin-bottom: 20px;
                  color: #2E8BC0;
              }
              p {
                  font-size: 1.1em;
                  margin-bottom: 10px;
                  line-height: 1.5;
              }
              .credentials {
                  background-color: #f8f9fa;
                  border: 1px solid #dee2e6;
                  border-radius: 0.5em;
                  padding: 2em;
                  margin-top: 20px;
                  text-align: left;
                  display: inline-block;
              }
              .credentials p {
                  margin: 0;
                  margin-bottom: 5px;
              }
              a {
                  display: inline-block;
                  background-color: #2E8BC0;
                  color: #ffffff;
                  text-decoration: none;
                  font-weight: bold;
                  padding: 10px 20px;
                  margin-top: 20px;
                  border-radius: 5px;
              }
              a:hover {
                  background-color: #1c597a;
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
          <a href="https://aefront-production.up.railway.app/">Click aquí para ir a la plataforma! .</a>
      </body>
      </html>
    `;
};

module.exports = {
  companionEmailAccountCreated,
  supervisorEmailAccountCreated,
  superAdminEmailAccountCreated,
};
