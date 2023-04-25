const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Companion = sequelize.define('Companion', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    profilePhoto: {
        type: DataTypes.BLOB, 
    },
    birthdate:{
        type: DataTypes.DATEONLY, 
    },
    nacionality:{
        type: DataTypes.STRING, 
    },
    country:{
        type: DataTypes.STRING, 
    },
    city:{
        type: DataTypes.STRING, 
    },
    phone:{
        type: DataTypes.STRING, 
    },
    profession:{
        type: DataTypes.STRING, 
    },
    studies:{
        type: DataTypes.STRING, 
    },
    gender:{
        type: DataTypes.STRING, 
    },
  }, {
    timestamps: false,
  });

  return Companion;
};