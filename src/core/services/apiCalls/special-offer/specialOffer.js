import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const specialOffer_apis = API_URLs.specialOffer;

export const apiCall_getSpecialOffer = async ({ cakeId }) => {
  return http.get(specialOffer_apis.getSpecialOffer + "?cakeId=" + cakeId);
};
