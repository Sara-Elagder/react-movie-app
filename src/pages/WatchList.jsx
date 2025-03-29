import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrokenHeart from "../assets/broken-heart.svg";
import { useWishlist } from "../context/wishList";
import WishListCard from "../components/WishListCard";
import Loader from "../components/Loader"; // Import the Loader component

const WatchList = () => {
    const { wishList } = useWishlist();
    const [loading, setLoading] = useState(true); // State to track loading

    // Separate movies and TV shows
    const movies = wishList.filter((item) => item.title); // Movies have a `title` property
    const tvShows = wishList.filter((item) => item.name); // TV shows have a `name` property

    useEffect(() => {
        // Simulate a loading delay (e.g., for fetching data)
        const timer = setTimeout(() => {
            setLoading(false); // Stop loading after a delay
        }, 1000);

        return () => clearTimeout(timer); // Cleanup the timer
    }, [wishList]);

    if (loading) {
        return <Loader />; // Show Loader while loading
    }
    return (
        <>
            <h1 className="fs-4 fw-bold">Watchlist</h1>
            <hr />

            <div className="d-flex flex-column align-items-center justify-content-center">
                {wishList.length === 0 ? (
                    <div className="d-flex flex-column align-items-center text-center">
                        <img src={BrokenHeart} alt="Broken Heart" className="opacity-50" />
                        <p className="fs-5 mt-3 text-secondary">No Movies or TV Shows in watchlist</p>
                        <Link to="/" className="mt-4 btn btn-warning text-dark fw-semibold px-4 py-2">
                            Back to home
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Movies Section */}
                        {movies.length > 0 && (
                            <>
                                <h2 className="fs-5 fw-bold mt-4">Movies</h2>
                                <div className="row">
                                    {movies.map((movie) => (
                                        <div className="col-12 col-md-6 p-3" key={movie.id}>
                                            <WishListCard movie={movie} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* TV Shows Section */}
                        {tvShows.length > 0 && (
                            <>
                                <h2 className="fs-5 fw-bold mt-4">TV Shows</h2>
                                <div className="row">
                                    {tvShows.map((tvShow) => (
                                        <div className="col-12 col-md-6 p-3" key={tvShow.id}>
                                            <WishListCard movie={tvShow} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default WatchList;
