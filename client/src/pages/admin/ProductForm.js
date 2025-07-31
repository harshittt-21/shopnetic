import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../../services/api';

const ProductForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '', stock: 1 });

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/api/products', form, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    setForm({ name: '', price: '', description: '', image: '', stock: 1 });
    onSuccess();
  };

  return (
    <Form onSubmit={submit}>
      <Form.Control className="mb-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
      <Form.Control className="mb-2" placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
      <Form.Control className="mb-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
      <Form.Control className="mb-2" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} required />
      <Form.Control className="mb-2" placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required />
      <Button type="submit">Add Product</Button>
    </Form>
  );
};

export default ProductForm;