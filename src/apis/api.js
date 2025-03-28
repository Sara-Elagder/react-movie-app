import config from './config'
import axios from 'axios'

export const movieList = async () => {
  try {
    const response = await axios.get(`${config.BASE_URL}movie/now_playing?api_key=${config.API_KEY}`)
    return response.data.results
  } catch (error) {
    console.error('Error fetching movie list:', error)
    throw error // إن شاء الله مفيش ايرور ولا حاجة بس احتياطي
  }
}

// Fetch reviews for a specific movie
export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`${config.BASE_URL}movie/${movieId}/reviews?api_key=${config.API_KEY}`);
    return response.data.results; // Returns an array of reviews
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};

// Fetch details for a specific TV show
export const fetchTvShowDetails = async (seriesId) => {
  try {
    const response = await axios.get(`${config.BASE_URL}tv/${seriesId}?api_key=${config.API_KEY}`);
    return response.data; // Returns TV show details
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    throw error;
  }
};