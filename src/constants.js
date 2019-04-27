export const API_TOKEN = process.env.REACT_APP_API_KEY;
export const API_URL = "https://api.themoviedb.org/3";

export const posterSizes = ["w92","w154","w185","w342","w500","w780","original"];
export const imgUrl = 'http://image.tmdb.org/t/p/';

function getPosterUrl(filename) {
  let posterSize = "w780"
  if(!posterSizes.includes('w780')){
    posterSize = "w780";
  }
  return `${imgUrl}${posterSize}/${filename}`;
} 
function getBackdropUrl(filename) {
  let backgroundSize = "w1280"
  // if(!backgroundSizes.includes('w1280')){
  //   backgroundSize = "w780";
  // }
  return `${imgUrl}${backgroundSize}/${filename}`;
} 

export default { API_TOKEN, API_URL, getPosterUrl, getBackdropUrl }
