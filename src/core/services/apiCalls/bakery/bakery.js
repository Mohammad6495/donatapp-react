import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const bakery_apis = API_URLs.bakery;

// Get Bakery Filter Items
export const apiCall_getBakeryFilterItemsList = async () => {
  return http.get(bakery_apis.getBakeryItemsList);
};
