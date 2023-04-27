const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// conn.sync({ alter: true }).then(() => {
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log("% listening at 3001"); // eslint-disable-line no-console
  });
});
