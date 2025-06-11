import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const calculate_apis = API_URLs.calculatePrice;

// Get Calculated Price
export const apiCall_getCalculatedPrice = async ({
  branchLat,
  branchLng,
  destiniLat,
  destiniLng,
}) => {
  return http.get(
    calculate_apis.calculateSendPrice +
      `?BranchLat=${branchLat}&BranchLng=${branchLng}&DestinationLat=${destiniLat}&DestinationLng=${destiniLng}`
  );
};
