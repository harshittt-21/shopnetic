import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { CartContext } from '../context/CartContext';

// Replace with your own publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const CheckoutForm = () => {
  const { cart, cartTotal } = useContext(CartContext);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // 1) Create a Checkout Session on your backend
    const res = await fetch('https://shopnetic-yxat.onrender.com/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart }),
    });

    const { sessionId } = await res.json();

    // 2) Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) alert(error.message);
  };

  return (
    <>
      <h4 className="mb-3">Total: ₹{cartTotal.toFixed(2)}</h4>
      <Button variant="success" size="lg" onClick={handleCheckout} disabled={!cart.length}>
        Pay with Stripe
      </Button>
    </>
  );
};

export default CheckoutForm;