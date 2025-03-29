import { getTvShowsList } from "../apis/api";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext"; // Import LanguageContext
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
function TVShowsList() {
    const [loading, setLoading] = useState(true);
    const [shows, setShows] = useState([]);
    const { language } = useLanguage(); // Get the selected language from context

    useEffect(() => {
        const fetchShows = async () => {
            try {
                setLoading(true); // Start loading
                const showsList = await getTvShowsList(language); // Pass language to API
                setShows(showsList);
            } catch (error) {
                console.error("Error fetching TV shows:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchShows();
    }, [language]); // Re-fetch when language changes
    // Show Loader while loading
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <SearchBar />
            <div className="row mt-5">
                {shows?.map((show) => (
                    <div key={show.id} className="col-2 mb-4">
                        <MovieCard movieObj={show} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default TVShowsList;
