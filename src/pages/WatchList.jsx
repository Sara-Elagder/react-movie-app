import React from "react";
import { Link } from "react-router-dom";
import BrokenHeart from "../assets/broken-heart.svg";
import { useWishlist } from "../context/wishList";
import WishListCard from "../components/WishListCard";

const WatchList = () => {
    // console.log(useWishlist());
    const { wishList } = useWishlist();
    // console.log(wishList);

    return (
        <>
            <h1 className=" fs-4 fw-bold">Watchlist</h1>
            <hr />

            <div className="d-flex flex-column align-items-center justify-content-center   ">
                {wishList.length === 0 ? (
                    <div className="d-flex flex-column align-items-center text-center">
                        <img src={BrokenHeart} alt="Broken Heart" className=" opacity-50" />
                        <p className="fs-5 mt-3 text-secondary">No Movies in watchlist</p>
                        <Link to="/" className="mt-4 btn btn-warning text-dark fw-semibold px-4 py-2">
                            Back to home
                        </Link>
                    </div>
                ) : (
                    <div className="row ">
                        {wishList.map((movie) => (
                            <div className="col-6 p-3" key={movie.id}>
                                <WishListCard movie={movie} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default WatchList;
