'use strict';
module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define('Card', {
    number: DataTypes.STRING,
    fName: DataTypes.STRING,
    lName: DataTypes.STRING,
    expiry: DataTypes.STRING,
    cvc: DataTypes.STRING
  }, {});
  Card.associate = function(models) {
    // associations can be defined here
    Card.belongsTo(models.User);
  };
  return Card;
};