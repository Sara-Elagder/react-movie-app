import { getTvShowsList } from "../apis/api";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext"; // Import LanguageContext
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

function TVShowsList() {
    const [shows, setShows] = useState([]);
    const { language } = useLanguage(); // Get the selected language from context

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const showsList = await getTvShowsList(language); // Pass language to API
                setShows(showsList);
            } catch (error) {
                console.error("Error fetching TV shows:", error);
            }
        };

        fetchShows();
    }, [language]); // Re-fetch when language changes

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
