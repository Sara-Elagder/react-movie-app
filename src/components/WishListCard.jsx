import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";
import { useWishlist } from "../context/wishList";
import { useEffect } from "react";
import { Tooltip } from "bootstrap";
import { useNavigate } from "react-router-dom";
import emptyPosterImage from "../assets/empty_poster.png"; // Import the image

const WishListCard = (props) => {
    const { movie } = props;
    const img_url = import.meta.env.VITE_IMAGE_URL;
    var movie_img = "";
    if (movie.poster_path) {
        movie_img = `${img_url}${movie.poster_path}`;
    } else {
        movie_img = emptyPosterImage;
    }
    const { removeFromWishlist } = useWishlist();
    const navigate = useNavigate();

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        if (tooltipTriggerList.length > 0) {
            tooltipTriggerList.forEach((tooltipTriggerEl) => {
                new Tooltip(tooltipTriggerEl);
            });
        }
    }, []);

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents navigation when clicking the heart icon

        const tooltipElement = e.currentTarget;
        if (tooltipElement) {
            const tooltipInstance = Tooltip.getInstance(tooltipElement);
            if (tooltipInstance) {
                tooltipInstance.dispose();
            }
        }

        setTimeout(() => {
            removeFromWishlist(movie);
        }, 0);
    };

    const goToDetails = () => {
        if (movie.title) {
            navigate(`/movie/${movie.id}`); // Redirects to the movie details page
        } else {
            navigate(`/tv/${movie.id}`); // Redirects to the TV show details page
        }
    };

    return (
        <div className="card p-3 shadow" style={{ borderRadius: "19px", backgroundColor: "#F8F8F8", cursor: "pointer" }} onClick={goToDetails}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={movie_img} className="img-fluid" alt={movie.title || movie.name} style={{ borderRadius: "27px", maxHeight: "250px" }} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <h2
                                className="card-title mb-0"
                                style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {movie.title || movie.name}
                            </h2>
                            <a
                                href="#"
                                onClick={handleWishlistToggle}
                                className="mb-0 mr-3"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-custom-class="custom-tooltip"
                                data-bs-title="Delete from Watchlist."
                            >
                                <FontAwesomeIcon icon={faHeart} className="fs-1 text-primary" />
                            </a>
                        </div>
                        <p className="card-text mb-1">
                            <small style={{ color: "#858585" }}>{movie.release_date || movie.first_air_date}</small>
                        </p>
                        <div className="d-flex mb-2">
                            <Rating
                                name="half-rating-read"
                                className="me-1"
                                style={{ color: "#292D32" }}
                                defaultValue={movie.vote_average ? movie.vote_average / 2 : 0}
                                precision={0.5}
                                readOnly
                            />
                            <p className="card-text mb-0">
                                <small className="text-black">{movie.vote_count}</small>
                            </p>
                        </div>
                        <p
                            className="card-text text-dark"
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {movie.overview}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishListCard;
