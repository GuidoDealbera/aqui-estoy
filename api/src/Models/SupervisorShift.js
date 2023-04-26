const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "SupervisorShift",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      timezone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  )}