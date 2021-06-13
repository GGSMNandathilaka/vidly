import http from "./httpService";
import { apiEndpoint } from "../config.json";

const userApiEndpoint = `${apiEndpoint}/users`;

export function registerUser(user) {
  return http.post(userApiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
