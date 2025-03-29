import config from './config'
import axios from 'axios'

export const getMoviesList = async () => {
  try {
    const response = await axios.get(`${config.BASE_URL}movie/now_playing?api_key=${config.API_KEY}`)
    
    return response.data.results
  } catch (error) {
    console.error('Error fetching movie list:', error)
    throw error // إن شاء الله مفيش ايرور ولا حاجة بس احتياطي
  }
}