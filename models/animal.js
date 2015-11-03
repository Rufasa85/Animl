'use strict';
module.exports = function(sequelize, DataTypes) {
  var animal = sequelize.define('animal', {
    name: DataTypes.STRING,
    wantedScore: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.animal.belongsToMany(models.user, {through:'usersAnimals'});
        models.animal.hasMany(models.sighting);
      }
    }
  });
  return animal;
};