import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../apis/api"; // Import the correct API function
import { useLanguage } from "../context/LanguageContext";
import Recommendations from "../components/recommendations";
import ReviewCard from "../components/ReviewCard";
import { MovieReviews } from "../apis/api";
import { useWishlist } from "../context/wishList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FaLink } from "react-icons/fa";
import Loader from "../components/Loader";

const MovieDetails = () => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const { language } = useLanguage(); // Get the selected language from context
    const { addToWishlist, removeFromWishlist, inWishlist } = useWishlist();
    const isInWishlist = movie ? inWishlist(movie) : false;

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true); // Start loading
                const data = await fetchMovieDetails(id, language); // Use the correct API function
                setMovie(data);
            } catch (err) {
                console.error("Failed to fetch movie details:", err);
                setError("Failed to fetch movie details. Please try again.");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchMovie();
    }, [id, language]); // Re-fetch when `id` or `language` changes

    //collecting reviews per movie
    const [reviews, setReviews] = useState([]);
    const [reviewError, setReviewError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // setReviewError(null)
                const reviewDetails = await MovieReviews(id);
                setReviews(reviewDetails);
                //console.log(reviews)
            } catch (error) {
                setReviewError(error.message);
                console.error("failed to fetch reviews: ", error);
            }
        };
        fetchReviews();
    }, [id]);
    //end reviews
    useEffect(() => {
        console.log(reviews);
    }, [reviews]);
    // toggle wishlist status
    const handleWishlistToggle = (e) => {
        e.preventDefault();
        if (isInWishlist) {
            removeFromWishlist(movie);
        } else {
            addToWishlist(movie);
        }
    };
    // Show Loader while loading
    if (loading) {
        return <Loader />;
    }
    if (error) return <p className="error-message">{error}</p>;
    if (!movie) return <p className="loading-message">Loading...</p>;

    return (
        <>
            <div className="movie-container">
                <div className="movie-poster">
                    {movie.poster_path ? (
                        <img src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
                    ) : (
                        <p className="no-image">No image available</p>
                    )}
                </div>

                <div>
                    <div className="movie-header">
                        <h2 className="movie-title">{movie.title}</h2>
                        <a href="#" onClick={handleWishlistToggle} className="mb-0 mr-3">
                            <FontAwesomeIcon icon={faHeart} className={`text-3xl ${isInWishlist ? "text-primary" : "fa-regular text-gray-300"}`} />
                        </a>
                    </div>

                    <p className="movie-date mt-3">{movie.release_date || "N/A"}</p>

                    <div className="movie-rating mt-4">
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className="star-wrapper">
                                <svg
                                    className={`vector-star ${index < Math.round(movie.vote_average / 2) ? "filled" : "empty"}`}
                                    viewBox="0 0 24 24"
                                    fill={index < Math.round(movie.vote_average / 2) ? "black" : "none"}
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polygon points="12 2 15.1 8.3 22 9.3 17 14.2 18.2 21 12 17.8 5.8 21 7 14.2 2 9.3 8.9 8.3 12 2"></polygon>
                                </svg>
                            </span>
                        ))}
                        <span className="rating-number">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
                    </div>

                    <p className="movie-description mt-5">{movie.overview || "No overview available."}</p>

                    <div className="movie-genres mt-4">
                        {movie.genres?.map((genre) => (
                            <span key={genre.id} className="genre-badge">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="movie-info mt-4">
                        <p>
                            <strong>Duration:</strong>{" "}
                            <span className="movie-value movie-duration-value">{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
                        </p>
                        <p>
                            <strong>Language:</strong>{" "}
                            <span className="movie-value movie-language-value">
                                {movie.original_language ? movie.original_language.toUpperCase() : "N/A"}
                            </span>
                        </p>
                    </div>

                    {movie.production_companies?.length > 0 && (
                        <div className="movie-company mt-4">
                            {movie.production_companies[0].logo_path ? (
                                <img
                                    src={`${import.meta.env.VITE_IMAGE_URL}${movie.production_companies[0].logo_path}`}
                                    alt={movie.production_companies[0].name}
                                />
                            ) : (
                                <p>{movie.production_companies[0].name}</p>
                            )}
                        </div>
                    )}

                    {movie.homepage && (
                        <a href={movie.homepage} target="_blank" className="movie-website mt-4">
                            Website <FaLink className="link-icon" />
                        </a>
                    )}
                </div>
            </div>

            <div className="movie-divider"></div>
            <div>
                <Recommendations movieId={id} />
            </div>
            <div className="movie-divider"></div>
            <hr />
            <div className="movie-reviews">
                <h1 className="movie-reviews-header">Reviews</h1>
                <ReviewCard reviews={reviews} />
            </div>
        </>
    );
};

export default MovieDetails;
