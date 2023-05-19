const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const { DB_CONEX } = process.env;

const sequelize = new Sequelize(
  DB_CONEX,

  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/Models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/Models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Companion, Supervisor, SupervisorShift, CompanionShift, CityTimeZone } =
  sequelize.models;

Supervisor.hasMany(Companion);
Companion.belongsTo(Supervisor);
CityTimeZone.hasMany(Companion);
Companion.belongsTo(CityTimeZone);
CityTimeZone.hasMany(Supervisor);
Supervisor.belongsTo(CityTimeZone);
Companion.belongsToMany(CompanionShift, { through: "CompaShift" });
CompanionShift.belongsToMany(Companion, { through: "CompaShift" });

Supervisor.belongsToMany(SupervisorShift, { through: "SupervShift" });
SupervisorShift.belongsToMany(Supervisor, { through: "SupervShift" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
