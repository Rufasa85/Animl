'use strict';
var bcrypt = require('bcrypt');
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
        models.user.belongsToMany(models.animal, {through:'usersAnimals'});
        models.user.hasMany(models.sighting)
      },
      authenticate: function(email, password, callback) {
        this.find({
          where:{
            email:email
          }
        }).then(function (user){
          if(user){
            bcrypt.compare(password, user.password, function (err, result){
              if(err) {
                callback(err, false);
              } else {
                callback(null, result ? user:false)
              }
            });
          } else {
            callback(null, false)
          }
        });
      }
    },
    hooks:{
        beforeCreate: function(user, options, callback) {
          console.log(user.password);
          if(user.password) {
            bcrypt.hash(user.password, 10, function (err, hash) {
              if(err) {
                return callback(err);
              } else {
                user.password = hash;
                callback(null, user);
              }
            });
          }
        }
      }
  });
  return user;
};