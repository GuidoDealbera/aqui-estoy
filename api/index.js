const server = require("./src/app.js");
const { conn } = require("../api/src/db.js");

conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log("% listening at 3001"); // eslint-disable-line no-console
  });
});
