import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const home_apis = API_URLs.home;

// Get All Cake Size
export const apiCall_getAllCakeSize = async (productType) => {
  return http.get(home_apis.getAllCakeSize + '?productType=' + productType);
};
export const apiCall_getBranchProductsAvailability = async () => {
  return http.get(home_apis.getBranchProductsAvailability);
};
