import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Button, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, cartTotal } = useContext(CartContext);
  if (!cart.length) return <h3>Cart empty</h3>;

  return (
    <>
      <h2>Cart</h2>
      <ListGroup>
        {cart.map(item => (
          <ListGroup.Item key={item.productId} className="d-flex align-items-center">
            <Image src={item.image} thumbnail style={{ width: 80 }} className="me-3" />
            <div>
              <h5>{item.name} x{item.quantity}</h5>
              <p>₹{item.price * item.quantity}</p>
            </div>
            <Button variant="danger" size="sm" className="ms-auto"
              onClick={() => removeFromCart(item.productId)}>
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h4 className="mt-3">Total: ₹{cartTotal.toFixed(2)}</h4>
      <Button as={Link} to="/checkout">Checkout</Button>
    </>
  );
};
export default Cart;