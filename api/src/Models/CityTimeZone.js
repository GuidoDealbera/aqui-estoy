const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "CityTimeZone",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      zoneName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      offSet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
