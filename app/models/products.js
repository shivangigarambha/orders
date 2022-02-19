module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define(
    'products',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      price: {
        type: Sequelize.NUMBER,
        allowNull: false
      }
    },
    {
      tableName: 'products'
    }
  );
  return Products;
};
