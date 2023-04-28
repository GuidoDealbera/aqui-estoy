const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  fillSupervisorShifts,
} = require("./src/Controllers/getSupervisorShift.js");
const {
  fillCompanionShifts,
} = require("./src/Controllers/getCompanionShift.js");
const postCityTimeZone = require("./src/Controllers/postCityTimeZone.js");
conn.sync({ alter: true }).then(async () => {
// conn.sync({ force: true }).then(async () => {
  await fillCompanionShifts();
  await fillSupervisorShifts();
  await postCityTimeZone();
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // se imprime en consola para confirmar que el servidor está corriendo
  });
});
