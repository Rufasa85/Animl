'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'sightings',
      'latitude',
      {
        type: Sequelize.FLOAT,
        allowNull: false,
        default: 0.0
      }
    )
    queryInterface.changeColumn(
      'sightings',
      'longitude',
      {
        type: Sequelize.FLOAT,
        allowNull: false,
        default: 0.0
      }
    )
  },

  down: function (queryInterface, Sequelize) {
       queryInterface.changeColumn(
      'sightings',
      'latitude',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0.0
      }
    )
    queryInterface.changeColumn(
      'sightings',
      'longitude',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0.0
      }
    )
  }
};
