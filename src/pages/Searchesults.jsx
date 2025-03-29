import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../apis/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/pagination";
import Loader from "../components/Loader";
const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    const page = queryParams.get("page") || 1;

    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
        navigate(`/search?query=${encodeURIComponent(query)}&page=${newPage}`);
    };

    const [currentPage, setCurrentPage] = useState(page);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!query) {
                return;
            }

            try {
                setLoading(true);
                const { results, total_pages } = await searchMovies(query, "en-US", page);
                setMovies(results);
                setTotalPages(total_pages);
            } catch (err) {
                setError(err);
                setLoading(false);
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchMovies();
    }, [currentPage, query, page]); // Properly close the useEffect block

    // Show Loader while loading
    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            <div className="grid grid-cols-1 sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
                {movies?.map((movie) => (
                    <div key={movie.id} className="">
                        <MovieCard movieObj={movie} />
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div>{" "}
        </div>
    );
};

export default SearchResults;
