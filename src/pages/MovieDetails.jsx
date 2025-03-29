import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaLink, FaHeart } from "react-icons/fa";
import Recommendations from "../components/recommendations";
import Loader from "../components/Loader";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import emptyPosterImage from "../assets/empty_poster.png";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setIsFavorite(wishlist.includes(id));
    }, [id]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_BASE_URL?.endsWith("/")
                    ? import.meta.env.VITE_BASE_URL
                    : `${import.meta.env.VITE_BASE_URL}/`;
                
                const url = `${BASE_URL}movie/${id}`;
                const { data } = await axios.get(url, { params: { api_key: import.meta.env.VITE_API_KEY } });
                setMovie(data);
            } catch (err) {
                setError("Failed to fetch movie details. Please try again.");
            }
        };

        fetchMovie();
    }, [id]);

    const toggleFavorite = () => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const updatedWishlist = isFavorite
            ? wishlist.filter(movieId => movieId !== id)
            : [...wishlist, id];

        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setIsFavorite(!isFavorite);
    };

    if (error) return <p className="text-danger text-center">{error}</p>;
    if (!movie) return <Loader />;

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
                            onClick={toggleFavorite} 
                            className="fs-4" 
                            role="button" 
                            style={{ 
                                cursor: "pointer", 
                                transition: "all 0.3s ease-in-out", 
                                color: isFavorite ? "#FFE353" : "#6c757d" 
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
        </Container>
    );
};

export default MovieDetails;
