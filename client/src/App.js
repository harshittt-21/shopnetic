import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
             <Route
              path="/admin"
              element={
                localStorage.getItem('role') === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}


// inside <Routes> …


export default App;