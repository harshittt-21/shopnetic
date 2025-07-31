import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchCart = async () => {
    const { data } = await api.get('/api/cart');
    setCart(data);
  };

  const fetchProducts = async () => {
    const { data } = await api.get('/api/products');
    setProducts(data);
  };

  useEffect(() => { fetchCart(); fetchProducts(); }, []);

  const addToCart = async (product) => {
    await api.post(`/api/cart/${product._id}`, product);
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    await api.delete(`/api/cart/${productId}`);
    fetchCart();
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, products, addToCart, removeFromCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};