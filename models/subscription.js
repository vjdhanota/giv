module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    charity_ein: DataTypes.STRING,
    type: DataTypes.STRING,
    frequency: DataTypes.STRING,
    amount: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });

  Subscription.associate = (models) => {
    // associations can be defined here
    Subscription.belongsTo(models.User);
  };
  return Subscription;
};
