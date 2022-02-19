module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define(
    'cart',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          as: 'customer',
          key: 'id'
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 1
      }
    },
    {
      tableName: 'cart'
    }
  );
  return Cart;
};
