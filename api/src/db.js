const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/aquiestoydb`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

console.log(basename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//*MODELS:
const { Companion, Supervisor, SupervisorShift, CompanionShift } =
  sequelize.models;

//* RELATIONS N-1:
Supervisor.hasMany(Companion);
Companion.belongsTo(Supervisor);
//* RELATIONS N-N SHIFT:
Companion.belongsToMany(CompanionShift, { through: "CompaShift" });
Supervisor.belongsToMany(SupervisorShift, { through: "SupervShift" });



module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
