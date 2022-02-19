const { Users, Products, Cart, Orders } = require('../models');

const customerController = {
  async register(reqBody) {
    const { email, userName, password } = reqBody;
    if (!email || !password || email === '', password === '') throw new Error('Email & password are required');
    let user = { email, userName, password };
    user = await Users.create(user);
    return user;
  },

  async login(reqBody) {
    const { email, password } = reqBody;
    if (!email || !password || email === '', password === '') throw new Error('Email & password are required');
    const user = await Users.findOne({ where: { email, password } });
    if (!user) throw new Error('Invalid Email or password!');
    return true;
  },

  async editProfile(reqBody, customerId) {
    const { email, userName, password } = reqBody;
    const user = await Users.findByPk(customerId);
    if (!user) throw new Error('You are not registered!');
    if (email) user.email = email;
    if (userName) user.userName = userName;
    if (password) user.password = password;
    await user.save();
    return user;
  },

  async getCart(customerId) {
    const cart = await Cart.findAll({
      where: { customerId },
      attributes: ['id', 'quantity', 'productId'],
      include: { model: Products, attributes: ['id', 'name', 'price'] }
    });
    let totalPrice = 0;
    cart.map(c => { totalPrice += c.quantity * c.product.price });
    return { totalPrice, cart };
  },

  async placeOrder(customerId, reqBody) {
    const { productId, amount, quantity = 1 } = reqBody;
    const product = await Products.findByPk(productId);
    if (!product) throw new Error('Product not found!');
    let order = { customerId, productId, amount, quantity, status: constants.ORDER_STATUS.CONFIRMED };
    order = await Orders.create(order);
    return order;
  },

  async getOrders(customerId) {
    const orders = await Orders.findAll({
      where: { customerId },
      attributes: ['id', 'productId', 'amount', 'quantity', 'status'],
      include: { model: Products, attributes: ['id', 'name', 'price'] }
    });
    return orders;
  },

  async getOrderDetail(customerId, orderId) {
    const order = await Orders.findOne({
      where: { id: orderId, customerId },
      attributes: ['id', 'productId', 'amount', 'quantity', 'status', 'shippedAt', 'deliveredAt', 'canceledAt'],
      include: { model: Products, attributes: ['id', 'name', 'price'] }
    });
    if (!order) throw new Error('Order not found!');
    return order;
  }
};

module.exports = customerController;
