import { useEffect, useState } from "react";
import { movieListPopular } from "../apis/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/pagination";
import SearchBar from "../components/SearchBar"; // Import SearchBar
import { useLanguage } from "../context/LanguageContext"; // Import LanguageContext
import Loader from "../components/Loader";
function MoviePopularList() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { language } = useLanguage(); // Get the selected language from context

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true); // Start loading
                const { moviesPopular, totalPages } = await movieListPopular(currentPage, language); // Pass language to API
                setMovies(moviesPopular);
                setTotalPages(totalPages);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchMovies();
    }, [currentPage, language]); // Re-fetch when currentPage or language changes
    // Show Loader while loading
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <SearchBar />
            <div className="grid grid-cols-1 sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
                {movies?.map((movie) => (
                    <div key={movie.id} className="">
                        <MovieCard movieObj={movie} />
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </>
    );
}

export default MoviePopularList;
