import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const tomorrowCake_apis = API_URLs.tomorrowCake;

// ----- Get Tomorrow Cake List Api -----
export const apiCall_getAllTomorrowCake = async (sizeId) => {
  return http.get(
    sizeId
      ? tomorrowCake_apis.getTomorrowCakeList + `?sizeId=${sizeId}`
      : tomorrowCake_apis.getTomorrowCakeList
  );
};
export const apiCall_getjusttomorrowcakes = async (sizeId) => {
  return http.get(
    sizeId
      ? tomorrowCake_apis.justtomorrowcakes + `?sizeId=${sizeId}`
      : tomorrowCake_apis.justtomorrowcakes
  );
};
export const apiCall_getjjustdayaftertomorrowcakes = async (sizeId) => {
  return http.get(
    sizeId
      ? tomorrowCake_apis.justdayaftertomorrowcakes + `?sizeId=${sizeId}`
      : tomorrowCake_apis.justdayaftertomorrowcakes
  );
};
export const apiCall_getjusttomorrowcakesPagination = async ({
  sizeId,
  CurrentPage = 1,
  PageSize = 30,
}) => {
  return http.get(
    sizeId
      ? tomorrowCake_apis.justtomorrowcakespagination +
          `?sizeId=${sizeId}&CurrentPage=${CurrentPage || ""}&PageDataSize=${
            PageSize || ""
          }`
      : tomorrowCake_apis.justtomorrowcakespagination +
          `?CurrentPage=${CurrentPage || ""}&PageDataSize=${PageSize || ""}`
  );
};
export const apiCall_getjjustdayaftertomorrowcakesPagination = async ({
  sizeId,
  CurrentPage = 1,
  PageSize = 30,
}) => {
  return http.get(
    sizeId
      ? tomorrowCake_apis.justdayaftertomorrowcakespagination +
          `?sizeId=${sizeId}&CurrentPage=${CurrentPage || ""}&PageDataSize=${
            PageSize || ""
          }`
      : tomorrowCake_apis.justdayaftertomorrowcakespagination +
          `?CurrentPage=${CurrentPage || ""}&PageDataSize=${PageSize || ""}`
  );
};

// ----- Get Tomorrow Cake Detail Api -----
export const apiCall_getTomorrowCakeDetail = async ({ cakeId }) => {
  return http.get(
    tomorrowCake_apis.getTomorrowCakeDetail + "?cakeId=" + cakeId
  );
};

// preparement Checkout Tomorrow Cake Factor
export const apiCall_prepaymentfactor = async ({ cakeId }) => {
  return http.get(tomorrowCake_apis.prepaymentfactor + "?cakeId=" + cakeId);
};

// checkout factor
export const apiCall_checkOutTomarrowCakeFactor = async (data) => {
  return http.post(tomorrowCake_apis.checkOut, data);
};

export const apiCall_getTomarrowCakeOrdersList = async () => {
  return http.get(tomorrowCake_apis.getOrdersList);
};
export const apiCall_getTomarrowCakeOrderDetails = async (id) => {
  return http.get(tomorrowCake_apis.getOrderDetails + "?id=" + id);
};
export const apiCall_finalPayment = (id) => {
  return http.post(tomorrowCake_apis.finalPayment + "?id=" + id);
};
export const apiCall_getTimesStatus = () => {
  return http.get(tomorrowCake_apis.timesStatus);
};

// ----- activelist Api -----
export const apiCall_activelist = async () => {
  return http.get(tomorrowCake_apis.activelist);
};
