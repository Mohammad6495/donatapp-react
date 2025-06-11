import http from "../http";
import { API_URLs } from "../CONSTANTS";

const favorites_apis = API_URLs.favorites;

export const apiCall_getAllTomorrowCake = async () => {
  return http.get(favorites_apis.getFavoriteTomarrowCakes);
};

export const apiCall_addTomarrowCakeToFavorites = async (cakeId) => {
  return http.post(
    favorites_apis.addTomarrowCakeToFavorites + "?cakeId=" + cakeId
  );
};

export const apiCall_removeTomarrowCakeFromFavorites = async (cakeId) => {
  return http.post(
    favorites_apis.removeTomarrowCakeFromFavorites + "?cakeId=" + cakeId
  );
};
