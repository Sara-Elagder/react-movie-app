import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Watchlist = lazy(() => import("./pages/Watchlist"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Loader = lazy(() => import("./components/Loader"));

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
