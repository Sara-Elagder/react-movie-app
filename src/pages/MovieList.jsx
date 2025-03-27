import { movieList } from '../apis/api'
import { useEffect, useState } from 'react';
import { useWishlist } from '../context/wishList';
function MovieList(){
    const [movie, setmovies] = useState()
    //const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
      const fetchMovies = async () => {
        const movies = await movieList();
        setmovies(movies);
  
      };
      fetchMovies();
    }, []);
  
    console.log(movie)
  
  
}
export default MovieList