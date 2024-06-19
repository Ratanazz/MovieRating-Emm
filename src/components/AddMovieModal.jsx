import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { MOVIES_API_URL } from '../apiUrl';

function AddMovieModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    name: '',
    summary: '',
    genre: '',
    release_date: '',
    runtime_minutes: '',
    rating: '',
    image_poster: '',
    trailer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(MOVIES_API_URL, formData)
      .then((response) => {
       
        console.log('Movie added successfully:', response.data);
        
        handleClose();
      })
      .catch((error) => {
        
        console.error('Error adding Movie:', error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSummary">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGenre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formReleaseDate">
            <Form.Label>Release Date</Form.Label>
            <Form.Control
              type="date"
              name="release_date"
              value={formData.release_date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formRuntimeMinutes">
            <Form.Label>Runtime Minutes</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter runtime"
              name="runtime_minutes"
              value={formData.runtime_minutes}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              placeholder="Enter rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formImagePoster">
            <Form.Label>Poster URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter poster URL"
              name="image_poster"
              value={formData.image_poster}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTrailer">
            <Form.Label>Trailer URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter trailer URL"
              name="trailer"
              value={formData.trailer}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddMovieModal;
