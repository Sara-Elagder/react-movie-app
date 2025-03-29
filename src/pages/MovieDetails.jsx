import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaLink, FaHeart } from "react-icons/fa";
import Recommendations from "../components/recommendations";
import Loader from "../components/Loader";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import emptyPosterImage from "../assets/empty_poster.png";
import ReviewCard from "../components/ReviewCard";
import { fetchMovieDetails, MovieReviews } from "../apis/api";
import { useLanguage } from "../context/LanguageContext";
import { useWishlist } from "../context/wishList"; // Import wishlist context

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewError, setReviewError] = useState(null);
    const { language } = useLanguage(); // Get language from context
    const { addToWishlist, removeFromWishlist, inWishlist } = useWishlist(); // Use wishlist context

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true); // Start loading
            try {
                const movieData = await fetchMovieDetails(id, language);
                setMovie(movieData);
            } catch (err) {
                setError("Failed to fetch movie details. Please try again.");
                console.error("Failed to fetch movie details:", err);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchMovie();
    }, [id, language]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewDetails = await MovieReviews(id, language);
                setReviews(reviewDetails);
            } catch (error) {
                setReviewError("Failed to fetch reviews.");
                console.error("Failed to fetch reviews:", error);
            }
        };
        fetchReviews();
    }, [id, language]);

    // Handle wishlist toggle
    const handleWishlistToggle = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (inWishlist(movie)) {
            removeFromWishlist(movie);
        } else {
            addToWishlist(movie);
        }
    };

    if (loading) return <Loader />;
    if (error) return <p className="text-danger text-center">{error}</p>;

    // Check if the movie is in the wishlist
    const isInWishlist = inWishlist(movie);

    return (
        <Container className="mt-4">
            <Row className="align-items-start">
                <Col md={4} className="text-start">
                    <img
                        className="rounded-3 img-fluid"
                        src={movie.poster_path ? `${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}` : emptyPosterImage}
                        alt={movie.title}
                        style={{ width: "100%", objectFit: "cover", borderRadius: "27px" }}
                    />
                </Col>
                <Col md={8}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="h3 fw-bold" style={{ fontSize: "48px", color: "#000" }}>{movie.title}</h1>
                        <FaHeart
                            onClick={handleWishlistToggle}
                            className="fs-4"
                            role="button"
                            style={{
                                cursor: "pointer",
                                transition: "all 0.3s ease-in-out",
                                color: isInWishlist ? "#FFE353" : "#6c757d"
                            }}
                        />
                    </div>
                    <p className="text-muted">{movie.release_date || "N/A"}</p>
                    <p style={{ fontSize: "24px", color: "#000" }}>{movie.overview || "No overview available."}</p>
                    <div className="mb-3 d-flex flex-wrap mt-5" style={{ gap: "10px" }}>
                        {movie.genres?.map((genre) => (
                            <Badge key={genre.id} className="me-2" style={{ backgroundColor: "#FFE353", borderRadius: "25px", padding: "10px 15px", color: "#000" }}>{genre.name}</Badge>
                        ))}
                    </div>
                    <Row className="mt-4">
                        <Col><p><strong>Duration:</strong> {movie.runtime ? `${movie.runtime} min` : "N/A"}</p></Col>
                        <Col><p><strong>Language:</strong> {movie.original_language?.toUpperCase() || "N/A"}</p></Col>
                    </Row>
                    {movie.production_companies?.length > 0 && movie.production_companies[0].logo_path && (
                        <div className="mt-4">
                            <img
                                className="img-fluid"
                                src={`${import.meta.env.VITE_IMAGE_URL}${movie.production_companies[0].logo_path}`}
                                alt={movie.production_companies[0].name}
                                style={{ width: "150px" }}
                            />
                        </div>
                    )}
                    {movie.homepage && movie.homepage.trim() && (
                        <Button
                            className="border fw-bold mt-4 d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: "transparent",
                                borderColor: "#FFE353",
                                borderRadius: "25px",
                                padding: "10px 15px",
                                color: "#000",
                                width: "122px",
                                height: "37px",
                                gap: "8px"
                            }}
                            href={movie.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Website
                            <FaLink style={{ color: "#292D32", fontSize: "18px" }} />
                        </Button>
                    )}
                </Col>
            </Row>
            <hr className="mt-5" />
            <Row>
                <Col>
                    <Recommendations movieId={id} />
                </Col>
            </Row>
            <hr />
            <div className="movie-reviews">
                <h1 className="movie-reviews-header">Reviews</h1>
                {reviewError ? (
                    <p className="text-danger">{reviewError}</p>
                ) : reviews.length > 0 ? (
                    <ReviewCard reviews={reviews} />
                ) : (
                    <p>No reviews available for this movie.</p>
                )}
            </div>
        </Container>
    );
};

export default MovieDetails;



