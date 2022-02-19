const { Op } = require('sequelize');
const { Products, Orders, Users } = require('../models');
const common = require('../helpers/common');

const adminController = {
  async addProduct(reqBody) {
    const { name, description, price } = reqBody;
    if (!name || !price || name === '', typeof(price) !== 'number') throw new Error('Invalid Input.');
    let product = { name, description, price };
    product = await Products.create(product);
    return product;
  },

  async getProducts(queryObj) {
    const { page = 1, perPage = 10, keyWord = '' } = queryObj;
    const products = await Products.findAndCountAll({
      where: { name: { [Op.like]: `%${keyWord}%` } },
      offset: (page - 1) * perPage,
      limit: perPage
    });
    const response = { ...common.getPagination(+perPage, +page, products.count), products: products.rows };
    return response;
  },

  async getOrders(queryObj) {
    const { status, productId, customerId, page, perPage } = queryObj;
    let whereObj = {};
    if (status) whereObj = { ...whereObj, status };
    if (productId) whereObj = { ...whereObj, productId };
    if (customerId) whereObj = { ...whereObj, customerId };
    const orders = await Orders.findAndCountAll({
      where: whereObj,
      include: [
        { model: Users, as: 'customer', attributes: ['id', 'userName', 'email'] },
        { model: Products, attributes: ['id', 'name', 'price'] }
      ],
      offset: (page - 1) * perPage,
      limit: perPage
    });
    const response = { ...common.getPagination(+perPage, +page, orders.count), orders: orders.rows };
    return response;
  }
};

module.exports = adminController;
