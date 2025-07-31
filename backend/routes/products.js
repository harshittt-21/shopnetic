const router = require('express').Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get all
router.get('/', async (_, res) => {
  res.json(await Product.find());
});

// Create (admin)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;