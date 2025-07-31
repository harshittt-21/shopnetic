const router = require('express').Router();
const Order = require('../models/Order');

// Place order
router.post('/', (req, res) => {
  const { userId, items, total } = req.body;
  const order = new Order({ userId, items, total });
  order.save().then(() => {
    // clear cart
    req.session.cart = [];
    res.json(order);
  });
});

module.exports = router;