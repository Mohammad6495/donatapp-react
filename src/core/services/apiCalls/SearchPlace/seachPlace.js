import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const searchPlace_apis = API_URLs.searchPlace;

export const apiCall_seachPlace = async (items) => {
  return http.post(searchPlace_apis.search, {...items});
};
