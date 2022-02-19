module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    'users',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      userName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    },
    {
      tableName: 'users'
    }
  );
  return Users;
};
