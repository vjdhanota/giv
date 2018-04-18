'use strict';
module.exports = (sequelize, DataTypes) => {
  var cardNew = sequelize.define('cardNew', {
    name: DataTypes.STRING,
    bank: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.STRING,
    cardNo: DataTypes.STRING,
    type: DataTypes.STRING,
    currency: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  cardNew.associate = function(models) {
    cardNew.belongsTo(models.User);
  };
  return cardNew;
};