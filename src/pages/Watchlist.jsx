import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper"; 
import BrokenHeart from "../assets/broken-heart.svg";

const Watchlist = () => {
  const movies = [];

  return (
    <Wrapper>
      <div className="relative h-screen flex flex-col items-center justify-center bg-white text-center">
        <h1 className="absolute top-0 left-0 p-4 text-2xl font-bold">Watchlist</h1>

        {movies.length === 0 ? (
          <div className="flex flex-col items-center">
            <img src={BrokenHeart} alt="Broken Heart" className="w-[250px] opacity-50" />
            <p className="text-lg mt-3 text-gray-600">No Movies in watchlist</p>
            <Link to="/" className="mt-6 bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg hover:bg-yellow-300 transition">
              Back to home
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {movies.map((movie) => (
              <li key={movie.id} className="text-lg font-medium">{movie.title}</li>
            ))}
          </ul>
        )}
      </div>
    </Wrapper>
  );
};

export default Watchlist;
