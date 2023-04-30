const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  fillSupervisorShifts,
} = require("./src/Controllers/Supervisor/getSupervisorShift.js");
const {
  fillCompanionShifts,
} = require("./src/Controllers/Companion/getCompanionShift.js");
const postCityTimeZone = require("./src/Controllers/TimeZone/postCityTimeZone.js");
// conn.sync({ alter: true }).then(async () => {
conn.sync({ force: false }).then(async () => {
  await fillCompanionShifts();
  await fillSupervisorShifts();
  await postCityTimeZone();
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // se imprime en consola para confirmar que el servidor está corriendo
  });
});
