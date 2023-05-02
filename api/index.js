require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  fillSupervisorShifts,
} = require("./src/Controllers/Supervisor/getSupervisorShift.js");
const {
  fillCompanionShifts,
} = require("./src/Controllers/Companion/getCompanionShift.js");
const postCityTimeZone = require("./src/Controllers/TimeZone/postCityTimeZone.js");
const fetch = require('node-fetch');
// conn.sync({ alter: true }).then(async () => {



conn.sync({ force: false }).then(async () => {
  
  await fillCompanionShifts();
  await fillSupervisorShifts();
  await postCityTimeZone();
  server.listen(port, () => {
    console.log("%s listening at 3001"); // se imprime en consola para confirmar que el servidor está corriendo
  });
  const url = 'http://localhost:3001/postSupervisor';
  // Parámetros de la petición POST
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@admin.com', password: 'admin123', rol: "SuperAdmin" })
    };

  // Realizar la petición POST
  await fetch(url, options);

});
