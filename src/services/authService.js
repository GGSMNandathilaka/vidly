import http from "./httpService";
import { apiEndpoint } from "../config.json";

const authApiEndpoint = `${apiEndpoint}/auth`;

export function login(email, password) {
  return http.post(authApiEndpoint, { email, password });
}
