import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const cookie_apis = API_URLs.cookie;

// Get All Cookies
export const apiCall_getAllCookies = async (typeId) => {
  return http.get(cookie_apis.getCookieList + `?type=${typeId}`);
};

export const apiCall_getAllCreamyCookie = async (categoryId) => {
  return http.get(cookie_apis.getCreamyList + `?categoryId=${categoryId || ''}`);
};

export const apiCall_getAllCategories = async () => {
  return http.get(cookie_apis.getCategoriesList);
};