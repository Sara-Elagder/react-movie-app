import React from 'react';
import RateCircle from './rate_circle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from '../context/wishList';

const MovieCard = ({ movieObj }) => {
  const { addToWishlist, removeFromWishlist, inWishlist } = useWishlist();
  const { id, title, poster_path, vote_average, release_date } = movieObj;

  const isInWishlist = inWishlist(movieObj);

  // toggle wishlist status
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(movieObj);
    } else {
      addToWishlist(movieObj);
    }
  };

  return (
    <div id={`movie-card-${id}`}
      className="max-w-sm bg-white rounded-xl overflow-hidden" style={{ minHeight: '310px' }}>

      <div className='relative'>
        <a href="#">
          <img className="rounded-xl w-full" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
        </a>
        <div className="absolute bottom-0 left-5 transform translate-y-1/2">
          <RateCircle rate={Math.round(vote_average * 10)} className='w-20 h-20' />
        </div>
      </div>

      <div className='pt-10 pb-5 mt-3'>

        <h3 className="text-black px-4 text-3xl font-bold text-left">{title}</h3>

        <div className='flex justify-between items-center my-4 bottom-0'>
          <p className='px-4 mb-0 text-gray-500 text-3xl' >{release_date}</p>
          <a href="#" onClick={handleWishlistToggle}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`text-5xl ${isInWishlist ? 'text-primary' : 'fa-regular text-gray-300'}`}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;