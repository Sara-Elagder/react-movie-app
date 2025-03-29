import { getTvShowsList } from '../apis/api'
import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
function TVShowsList() {
  const [shows, setShows] = useState([])
  //const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchShows = async () => {
      const showsList = await getTvShowsList();
      setShows(showsList);

    };
    fetchShows();
  }, []);


  return (
    <>
      <SearchBar />
      <div className='row mt-5'>
        {shows?.map((show) => (
          <div key={show.id} className='col-2 mb-4'>
            <MovieCard movieObj={show} />
          </div>
        ))}
      </div>
    </>
  )


}
export default TVShowsList