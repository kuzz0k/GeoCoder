import axios from 'axios'


export async function latToPlace(lat, lon) {
  const apiUrl = `https://us1.locationiq.com/v1/reverse?key=${import.meta.env.VITE_GEOCODE_API_KEY}&lat=${lat}&lon=${lon}&format=json`;


  try {
    const {data} = await axios.get(apiUrl)
    return data;
  } catch (error) {
    console.log(error)
  }
}
