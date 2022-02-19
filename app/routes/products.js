const { Router } = require('express');
const productController = require('../controllers/products');

const route = Router();

module.exports = app => {
  app.use('/product', route);

  route.get('/', (req, res, next) =>
    productController
      .getProducts(req.query)
      .then(result => res.json({ message: 'List of products!', data: result }))
      .catch(err => next(err))
  );

  route.get('/:productId', (req, res, next) =>
    productController
      .getProduct(req.params.productId)
      .then(result => res.json({ message: 'Product Detail', data: result }))
      .catch(err => next(err))
  );

  route.post('/:productId/addToCart', (req, res, next) =>
    productController
      .addToCart(req.params.productId, req.body)
      .then(result => res.json({ message: 'Product Successfully added to cart.', data: result }))
      .catch(err => next(err))
  );
};
