const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { fillSupervisorShifts } = require("./src/Controllers/getSupervisorShift.js");
const { fillCompanionShifts } = require("./src/Controllers/getCompanionShift.js");

conn.sync({ force: true }).then(async () => {
  await fillCompanionShifts();
  await fillSupervisorShifts(); 
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // se imprime en consola para confirmar que el servidor está corriendo
  });
});
