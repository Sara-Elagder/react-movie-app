import { useEffect, useState } from "react";
import { movieListPopular } from "../apis/api";
import Pagination from "../components/pagination";
import { useLanguage } from "../context/LanguageContext"; // Import LanguageContext

function MoviePopularList() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { language } = useLanguage(); // Get the selected language from context

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { moviesPopular, totalPages } = await movieListPopular(currentPage, language); // Pass language to API
                setMovies(moviesPopular);
                setTotalPages(totalPages);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            }
        };

        fetchMovies();
    }, [currentPage, language]); // Re-fetch when currentPage or language changes

    return (
        <>
            <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </>
    );
}

export default MoviePopularList;
