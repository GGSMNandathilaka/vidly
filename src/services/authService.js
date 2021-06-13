import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiEndpoint } from "../config.json";

const authApiEndpoint = `${apiEndpoint}/auth`;
const tokenKey = "token";

http.setJWT(getJWT());

export async function login(email, password) {
  const { data: jwt } = await http.post(authApiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    if (ex.response) {
      console.log(ex.response.data);
      return null;
    }
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJWT,
  getJWT,
};
