import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const refrigeratorCake_apis = API_URLs.refrigeratorCake;

// ----- Get Refrigerator Cake List Api -----
export const apiCall_getAllRefrigeratorCake = async (sizeId) => {
  return http.get(
    refrigeratorCake_apis.getRefrigeratorCakeList + `?sizeId=${sizeId || ''}`
  );
};

// ----- Get Refrigerator Cake Detail Api -----
export const apiCall_getRefrigeratorCakeDetail = async ({ cakeId }) => {
  return http.get(
    refrigeratorCake_apis.getRefrigeratorCakeDetail + "?cakeId=" + cakeId
  );
};

export const apiCall_directrefrigeratorcakedetail = async ({ cakeId }) => {
  return http.get(
    refrigeratorCake_apis.directrefrigeratorcakedetail + "?cakeId=" + cakeId
  );
};

export const apiCall_unreserveCake = async ({ cakeId }) => {
  return http.post(refrigeratorCake_apis.unreserveCake + "?id=" + cakeId);
};

export const apiCall_reserveCake = async ({ cakeId }) => {
  return http.post(refrigeratorCake_apis.reserveCake + "?id=" + cakeId);
};

export const apiCall_currentDate = async () => {
  return http.get(refrigeratorCake_apis.currentDate);
};

