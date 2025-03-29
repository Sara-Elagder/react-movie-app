import React from "react";
import RateCircle from "./rate_circle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../context/wishList";
import emptyPosterImage from "../assets/empty_poster.png"; // Import the image
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MovieCard = ({ movieObj }) => {
    const { addToWishlist, removeFromWishlist, inWishlist } = useWishlist();
    const { id, title, name, first_air_date, poster_path, vote_average, release_date } = movieObj;

    const isInWishlist = inWishlist(movieObj);
    const navigate = useNavigate(); // Initialize useNavigate

    // Toggle wishlist status
    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent navigation when clicking the heart icon
        if (isInWishlist) {
            removeFromWishlist(movieObj);
        } else {
            addToWishlist(movieObj);
        }
    };

    // Navigate to movie details
    const goToMovieDetails = () => {
        if (title) {
            navigate(`/movie/${id}`); // to the movie details page}
        }
        else {
            navigate(`/tv/${id}`); // to the tv-show details page}
        }
    };

    return (
        <div
            id={`movie-card-${id}`}
            className="sm:w-full bg-white rounded-xl overflow-hidden"
            style={{ minHeight: "310px", cursor: "pointer" }}
            onClick={goToMovieDetails} // Add click handler for navigation
        >
            <div className="relative">
                <a href="#" onClick={(e) => e.preventDefault()}>
                    {poster_path ? (
                        <img className="rounded-xl w-full" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
                    ) : (
                        <img className="rounded-xl w-full" src={emptyPosterImage} alt="No Poster Available" />
                    )}
                </a>
                <div className="absolute bottom-0 left-5 transform translate-y-1/2">
                    <RateCircle rate={Math.round(vote_average * 10)} className="w-14 h-14" />
                </div>
            </div>

            <div className="flex pt-3 pb-5 mt-3">
                <div className="flex flex-col justify-between w-5/6">
                    <p
                        className="text-black mb-0 ps-3 font-bold text-left"
                        title={title} // Add tooltip with full title on hover
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            height: "3em", // Fixed height for 2 lines
                            lineHeight: "1.5em", // Helps with consistent line height
                        }}
                    >
                        {title || name}
                    </p>
                    <p className="px-4 mb-0 text-gray-500">{release_date || first_air_date}</p>
                </div>
                <div className="flex justify-end items-end my-1 w-1/6 h-16">
                    <a href="#" onClick={handleWishlistToggle} className="mb-0 mr-3">
                        <FontAwesomeIcon icon={faHeart} className={`text-3xl ${isInWishlist ? "text-primary" : "fa-regular text-gray-300"}`} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
