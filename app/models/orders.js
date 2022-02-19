module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define(
    'orders',
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
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        default: 1,
        comment: '1 = confirmed, 2 = shipped, 3 = delivered, 4 = canceled'
      },
      shippedAt: {
        type: Sequelize.DATETIME,
        allowNull: true
      },
      deliveredAt: {
        type: Sequelize.DATETIME,
        allowNull: true
      },
      canceledAt: {
        type: Sequelize.DATETIME,
        allowNull: true
      },
    },
    {
      tableName: 'orders'
    }
  );
  return Orders;
};
