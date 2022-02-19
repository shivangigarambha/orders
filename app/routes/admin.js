const { Router } = require('express');
const adminController = require('../controllers/admin');

const route = Router();

module.exports = app => {
  app.use('/admin', route);

  route.post('/product', (req, res, next) =>
    adminController
      .addProduct(req.body)
      .then(result => res.json({ message: 'Product added successfully!', data: result }))
      .catch(err => next(err))
  );

  route.get('/product', (req, res, next) =>
    adminController
      .getProducts(req.query)
      .then(result => res.json({ message: 'List of products!', data: result }))
      .catch(err => next(err))
  );
};
