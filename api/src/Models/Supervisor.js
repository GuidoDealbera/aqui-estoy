const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Supervisor",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePhoto: {
        type: DataTypes.STRING,
      },
      birthdayDate: {
        type: DataTypes.DATEONLY,
      },

      nationality: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      profession: {
        type: DataTypes.STRING,
      },
      studies: {
        type: DataTypes.TEXT,
      },
      gender: {
        type: DataTypes.STRING,
      },
      rol: {
        type: DataTypes.STRING,
        defaultValue: "Supervisor",
        validate: {
          isIn: [['SuperAdmin', 'Supervisor']],
        },
      },
      isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
      },
    },
    { timestamps: false }
  );
};
