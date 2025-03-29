import { getMoviesList } from "../apis/api";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { useLanguage } from "../context/LanguageContext";
import Loader from "../components/Loader";

function MovieList() {
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();

    const [movies, setMovies] = useState();
    //const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true); // Start loading
                const moviesList = await getMoviesList(language);
                setMovies(moviesList);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchMovies();
    }, [language]);
    // Show Loader while loading
    if (loading) {
        return <Loader />;
    }
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
