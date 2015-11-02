'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:true,
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8,99]
      }
    },
    county: {
      type: DataTypes.INTEGER,
      validate: {
        len: [5]
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};