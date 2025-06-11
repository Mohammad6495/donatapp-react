import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const payment_apis = API_URLs.payment;

export const apiCall_getFactor = async (data) => {
  return http.post(payment_apis.getFactor, data);
};
export const apiCall_submitFactor = async (data) => {
  return http.post(payment_apis.submitFactor, data);
};
