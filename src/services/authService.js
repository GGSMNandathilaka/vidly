import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiEndpoint } from "../config.json";

const authApiEndpoint = `${apiEndpoint}/auth`;

export async function login(email, password) {
  const { data: jwt } = await http.post(authApiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
}

export function loginWithJWT(jwt) {
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    if (ex.response) {
      console.log(ex.response.data);
      return null;
    }
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJWT,
};
