module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    completed: DataTypes.BOOLEAN,
    charity_ein: DataTypes.STRING,
  });

  Transaction.associate = (models) => {
    // associations can be defined here
    Transaction.belongsTo(models.User);
  };
  return Transaction;
};
