import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaLink, FaHeart } from "react-icons/fa";
import Recommendations from "../components/recommendations";
import Loader from "../components/Loader";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import emptyPosterImage from "../assets/empty_poster.png";
import ReviewCard from "../components/ReviewCard";
import { fetchTvShowDetails, MovieReviews } from "../apis/api";
import { useLanguage } from "../context/LanguageContext";
import { useWishlist } from "../context/wishList";

const TVShowDetails = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewError, setReviewError] = useState(null);
  const { language } = useLanguage();
  const { addToWishlist, removeFromWishlist, inWishlist } = useWishlist();

  // Log when language changes to verify it's working
  useEffect(() => {
    console.log(`Language changed to: ${language}`);
  }, [language]);

  useEffect(() => {
    const fetchTvShow = async () => {
      setLoading(true);
      try {
        console.log(`Fetching TV show with ID: ${id} in language: ${language}`);
        const tvShowData = await fetchTvShowDetails(id, language);
        setTvShow(tvShowData);
        console.log(`Successfully fetched TV show data in ${language}`);
      } catch (err) {
        setError("Failed to fetch TV show details. Please try again.");
        console.error(`Failed to fetch TV show details in ${language}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShow();
  }, [id, language]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log(`Fetching reviews for TV show ID: ${id} in language: ${language}`);
        const reviewDetails = await MovieReviews(id, language);
        setReviews(reviewDetails);
        console.log(`Successfully fetched ${reviewDetails.length} reviews in ${language}`);
      } catch (error) {
        setReviewError("Failed to fetch reviews.");
        console.error(`Failed to fetch reviews in ${language}:`, error);
      }
    };
    fetchReviews();
  }, [id, language]);

  // Handle wishlist toggle
  const handleWishlistToggle = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (inWishlist(tvShow)) {
      removeFromWishlist(tvShow);
      console.log(`Removed TV show ${tvShow.name} from wishlist`);
    } else {
      addToWishlist(tvShow);
      console.log(`Added TV show ${tvShow.name} to wishlist`);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-danger text-center">{error}</p>;

  // Check if the TV show is in the wishlist
  const isInWishlist = inWishlist(tvShow);

  // Add additional language-aware display elements
  const displayLanguage = () => {
    return language === 'en-US' ? 'English' :
      language === 'ar-SA' ? 'Arabic' :
        language === 'fr-FR' ? 'French' :
          language.toUpperCase();
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-start">
        <Col md={4} className="text-start">
          <img
            className="rounded-3 img-fluid"
            src={tvShow.poster_path ? `${import.meta.env.VITE_IMAGE_URL}${tvShow.poster_path}` : emptyPosterImage}
            alt={tvShow.name}
            style={{ width: "100%", objectFit: "cover", borderRadius: "27px" }}
          />
        </Col>
        <Col md={8}>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h3 fw-bold" style={{ fontSize: "48px", color: "#000" }}>{tvShow.name}</h1>
            <FaHeart
              onClick={handleWishlistToggle}
              className="fs-4"
              role="button"
              style={{
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                color: isInWishlist ? "#FFE353" : "#6c757d"
              }}
            />
          </div>
          <p className="text-muted">{tvShow.first_air_date || "N/A"}</p>
          <p style={{ fontSize: "24px", color: "#000" }}>{tvShow.overview || "No overview available."}</p>
          <div className="mb-3 d-flex flex-wrap mt-5" style={{ gap: "10px" }}>
            {tvShow.genres?.map((genre) => (
              <Badge key={genre.id} className="me-2" style={{ backgroundColor: "#FFE353", borderRadius: "25px", padding: "10px 15px", color: "#000" }}>{genre.name}</Badge>
            ))}
          </div>
          <Row className="mt-4">
            <Col><p><strong>Episodes:</strong> {tvShow.number_of_episodes || "N/A"}</p></Col>
            <Col><p><strong>Seasons:</strong> {tvShow.number_of_seasons || "N/A"}</p></Col>
            <Col>
              <p><strong>Language:</strong> {tvShow.original_language?.toUpperCase() || "N/A"}</p>
              <p><strong>Displayed in:</strong> {displayLanguage()}</p>
            </Col>
          </Row>
          {tvShow.production_companies?.length > 0 && tvShow.production_companies[0].logo_path && (
            <div className="mt-4">
              <img
                className="img-fluid"
                src={`${import.meta.env.VITE_IMAGE_URL}${tvShow.production_companies[0].logo_path}`}
                alt={tvShow.production_companies[0].name}
                style={{ width: "150px" }}
              />
            </div>
          )}
          {tvShow.homepage && tvShow.homepage.trim() && (
            <Button
              className="border fw-bold mt-4 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "transparent",
                borderColor: "#FFE353",
                borderRadius: "25px",
                padding: "10px 15px",
                color: "#000",
                width: "122px",
                height: "37px",
                gap: "8px"
              }}
              href={tvShow.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
              <FaLink style={{ color: "#292D32", fontSize: "18px" }} />
            </Button>
          )}
        </Col>
      </Row>
      <hr className="mt-5" />
      <Row>
        <Col>
          <Recommendations movieId={id} />
        </Col>
      </Row>
      <hr />
      <div className="movie-reviews">
        <h1 className="movie-reviews-header">Reviews</h1>
        {reviewError ? (
          <p className="text-danger">{reviewError}</p>
        ) : reviews.length > 0 ? (
          <ReviewCard reviews={reviews} />
        ) : (
          <p>No reviews available for this TV show.</p>
        )}
      </div>
    </Container>
  );
};

export default TVShowDetails;



