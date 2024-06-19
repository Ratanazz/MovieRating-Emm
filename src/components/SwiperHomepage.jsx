import React, { useState, useEffect } from 'react';

import axios from 'axios';
import './Css/SwiperHomepageCss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MOVIES_API_URL } from '../apiUrl';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

function SwiperHomepage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(MOVIES_API_URL); // Replace with your API endpoint
      setMovies(response.data);
    };

    fetchMovies();
  }, []);
  return (
    <div className='SwiperHomepage'>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {movies.map(movie => (
  <SwiperSlide key={movie.id}>
    <div className="Card">
      <div className="infomation">
        <h1>{movie.name}</h1>
        <div className="info1">
          <h2>Runtime: {movie.runtime}</h2>
          <h2>Release: {movie.release_date}</h2>
          <div className="rate">
          <div className="star-icon">
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
          </div>
          <h3>{movie.rating}/5</h3>
        </div>
        </div>
        
      </div>
      <div className="Poster">
        <img src={movie.image_poster} alt="" />
      </div>
    </div>
  </SwiperSlide>
))}
        
      </Swiper>
    </div>
  );
}

export default SwiperHomepage;
