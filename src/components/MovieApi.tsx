
const API_URL = "https://api.themoviedb.org/3";

export const posterSizes = [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original",
];
export const imgUrl = "http://image.tmdb.org/t/p/";

export function getPosterUrl(filename) {
  let posterSize = "w780";
  if (!posterSizes.includes("w780")) {
    posterSize = "w780";
  }
  return `${imgUrl}${posterSize}${filename}`;
}

export function getBackdropUrl(filename) {
  let backgroundSize = "w1280";
  return `${imgUrl}${backgroundSize}/${filename}`;
}

export const searchMovies = (q) => {
  const params = new URLSearchParams({
    query: q,
    page: 1,
  });
  const url = `${API_URL}/search/movie?${params}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };
  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("Movie Search Error:", err));
};

export const getMovie = (id) => {
  const params = new URLSearchParams({
    crossDomain: true,
  });
  const url = `${API_URL}/movie/${id}?${params}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("Movie Not Found:", err));
};

export const getRecommendations = (id) => {
  const params = new URLSearchParams({
    crossDomain: true,
  });
  const url = `${API_URL}/movie/${id}/recommendations?${params}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };
  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("Movie Recommendation Error:", err));
};