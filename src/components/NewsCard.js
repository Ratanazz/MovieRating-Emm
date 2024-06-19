import React from 'react';
import { Card } from 'react-bootstrap';

function NewsCard({ title, description, imageUrl, imagePosition }) {
  return (
    <Card className="mb-4">
      <Card.Body className="d-flex">
        
        {imagePosition === 'left' && (
          <div className="me-3">
            <img src={imageUrl} alt={title} style={{ maxWidth: '100px' }} />
          </div>
        )}
        <div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <span style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>Read More</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;
