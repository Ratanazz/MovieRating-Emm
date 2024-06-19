import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import './Css/UserratingModal.css'; // Make sure to import your custom CSS file

function UserRating({ showRatingModal, closeRatingModal, userRating, setUserRating, handleRatingSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    handleRatingSubmit(userRating);
  };

  const ratingChanged = (newRating) => {
    setUserRating(newRating);
  };

  return (
    <Modal
      show={showRatingModal}
      onHide={closeRatingModal}
      centered
      dialogClassName="custom-modal"
      backdrop={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Rate This Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Select Rating</Form.Label>
            <ReactStars
              count={10}
              value={userRating}
              onChange={ratingChanged}
              size={45}
              activeColor="#ffd700"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Rating
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserRating;
