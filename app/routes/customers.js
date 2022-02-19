const { Router } = require('express');
const customerController = require('../controllers/customers');

const route = Router();

module.exports = app => {
  app.use('/customer', route);

  route.post('/register', (req, res, next) =>
    customerController
      .register(req.body)
      .then(result => res.json({ message: 'Customer registered successfully!', data: result }))
      .catch(err => next(err))
  );

  route.post('/login', (req, res, next) =>
    customerController
      .login(req.body)
      .then(result => res.json({ message: 'Customer loggedIn successfully!', data: result }))
      .catch(err => next(err))
  );

  route.put('/:customerId', (req, res, next) =>
    customerController
      .editProfile(req.body, req.params.customerId)
      .then(result => res.json({ message: 'Profile Updated successfully!', data: result }))
      .catch(err => next(err))
  );

  route.get('/:customerId/getCart', (req, res, next) =>
    customerController
      .getCart(req.params.customerId)
      .then(result => res.json({ message: 'Cart details!', data: result }))
      .catch(err => next(err))
  );

  route.post('/:customerId/order', (req, res, next) =>
    customerController
      .placeOrder(req.params.customerId, req.body)
      .then(result => res.json({ message: 'Order placed!', data: result }))
      .catch(err => next(err))
  );

  route.get('/:customerId/order', (req, res, next) =>
    customerController
      .getOrders(req.params.customerId)
      .then(result => res.json({ message: 'Your Orders!', data: result }))
      .catch(err => next(err))
  );

  route.get('/order/:orderId', (req, res, next) =>
    customerController
      .getOrderDetail(req.params.orderId)
      .then(result => res.json({ message: 'Order details', data: result }))
      .catch(err => next(err))
  );
};
