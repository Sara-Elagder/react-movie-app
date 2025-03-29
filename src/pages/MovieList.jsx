import { getMoviesList } from "../apis/api";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { useLanguage } from "../context/LanguageContext";

function MovieList() {
    const { language } = useLanguage();

    const [movies, setMovies] = useState();
    //const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        const fetchMovies = async () => {
            const moviesList = await getMoviesList(language);
            setMovies(moviesList);
        };

        fetchMovies();
    }, [language]);

    return (
        <>
            <SearchBar />
            <div className="row mt-5">
                {movies?.map((movie) => (
                    <div key={movie.id} className="col-2 mb-4">
                        <MovieCard movieObj={movie} />
                    </div>
                ))}
            </div>
        </>
    );
}
export default MovieList;
