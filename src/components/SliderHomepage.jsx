import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import './Css/SliderHomepageCss.css';
import { MOVIES_API_URL } from '../apiUrl';
import { Link } from 'react-router-dom';

function SliderHomepage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(MOVIES_API_URL);
      
      const moviesWithDateObjects = response.data.map(movie => ({
        ...movie,
        releaseDateObj: new Date(movie.release_date)
      }));
      
      const sortedMovies = moviesWithDateObjects.sort((a, b) => 
        b.releaseDateObj - a.releaseDateObj
      );
      
      const newestMovies = sortedMovies.slice(0, 10);
      
      setMovies(newestMovies);
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    <div className="container">
      <div className="tittle">
        <h1>New Released</h1>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="link-style">
              <div key={movie.id}>
                <div className="movie-card">
                  <img src={movie.image_poster} alt={movie.name} />
                  <div className="infocard">
                    <h2>{movie.name}</h2>
                    <div className="addicon">
                      <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", paddingRight: '5px' }} />
                      <h3>{movie.rating}</h3>
                    </div>
                    <h3><span className='bold'>Genre:</span> {movie.genre}</h3>
                    <h3><span className='bold'>Release:</span> {movie.release_date}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SliderHomepage;
