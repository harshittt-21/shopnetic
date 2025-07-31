import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../services/api';

const Admin = () => {
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '', stock: 1 });

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/api/products', form, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    alert('Product added');
    setForm({ name: '', price: '', description: '', image: '', stock: 1 });
  };

  return (
    <Container style={{ maxWidth: 500 }}>
      <h2>Add Product</h2>
      <Form onSubmit={submit}>
        <Form.Control className="mb-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Form.Control className="mb-2" placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <Form.Control className="mb-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <Form.Control className="mb-2" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        <Form.Control className="mb-2" placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        <Button type="submit">Add</Button>
      </Form>
    </Container>
  );
};
export default Admin;