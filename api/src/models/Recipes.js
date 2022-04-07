const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipes', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, //me generea automaticamente un UUID4
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    summary:{
      type: DataTypes.STRING
    },
    spoonacularScore:{
      type: DataTypes.FLOAT
    },
    healthScore:{
      type: DataTypes.FLOAT
    },
    analyzedInstructions:{
      type: DataTypes.JSON
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    }
  });
};
