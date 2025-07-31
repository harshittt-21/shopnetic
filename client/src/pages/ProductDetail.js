import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Button, Image, Container } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(CartContext);
  const product = products.find(p => p._id === id);
  if (!product) return <h2>Loading...</h2>;

  return (
    <Container>
      <Image src={product.image} fluid style={{ maxHeight: 400 }} />
      <h2>{product.name}</h2>
      <h4>₹{product.price}</h4>
      <p>{product.description}</p>
      <Button onClick={() => addToCart(product)}>Add to Cart</Button>
    </Container>
  );
};
export default ProductDetail;