import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';

const CartItem = ({ item, onRemove }) => {
  return (
    <Row className="mb-3 align-items-center">
      <Col xs={3} md={2}>
        <Image src={item.image} thumbnail fluid />
      </Col>
      <Col xs={6} md={7}>
        <h5 className="mb-1">{item.name}</h5>
        <p className="mb-1">
          ${item.price.toFixed(2)} &times; {item.quantity}
        </p>
      </Col>
      <Col xs={3} md={3} className="text-end">
        <p className="fw-bold mb-2">${(item.price * item.quantity).toFixed(2)}</p>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onRemove(item.productId)}
        >
          Remove
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;