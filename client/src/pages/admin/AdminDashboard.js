import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import ProductForm from './ProductForm';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await api.get('/api/products');
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    await api.delete(`/api/products/${id}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    fetchProducts();
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={4}>
          <h4>Add / Edit Product</h4>
          <ProductForm onSuccess={fetchProducts} />
        </Col>
        <Col md={8}>
          <h4>All Products</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td style={{ width: 80 }}>
                    <img src={p.image} alt="" style={{ width: 60 }} />
                  </td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <Button size="sm" variant="danger" onClick={() => deleteProduct(p._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;