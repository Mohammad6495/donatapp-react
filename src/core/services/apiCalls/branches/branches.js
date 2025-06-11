import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const branch_apis = API_URLs.branch;

// Get All Branches List
export const apiCall_getAllBranches = async () => {
  return http.get(branch_apis.getBranchList);
};

// Get Current Branch
export const apiCall_getCurrentBranch = async () => {
  return http.get(branch_apis.getCurrentBranch);
};

// Get Closest Branch
export const apiCall_getClosestBranch = async ({ lat, lng: long }) => {
  return http.get(branch_apis.getClosestBranch, { lat, long });
};

// Get Closest Branch
export const apiCall_getMainPageBanners = async () => {
  return await http.get(branch_apis.getBanner);
};

// Get Branch Availability
export const apiCall_getBranchAvailability = async () => {
  return await http.get(branch_apis.getBranchAvailability);
};

// Get Creamycookieprice Branch
export const apiCall_getcreamycookieprice = async () => {
  return await http.get(branch_apis.getcreamycookieprice);
};

// Get Creamycookieprice Branch
export const apiCall_get = async () => {
  return await http.get(branch_apis.get);
};

// Get Creamycookieprice Branch
export const apiCall_showsmsmessage = async () => {
  return await http.get(branch_apis.showsmsmessage);
};