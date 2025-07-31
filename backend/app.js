require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));

// routes
app.use('/api/auth',   require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart',   require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));