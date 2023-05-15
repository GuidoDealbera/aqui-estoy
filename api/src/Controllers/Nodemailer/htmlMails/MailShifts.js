const addShift = (day, time) => {
  return `<!DOCTYPE html>
  <html>
  <head>

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
      <h1>Se ha agregado un turno en tu agenda de Aqui Estoy!</h1>
      <p>Un turno ha sido agregado:</p>
      
      <div class="credentials">
        <h2>Detalles del turno</h2>
        <p><strong>Dia:</strong> <span class="email">${day}</span></p>
        <p><strong>Nueva Hora:</strong> <span class="password">${time}</span></p>
      </div>
    </div>
  </body>
  </html>`;
};
const deleteShift = (day, time) => {
  return `<!DOCTYPE html>
  <html>
  <head>

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
      <h1>Se ha eliminado un turno en tu agenda de Aqui Estoy!</h1>
      <p>Un turno ha sido eliminado:</p>
      
      <div class="credentials">
        <h2>Detalles del turno</h2>
        <p><strong>Dia:</strong> <span class="email">${day}</span></p>
        <p><strong>Nueva Hora:</strong> <span class="password">${time}</span></p>
      </div>
    </div>
  </body>
  </html>`;
};
module.exports = { addShift, deleteShift };
