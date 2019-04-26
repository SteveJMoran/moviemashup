export const API_TOKEN = process.env.REACT_APP_API_KEY;
export const API_URL = "https://api.themoviedb.org/3";

export const posterSizes = ["w92","w154","w185","w342","w500","w780","original"];
export const posterUrl = 'http://image.tmdb.org/t/p/';

function getPosterUrl(filename) {
  let posterSize = "w185"
  if(!posterSizes.includes('w185')){
    posterSize = "w780";
  }
  return `${posterUrl}${posterSize}/${filename}`;
} 

export default { API_TOKEN, API_URL, getPosterUrl }
