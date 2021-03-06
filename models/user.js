module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    favorites: DataTypes.STRING,
  });

  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
