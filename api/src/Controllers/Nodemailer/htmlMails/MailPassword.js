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
  return `${email}`;
};
const passwordHasChange = (email, password) => {
  return `${email} ${password}`;
};
module.exports = { passwordRecoveryCode, wrongMail, passwordHasChange };
