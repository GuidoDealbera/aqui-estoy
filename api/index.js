require("dotenv").config();
const axios = require ('axios');
const port = process.env.PORT || 3001;
const SERVER_URL = process.env.SERVER_URL;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {fillSupervisorShifts} = require("./src/Controllers/Supervisor/getSupervisorShift.js");
const {fillCompanionShifts} = require("./src/Controllers/Companion/getCompanionShift.js");
const postCityTimeZone = require("./src/Controllers/TimeZone/postCityTimeZone.js");
const fetch = require("node-fetch");

axios.defaults.baseURL = process.env.AXIOS_BASE;

conn.sync({ force: false }).then(async () => {
  await fillCompanionShifts();
  await fillSupervisorShifts();
  await postCityTimeZone();
  server.listen(port, () => {
  });
  const url = SERVER_URL;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@admin.com",
      password: "admin123",
      rol: "SuperAdmin",
    }),
  };
  await fetch(url, options);
});
