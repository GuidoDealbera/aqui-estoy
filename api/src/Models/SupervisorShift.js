const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "SupervisorShift",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      day: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 6
        }
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
   /*     validate: {
          min: 1,
          max: 24
        }*/
      },
      timezone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
      maxSupervisors :{
        type: DataTypes.INTEGER,
        defaultValue : 2,
      },
      hasRules :{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
          },
    { timestamps: false }
  );
}
