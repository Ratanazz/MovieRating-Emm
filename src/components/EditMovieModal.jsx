import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { MOVIES_API_URL } from '../apiUrl';

const EditMovieModal = ({ show, handleClose, movieId, refreshMovies, csrfToken }) => {
  const [movie, setMovie] = useState({
    name: '',
    summary: '',
    genre: '',
    release_date: '',
    runtime_minutes: '',
    rating: '',
    image_poster: '',
    trailer: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movieId) {
      const fetchMovie = async () => {
        try {
          const response = await axios.get(`${MOVIES_API_URL}/${movieId}`);
          setMovie(response.data);
        } catch (error) {
          console.error('Error fetching movie:', error);
        }
      };
      fetchMovie();
    }
  }, [movieId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${MOVIES_API_URL}/${movieId}`, movie, {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
      });
      refreshMovies();
      handleClose();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors); // Capture validation errors
      } else {
        console.error('Error updating movie:', error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Movie</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={movie.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.name && errors.name[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              name="summary"
              value={movie.summary}
              onChange={handleChange}
              isInvalid={!!errors.summary}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.summary && errors.summary[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              value={movie.genre}
              onChange={handleChange}
              isInvalid={!!errors.genre}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.genre && errors.genre[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Release Date</Form.Label>
            <Form.Control
              type="date"
              name="release_date"
              value={movie.release_date}
              onChange={handleChange}
              isInvalid={!!errors.release_date}
              // Change this to required={false} if it's optional
            />
            <Form.Control.Feedback type="invalid">
              {errors.release_date && errors.release_date[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Runtime Minutes</Form.Label>
            <Form.Control
              type="text"
              name="runtime_minutes"
              value={movie.runtime_minutes}
              onChange={handleChange}
              isInvalid={!!errors.runtime_minutes}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.runtime_minutes && errors.runtime_minutes[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={movie.rating}
              onChange={handleChange}
              min={0}
              max={10}
              step="0.1"
              isInvalid={!!errors.rating}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.rating && errors.rating[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Poster URL</Form.Label>
            <Form.Control
              type="url"
              name="image_poster"
              value={movie.image_poster}
              onChange={handleChange}
              isInvalid={!!errors.image_poster}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image_poster && errors.image_poster[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Trailer URL</Form.Label>
            <Form.Control
              type="url"
              name="trailer"
              value={movie.trailer}
              onChange={handleChange}
              isInvalid={!!errors.trailer}
            />
            <Form.Control.Feedback type="invalid">
              {errors.trailer && errors.trailer[0]}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditMovieModal;