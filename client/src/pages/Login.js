import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/api/auth', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    window.location = '/';
  };

  return (
    <Container style={{ maxWidth: 400 }}>
      <h2>Login / Register</h2>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>
        <Button type="submit">Login / Register</Button>
      </Form>
    </Container>
  );
};
export default Login;