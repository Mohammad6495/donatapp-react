import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const visit_apis = API_URLs.visit;

// Get All visits
export const apiCall_createdVisit = ({ webPage, ip, domain }) => {
    const data = { webPage, ip, domain}
    return http.post(visit_apis.create, data);
};