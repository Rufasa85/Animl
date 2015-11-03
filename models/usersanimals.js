'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersAnimals = sequelize.define('usersAnimals', {
    userId: DataTypes.INTEGER,
    animalId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersAnimals;
};