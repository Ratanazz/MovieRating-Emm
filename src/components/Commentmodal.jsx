import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Css/UserInteractModel.css'; // Make sure to import your custom CSS file

function Commentmodal({ showModal, closeModal, newComment, setNewComment, handleCommentSubmit }) {
  const handleSubmit = () => {
    if (newComment.trim()) {
      handleCommentSubmit(newComment);
      setNewComment('');
    }
    closeModal();
  };

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Your Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Your thoughts on this movie...</Form.Label>
            <Form.Control
              as="textarea"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              placeholder="Your thoughts on this movie..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Your Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Commentmodal;
