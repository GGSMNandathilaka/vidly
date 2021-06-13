import http from "./httpService";
import { apiEndpoint } from "../config.json";

const movieApiEndpoint = `${apiEndpoint}/movies`;

function movieUrl(id) {
  return `${movieApiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(movieApiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export function updateMovie(movieId, data) {
  return http.put(movieUrl(movieId), data);
}

export function createMovie(data) {
  return http.post(movieApiEndpoint, data);
}
