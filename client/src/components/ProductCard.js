import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={product.image} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-truncate">{product.description}</Card.Text>
        <Card.Text className="mt-auto"><strong>₹{product.price}</strong></Card.Text>
        <div className="d-grid gap-2">
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
          <Button variant="outline-secondary" as={Link} to={`/product/${product._id}`}>Details</Button>
        </div>
      </Card.Body>
    </Card>
  );
};
export default ProductCard;