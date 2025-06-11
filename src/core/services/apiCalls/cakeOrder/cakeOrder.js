import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const cakeOrder_apis = API_URLs.cakeOrder;

// Create BirthDay
export const apiCall_submitCakeOrder = async (items) => {
  return http.post(cakeOrder_apis.submit, items);
};

export const apiCall_getOrder = async () => {
  return http.get(cakeOrder_apis.cakeorder);
};


export const apiCall_getTypes = async () => {
  return http.get(cakeOrder_apis.getTypes);
};

export const apiCall_getSetting = async () => {
  return http.get(cakeOrder_apis.setting);
};


export const apiCall_customerorders = async () => {
  return http.get(cakeOrder_apis.customerorders);
};

export const apiCall_customerorderdetail = async (id) => {
  return http.get(cakeOrder_apis.customerorderdetail + '?id=' + id);
};

export const apiCall_pay = async (id) => {
  return http.post(cakeOrder_apis.pay + '?id=' + id);
};

