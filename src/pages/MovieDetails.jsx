import React, { useState, useEffect } from 'react';
import api from '../api';
import { Helmet } from 'react-helmet'; // For OGP meta tags
import { useParams } from 'react-router-dom';
import './CssPage/MovieDetailCss.css';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, TelegramShareButton, TelegramIcon } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import Commentmodal from '../components/Commentmodal';
import UserRating from '../components/UserRating';

function MovieDetails() {
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [youtubeComments, setYoutubeComments] = useState([]);

    // Pagination state for user comments
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 6;

    // Pagination state for YouTube comments
    const [currentYoutubePage, setCurrentYoutubePage] = useState(1);
    const youtubeCommentsPerPage = 8;

    const openRatingModal = () => setShowRatingModal(true);
    const closeRatingModal = () => setShowRatingModal(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        const fetchMovie = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await api.get(`/movies/${id}`);
                setMovie(response.data.movie);
                setComments(response.data.comments || []);
                if (response.data.averageRating) {
                    setAverageRating(Number(response.data.averageRating) || 0);
                }

                if (response.data.youtubeVideoId) {
                    console.log("YouTube Video ID:", response.data.youtubeVideoId); 
                    fetchYoutubeComments(response.data.youtubeVideoId);
                } else {
                    console.log("No YouTube video ID found."); 
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError('Failed to load movie details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    const fetchYoutubeComments = async (videoId) => {
        try {
            const response = await api.get(`/youtube-comments/${videoId}`);
            console.log("YouTube comments response:", response.data); 
            const data = response.data; 
            if (data.items) {
                setYoutubeComments(data.items);
            } else {
                console.log("No items in YouTube comments response."); 
            }
        } catch (error) {
            console.error('Error fetching YouTube comments:', error);
        }
    };

    const handleCommentSubmit = async (comment) => {
        if (comment) {
            try {
                const response = await api.post('/comments', { movie_id: id, content: comment });
                setComments([response.data, ...comments]);
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
    };

    const handleRatingSubmit = async (rating) => {
        try {
            const response = await api.post('/ratings', { movie_id: id, rating: rating });
            setAverageRating(Number(response.data.averageRating) || 0);
            closeRatingModal(); // Close the modal after the rating is submitted
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    // Pagination handlers for user comments
    const handleNextPage = () => {
        if (currentPage < Math.ceil(comments.length / commentsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    // Pagination handlers for YouTube comments
    const handleNextYoutubePage = () => {
        if (currentYoutubePage < Math.ceil(youtubeComments.length / youtubeCommentsPerPage)) {
            setCurrentYoutubePage(currentYoutubePage + 1);
        }
    };

    const handlePreviousYoutubePage = () => {
        if (currentYoutubePage > 1) {
            setCurrentYoutubePage(currentYoutubePage - 1);
        }
    };

    const indexOfLastYoutubeComment = currentYoutubePage * youtubeCommentsPerPage;
    const indexOfFirstYoutubeComment = indexOfLastYoutubeComment - youtubeCommentsPerPage;
    const currentYoutubeComments = youtubeComments.slice(indexOfFirstYoutubeComment, indexOfLastYoutubeComment);

    if (isLoading) return <div>Loading...</div>;

    // For sharing
    const shareUrl = window.location.href; 
    const shareTitle = `${movie.name} - Movie Rating`; 
    const shareQuote = ` Genre: ${movie.genre}, UserRating: ${movie.rating}/10`;
    const shareHashtag = '#movies #moviereview'; 

    return (
        <div className="Moviedetail-container">
            <Helmet>
                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={`${movie.name} - Movie Rating`} />
                <meta property="og:description" content={`${movie.summary.substring(0, 100)}... See more on ${window.location.href}`} />
                <meta property="og:image" content={movie.image_poster} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Your Site Name" />
                <meta property="og:rating" content={movie.rating} />
            </Helmet>
            <div className="detailtop-container">
                <h1>{movie.name}</h1>
                <div className="Detailtop">
                    <div className="topleft">
                        <h2>{movie.genre}</h2>
                        <img src={movie.image_poster} alt="" />
                        <div className="social-share-buttons">
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Share To:</h3>
                            <div className="buttonshare">
                                <FacebookShareButton url={shareUrl} quote={shareQuote} hashtag={shareHashtag}
                                    className="share-button">
                                    <FacebookIcon size={35} round />
                                </FacebookShareButton>
                            </div>
                            <div className='buttonshare'>
                                <TwitterShareButton url={shareUrl} title={shareTitle} hashtags={['movies', 'moviereview']} via="your_mention" // Replace with your Twitter username
                                    className="share-button" >
                                    <TwitterIcon size={35} round />
                                </TwitterShareButton>
                            </div>
                            <div className="buttonshare">
                                <TelegramShareButton
                                    url={shareUrl} title={shareTitle} hashtag={shareHashtag}
                                    className="share-button">
                                    <TelegramIcon size={35} round />
                                </TelegramShareButton>
                            </div>
                        </div>
                    </div>
                    <div className="topright">
                        <div className="rating-of-movie">
                            <h3>Global Rating: {movie.rating}/10</h3>
                            <h3>Audience Rate: {Number(averageRating).toFixed(1)}/10</h3>
                        </div>
                        <div className="leave-your-rating" onClick={openRatingModal}>
                            <FontAwesomeIcon icon={faStar} className='rating-icon' style={{ color: "#FFD43B" }} />
                            <h4>Leave Your Rating</h4>
                        </div>
                        <iframe src={movie.trailer} frameBorder="0" title="Movie Trailer"></iframe>
                    </div>
                </div>
            </div>
            <div className="detail-info">
                <div className="movie-summary">
                    <h4 className="red-line-heading">Movie Summary</h4>
                    <p>{movie.summary}</p>
                </div>
                <div className="moviedetail-info">
                    <h4 className="red-line-heading">Content Rated:</h4>
                    <h5>{movie.rated}</h5>
                    <h4 className="red-line-heading">Duration:</h4>
                    <h5>{movie.duration}</h5>
                    <h4 className="red-line-heading">Language:</h4>
                    <h5>{movie.language}</h5>
                    <h4 className="red-line-heading">Year of Release:</h4>
                    <h5>{movie.release_year}</h5>
                </div>
            </div>
            <div className="user-comments">
                <h4 className="red-line-heading">User Comments</h4>
                {currentComments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>{comment.content}</p>
                    </div>
                ))}
                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(comments.length / commentsPerPage)}>Next</button>
                </div>
            </div>
            <div className="youtube-comments">
                <h4 className="red-line-heading">YouTube Comments</h4>
                {currentYoutubeComments.map((comment, index) => (
                    <div key={index} className="youtube-comment">
                        <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                    </div>
                ))}
                <div className="pagination">
                    <button onClick={handlePreviousYoutubePage} disabled={currentYoutubePage === 1}>Previous</button>
                    <button onClick={handleNextYoutubePage} disabled={currentYoutubePage === Math.ceil(youtubeComments.length / youtubeCommentsPerPage)}>Next</button>
                </div>
            </div>
            <Commentmodal show={showModal} handleClose={closeModal} handleSubmit={handleCommentSubmit} />
            <UserRating show={showRatingModal} handleClose={closeRatingModal} handleSubmit={handleRatingSubmit} />
        </div>
    );
}

export default MovieDetails;
