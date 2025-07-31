import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api'; // axios instance pointing to backend

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/api/products');
        setProducts(res.data); // should be an array of product objects
      } catch (error) {
        console.error('❌ Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Update cart total when cart changes
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cart]);

  // ✅ Add product to cart
  const addToCart = (product) => {
    const exists = cart.find(item => item.productId === product._id);
    if (exists) {
      setCart(cart.map(item =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1
      }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, products, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
