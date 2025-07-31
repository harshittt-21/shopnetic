const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register / Login (single endpoint for demo)
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, password: await bcrypt.hash(password, 10) });
    await user.save();
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token, role: user.role });
});
module.exports = router;