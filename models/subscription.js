'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subscription = sequelize.define('Subscription', {
    charity_ein: DataTypes.INTEGER,
    type: DataTypes.STRING,
    frequency: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Subscription;
};