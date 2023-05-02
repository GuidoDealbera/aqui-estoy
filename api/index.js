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
const postSupervisor = require("./src/Controllers/Supervisor/postSupervisor.js");
// conn.sync({ alter: true }).then(async () => {

conn.sync({ force: true }).then(async () => {
  await postSupervisor(
    {},
    {
      status: function (code) {
        console.log("Status:", code);
      },
      json: function (response) {
        console.log("Response:", response);
      },
      send: function (error) {
        console.log("Error:", error);
      },
    }
  );
  console.log("Codigo 500 pero creó el administrador");
  await fillCompanionShifts();
  await fillSupervisorShifts();
  await postCityTimeZone();
  server.listen(port, () => {
    console.log("%s listening at 3001"); // se imprime en consola para confirmar que el servidor está corriendo
  });
});
