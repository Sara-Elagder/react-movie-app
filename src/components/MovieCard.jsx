import React from 'react';
import RateCircle from './rate_circle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


const MovieCard = ({ movieObj }) => {
  const { id, title, poster_path, vote_average, release_date } = movieObj;

  return (
    <div id={`movie-card-${id}`}
      className="max-w-sm bg-white rounded-xl overflow-hidden">
      <div className='relative'>
        <a href="#">
          <img className="rounded-xl w-full" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
        </a>
        <div className="absolute bottom-0 left-5 transform translate-y-1/2">
          <RateCircle rate={Math.round(vote_average * 10)} className='w-16 h-16' />
        </div>
      </div>

      <div className='pt-10 px-5 pb-5 mt-3'>
        <h1 className="text-lg text-black font-semibold text-left">{title}</h1>
        <div className='flex justify-between items-center mt-2'>
          <span className='text-black' >{release_date}</span>
          <FontAwesomeIcon icon={faHeart} style={{ color: "#FFE353" }} className="text-3xl fa-regular" />

        </div>
      </div>
    </div>
  );
};

export default MovieCard;