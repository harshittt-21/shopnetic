const router = require('express').Router();
const auth = require('../middleware/auth');

// GET cart
router.get('/', (req, res) => {
  res.json(req.session.cart || []);
});

// POST add
router.post('/:id', async (req, res) => {
  if (!req.session.cart) req.session.cart = [];
  const { name, price, image } = req.body;
  const existing = req.session.cart.find(i => i.productId === req.params.id);
  if (existing) existing.quantity += 1;
  else req.session.cart.push({ productId: req.params.id, name, price, image, quantity: 1 });
  res.json(req.session.cart);
});

// DELETE item
router.delete('/:id', (req, res) => {
  if (!req.session.cart) return res.json([]);
  req.session.cart = req.session.cart.filter(i => i.productId !== req.params.id);
  res.json(req.session.cart);
});

module.exports = router;