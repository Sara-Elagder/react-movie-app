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
          <RateCircle rate={Math.round(vote_average * 10)} className='w-14 h-14' />
        </div>
      </div>

      <div className='flex pt-3 pb-5 mt-3'>
        <div className='flex flex-col justify-between w-5/6'>
          <p className="text-black mb-0 ps-3 font-bold text-left"
            title={title} // Add tooltip with full title on hover
            style={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '3em', // Fixed height for 2 lines
              lineHeight: '1.5em' // Helps with consistent line height
            }}>
            {title}
          </p>
          <p className='px-4 mb-0 text-gray-500'>{release_date}</p>
        </div>
        <div className='flex justify-end items-end my-1 w-1/6 h-16'>
          <a href="#" onClick={handleWishlistToggle} className="mb-0 mr-3">
            <FontAwesomeIcon
              icon={faHeart}
              className={`text-3xl ${isInWishlist ? 'text-primary' : 'fa-regular text-gray-300'}`}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;