import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const answer_apis = API_URLs.answer;

export const apiCall_CreateAnswers = (formData) => {
  return http.post(answer_apis.create, formData);
};

export const apiCall_Canswers = (id) => {
  return http.get(answer_apis.cananswer + '?id=' + id);
};