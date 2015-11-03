'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'sightings',
      'county',
      Sequelize.INTEGER
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('sightings', 'county')
  }
};
