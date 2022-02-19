const { Op } = require('sequelize');
const { Products, Cart } = require('../models');
const common = require('../helpers/common');
const constants = require('../helpers/constants');

const customerController = {
  async getProducts(queryObj) {
    const { page = 1, perPage = 10, keyWord = '' } = queryObj;
    const products = await Products.findAndCountAll({
      where: { name: { [Op.like]: `%${keyWord}%` } },
      attributes: ['id', 'name', 'description'],
      offset: (page - 1) * perPage,
      limit: perPage
    });
    const response = { ...common.getPagination(+perPage, +page, products.count), products: products.rows };
    return response;
  },

  async getProduct(productId) {
    const product = await Products.findByPk(productId);
    if (!product) throw new Error('Product not found!');
    return product;
  },

  async addToCart(productId, reqBody) {
    const { customerId, quantity = 1 } = reqBody; // we can get customerId directely from auth when authantication is applied
    const product = await Products.findByPk(productId);
    if (!product) throw new Error('Product not found!');
    let cart = await Cart.findOne({ where: { customerId, productId } });
    if (cart) {
      cart.quantity = quantity;
      await cart.save();
    }
    else {
      cart = { customerId, productId, quantity };
      cart = await Cart.create(cart);
    }
    return cart;
  }
};

module.exports = customerController;
