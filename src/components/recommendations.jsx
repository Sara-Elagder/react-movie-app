import { getRecommendations } from "../apis/api";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

function Recommendations({ movieId }) {
    const [recommendations, setRecommendations] = useState([]);
    const { language } = useLanguage();
    const swiperRef = useRef(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies = await getRecommendations(+movieId, language);
                setRecommendations(movies);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };
        fetchMovies();
    }, [movieId, language]);

    // Force autoplay to start
    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.start();
        }
    }, [recommendations]);

    return (
        <div className="w-full max-w-full px-2 md:px-4 my-6">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Recommendations</h1>
            {recommendations.length > 0 ? (
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },  // sm
                        768: { slidesPerView: 4 },  // md
                        1024: { slidesPerView: 5 }, // lg
                        1280: { slidesPerView: 6 }  // xl
                    }}
                    navigation
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    speed={1000}
                    loop={true}
                    onTouchStart={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full"
                >
                    {recommendations.map((movie) => (
                        <SwiperSlide key={movie.id} className="h-auto">
                            <div className="px-1">
                                <MovieCard movieObj={movie} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-gray-600 italic">
                    We don't have enough data to suggest any movies based on this movie.
                    You can help by rating movies you've seen.
                </p>
            )}
            <style>
                {`
                .swiper-button-next, .swiper-button-prev {
                    color: #FFEA50 !important;
                    top: 40% !important;
                    transform: translateY(-50%) !important;
                }
                .swiper-button-next {
                    right: 10px !important;
                }
                .swiper-button-prev {
                    left: 10px !important;
                }
                `}
            </style>
        </div>
    );
}

export default Recommendations;
