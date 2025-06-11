import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const saleTime_apis = API_URLs.saleTime;

export const apiCall_getSaleTime = async () => {
  return http.get(saleTime_apis.saleTimeList);
};
