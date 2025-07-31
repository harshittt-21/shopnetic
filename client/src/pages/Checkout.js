import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../services/api';
import { Button, Container } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_...'); // replace with your Stripe publishable key

const Checkout = () => {
  const { cart, cartTotal } = useContext(CartContext);
  useEffect(() => { if (!cart.length) window.location = '/'; }, [cart]);

  const handleCheckout = async () => {
    // create order
    await api.post('/api/orders', {
      userId: localStorage.getItem('token') || 'guest',
      items: cart,
      total: cartTotal
    });
    alert('Order placed!');
    window.location = '/';
  };

  return (
    <Container>
      <h2>Checkout</h2>
      <p>Total: ₹{cartTotal.toFixed(2)}</p>
      <Button onClick={handleCheckout}>Pay Now (demo)</Button>
    </Container>
  );
};
export default Checkout;