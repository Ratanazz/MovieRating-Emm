import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // For OGP meta tags
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, TelegramShareButton, TelegramIcon } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import api from '../api';
import Commentmodal from '../components/Commentmodal';
import UserRating from '../components/UserRating';
import './CssPage/MovieDetailCss.css';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [youtubeComments, setYoutubeComments] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 6;

    const [currentYoutubePage, setCurrentYoutubePage] = useState(1);
    const youtubeCommentsPerPage = 8;

    const openRatingModal = () => setShowRatingModal(true);
    const closeRatingModal = () => setShowRatingModal(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const [fullImageUrl, setFullImageUrl] = useState('');

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
                setFullImageUrl(`https://backendmovierating-production.up.railway.app${response.data.movie.image_poster}`);

                if (response.data.youtubeVideoId) {
                    fetchYoutubeComments(response.data.youtubeVideoId);
                }
            } catch (error) {
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
            const data = response.data;
            if (data.items) {
                setYoutubeComments(data.items);
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
            closeRatingModal();
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

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

    const shareUrl = window.location.href;
    const shareTitle = `${movie.name} - Movie Rating`;
    const shareQuote = `Genre: ${movie.genre}, UserRating: ${movie.rating}/10`;
    const shareHashtag = '#movies #moviereview';

    return (
        <>
            <Helmet>
                <title>{movie.name} - Movie Rating</title>
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${movie.name} - Movie Rating`} />
                <meta property="og:description" content={movie.summary ? `${movie.summary.substring(0, 200)}...` : 'Check out this movie!'} />
                <meta property="og:image" content={fullImageUrl} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Your Movie Rating Site" />
                <meta property="og:rating" content={averageRating.toFixed(1)} />
                <meta property="og:rating:scale" content="10" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:alt" content={`${movie.name} poster`} />
            </Helmet>
            <div className="Moviedetail-container">
                <div className="detailtop-container">
                    <h1>{movie.name}</h1>
                    <div className="Detailtop">
                        <div className="topleft">
                            <h2>{movie.genre}</h2>
                            <img src={fullImageUrl} alt={movie.name} />
                        </div>
                        <div className="topright">
                            <h3>Director: {movie.director}</h3>
                            <h3>Cast: {movie.cast}</h3>
                            <h3>Release Date: {new Date(movie.release_date).toLocaleDateString()}</h3>
                            <div className="Rating">
                                <FontAwesomeIcon icon={faStar} className="icon" />
                                <p>User Rating: {averageRating.toFixed(1)}/10</p>
                            </div>
                            <div className="social-share">
                                <FacebookShareButton url={shareUrl} quote={shareQuote} hashtag={shareHashtag}>
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <TwitterShareButton url={shareUrl} title={shareTitle} hashtags={shareHashtag.split(' ')}>
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                <TelegramShareButton url={shareUrl} title={shareTitle}>
                                    <TelegramIcon size={32} round />
                                </TelegramShareButton>
                            </div>
                            <div className="rating-btn">
                                <button onClick={openRatingModal}>Rate This Movie</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Detailsummary">
                    <h2>Summary</h2>
                    <p>{movie.summary}</p>
                </div>
                <div className="Detailcomment">
                    <h2>Comments</h2>
                    {currentComments.map((comment, index) => (
                        <div key={index} className="Comment">
                            <p>{comment.content}</p>
                        </div>
                    ))}
                    <div className="pagination">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(comments.length / commentsPerPage)}>
                            Next
                        </button>
                    </div>
                    <button onClick={openModal}>Add Comment</button>
                </div>
                <div className="Youtubecomment">
                    <h2>YouTube Comments</h2>
                    {currentYoutubeComments.map((comment, index) => (
                        <div key={index} className="Comment">
                            <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                        </div>
                    ))}
                    <div className="pagination">
                        <button onClick={handlePreviousYoutubePage} disabled={currentYoutubePage === 1}>
                            Previous
                        </button>
                        <button onClick={handleNextYoutubePage} disabled={currentYoutubePage === Math.ceil(youtubeComments.length / youtubeCommentsPerPage)}>
                            Next
                        </button>
                    </div>
                </div>
                <Commentmodal showModal={showModal} closeModal={closeModal} handleCommentSubmit={handleCommentSubmit} />
                <UserRating showModal={showRatingModal} closeModal={closeRatingModal} handleRatingSubmit={handleRatingSubmit} />
            </div>
        </>
    );
}

export default MovieDetails;
