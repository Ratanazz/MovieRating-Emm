import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Moviepage.css';
import { MOVIES_API_URL } from '../apiUrl';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(20); // Number of movies to display per page

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await axios.get(MOVIES_API_URL);
            setMovies(response.data);
        };

        fetchMovies();
    }, []);

    // Get current movies
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="MoviePage">
            <div className="moviepage-title">
                <h1>MOVIES</h1>
            </div>
            <div className='movie-page-container'>
                <div className='cardgroup'>
                    {currentMovies.map((movie, index) => (
                        <Link to={`/movie/${movie.id}`} key={index} className="link-style">
                            <div className="card1" style={{ width: '13rem' }}>
                                <img src={movie.image_poster} className="card-img-top" alt="Movie Poster" />
                                <div className="card-body">
                                    <div className='release_date'>
                                        <h1>{movie.name}</h1>
                                        <h2>Genre: <span className='info-span'>{movie.genre}</span> </h2>
                                        <h2>Rating: <span className='info-span'>{movie.rating}</span></h2>
                                        <h2>Release: <span className='info-span'>{movie.release_date}</span></h2>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="pagination">
                    {movies.length > moviesPerPage && (
                        <ul>
                            {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }, (_, i) => (
                                <li key={i}>
                                    <button onClick={() => paginate(i + 1)}>{i + 1}</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Movies;
