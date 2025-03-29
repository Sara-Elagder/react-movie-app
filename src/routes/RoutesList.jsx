import { Suspense } from "react";
import Loader from "../components/Loader";
import { Route, Routes } from "react-router-dom";
import HeaderLayout from "../components/HeaderLayout";
import NotFound from "../pages/NotFound";
import MovieList from "../pages/MovieList";
import Watchlist from "../pages/WatchList";
import TVShowsList from "../pages/TVShowsList";
import MovieDetails from "../pages/MovieDetails";
import MoviePopularList from "../pages/PopularMovies";

const RoutesList = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route element={<HeaderLayout />}>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/popular" element={<MoviePopularList />} />
                    <Route path="/tvShows" element={<TVShowsList />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default RoutesList;
