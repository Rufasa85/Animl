'use strict';
module.exports = function(sequelize, DataTypes) {
  var sighting = sequelize.define('sighting', {
    userId: DataTypes.INTEGER,
    animalId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        models.sighting.belongsTo(models.user);
        models.sighting.belongsTo(models.animal);
      }
    }
  });
  return sighting;
};