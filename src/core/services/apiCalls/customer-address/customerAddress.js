import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const customerAddress_apis = API_URLs.customerAddress;

// Get Customer Address List
export const apiCall_getCustomerAddressList = async () => {
  return http.get(customerAddress_apis.getCustomerAddressList);
};

// Create Customer Address
export const apiCall_createCustomerAddress = async ({
  address,
  postalCode,
  lat,
  lng,
}) => {
  return http.post(customerAddress_apis.createCustomerAddress, {
    address,
    postalCode,
    lat,
    lng,
  });
};

// Edit Customer Address
export const apiCall_editCustomerAddress = async ({
  id,
  address,
  postalCode,
  lat,
  lng,
}) => {
  return http.post(customerAddress_apis.editCustomerAddress, {
    id,
    address,
    postalCode,
    lat,
    lng,
  });
};

// Customer Address Detail
export const apiCall_customerAddressDetail = async (id) => {
  return http.get(customerAddress_apis.getCustomerAddressDetail + `?id=${id}`);
};

export const apiCall_deleteAddress = async (id) => {
  return http.delete(customerAddress_apis.deleteCustomerAddress + `?id=${id}`);
};

export const apiCall_setDefaultAddress = async (id) => {
  return http.put(customerAddress_apis.setDefaultAddress + `?id=${id}`);
};

export const apiCall_getAddressName = async ({ lat = "", lng = "" }) => {
  return http.post(customerAddress_apis.getAddressName, { lat, lng });
};
