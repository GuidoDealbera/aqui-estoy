const passwordRecoveryCode = (code) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Recuperación de Contraseña</title>
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
            .code {
                background-color: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 0.5em;
                padding: 1em;
                margin-top: 20px;
                text-align: center;
                display: inline-block;
                font-weight: bold;
                font-size: 1.5em;
            }
        </style>
    </head>
    <body>
        <h1>Recuperación de Contraseña</h1>
        <p>Recientemente solicitaste recuperar tu contraseña en nuestra plataforma. Utiliza el siguiente código de 6 caracteres para completar el proceso:</p>
        <div class="code">
            ${code}
        </div>
        <p>Si no solicitaste un cambio de contraseña, por favor ignora este correo electrónico.</p>
    </body>
    </html>
  `;
};
const wrongMail = (email) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <title>Email no encontrado</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
      }
      
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        text-align: center;
      }
      
      h1 {
        color: #333;
      }
      
      p {
        color: #666;
        margin-bottom: 20px;
      }
      
      .error-message {
        margin-top: 30px;
  
        color: #333;
        padding: 10px;
        border-radius: 5px;
      }
      
      .error-message p {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Email no encontrado</h1>
      <p>Lo sentimos, pero la dirección de correo electrónico proporcionada no pertenece a un usuario activo en nuestra plataforma.</p>
      
      <div class="error-message">
        <p>Verifica la dirección de correo electrónico y asegúrate de que esté registrada correctamente en nuestra plataforma.</p>
      </div>
    </div>
  </body>
  </html>`;
};
const passwordHasChange = (email, password) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <title>Confirmación de Cambio de Contraseña</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
      }
      
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        text-align: center;
      }
      
      h1 {
        color: #333;
        margin-bottom: 20px;
      }
      
      p {
        color: #666;
        margin-bottom: 20px;
      }
      
      .credentials {
        margin-top: 30px;
      }
      
      .credentials h2 {
        color: #333;
        margin-bottom: 10px;
      }
      a{
        color: #FFF;
      }
      .credentials p {
        color: #666;
      }
      
      .email {
        color: #FFF;
        background-color: #5C6BC0;
        padding: 10px 20px;
        border-radius: 3px;
        display: inline-block;
      }
      
      .password {
        color: #FFF;
        background-color: #43A047;
        padding: 10px 20px;
        border-radius: 3px;
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Cambio de Contraseña Exitoso</h1>
      <p>Tu contraseña ha sido cambiada con éxito. A continuación, se encuentran los detalles de tu cuenta:</p>
      
      <div class="credentials">
        <h2>Detalles de la cuenta</h2>
        <p><strong>Correo Electrónico:</strong> <span class="email">${email}</span></p>
        <p><strong>Nueva Contraseña:</strong> <span class="password">${password}</span></p>
      </div>
    </div>
  </body>
  </html>`;
};
module.exports = { passwordRecoveryCode, wrongMail, passwordHasChange };
