import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const picture_apis = API_URLs.picture;

export const apiCall_getByCode = async (id) => {
  return http.get(picture_apis.getByCode + '?id=' + id);
};

export const apiCall_addPhoto = async (data) => {
  return http.post(picture_apis.addPhoto, data);
};


export const apiCall_branchLogin = async (data) => {
  return http.post(picture_apis.barnchlogin, data);
};