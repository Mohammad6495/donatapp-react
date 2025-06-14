import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const cart_apis = API_URLs.cart;

// ----- Get All User Orders List Api -----
export const apiCall_getAllUserOrdersList = async () => {
  return http.get(cart_apis.getAllUserOrdersList);
};

// ----- Get User Order Detail Api -----
export const apiCall_getUserOrderDetail = async (id) => {
  return http.get(cart_apis.getOrderDetail + `?orderId=${id}`);
};

// ----- Pay Final Price Api -----
export const apiCall_payFinalPrice = async (id) => {
  return http.post(cart_apis.payFinalPrice + `?orderId=${id}`);
};

// ----- Pay Final Price Api -----
export const apiCall_payIncompleteOrder = async (id) => {
  return http.post(cart_apis.payIncompleteOrder + `?id=${id}`);
};

// ----- activelist Api -----
export const apiCall_activelist = async () => {
  return http.get(cart_apis.activelist);
};
