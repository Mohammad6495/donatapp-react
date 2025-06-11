import http from "../http";
import { API_URLs } from "../CONSTANTS";

const ip_apis = API_URLs.ip;

export const apiCall_getIpData = async () => {
  return http.get(ip_apis.getIpData);
};
