import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const birthDay_apis = API_URLs.birthday;

// Get All BirthDay
export const apiCall_getAllBirthDay = async () => {
  return http.get(birthDay_apis.getAllList);
};

// Create BirthDay
export const apiCall_createBirthDay = async ({
  title,
  occasion,
  month,
  day,
}) => {
  return http.post(birthDay_apis.create, { title, occasion, month, day });
};

// Delete BirthDay
export const apiCall_deleteBirthDay = async (id) => {
  return http.post(birthDay_apis.delete + `?id=${id}`);
};
