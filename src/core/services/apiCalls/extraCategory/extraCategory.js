import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const extraCategory_apis = API_URLs.extraCategory;

// Get All Category
export const apiCall_getAllExtraCategory = () => {
  return http.get(extraCategory_apis.getExtraCategoryList );
};

