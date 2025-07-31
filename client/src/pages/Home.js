import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Row, Col } from 'react-bootstrap';

const Home = () => {
  const { products } = useContext(CartContext);
  return (
    <>
      <h1>Products</h1>
      <Row>
        {products.map(p => (
          <Col md={4} className="mb-4" key={p._id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Home;