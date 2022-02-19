const Sequelize = require('sequelize');
const sequelize = new Sequelize('test-i-pangram', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    idle: 1000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('./users.js')(sequelize, Sequelize);
db.Products = require('./products.js')(sequelize, Sequelize);
db.Cart = require('./cart.js')(sequelize, Sequelize);
db.Orders = require('./orders.js')(sequelize, Sequelize);

db.Products.hasMany(db.Cart);
db.Cart.belongsTo(db.Products, { targetKey: 'id', foreignKey: 'productId' });

db.Products.hasMany(db.Orders);
db.Orders.belongsTo(db.Products, { targetKey: 'id', foreignKey: 'productId' });
db.Users.hasMany(db.Orders);
db.Orders.belongsTo(db.Users, { targetKey: 'id', foreignKey: 'customerId', as: 'customer' });

module.exports = db;