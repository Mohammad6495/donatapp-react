import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const products_apis = API_URLs.products;

// Get All Bakery
export const apiCall_getAllBakery = async (typeId) => {
  return http.get(products_apis.getBakeryList + `?CategoryId=${typeId}`);
};

// Get All Dessert
export const apiCall_getAllDessert = async (typeId) => {
  return http.get(products_apis.getDessertList + `?CategoryId=${typeId}`);
};

// Get All Extras
export const apiCall_getAllExtras = async ({ CategoryId }) => {
  return http.get(products_apis.getExtrasList + `${CategoryId != undefined ? `?CategoryId=${CategoryId}`: ''} `);
};

// Get All Norouzi
export const apiCall_getAllNorouzi = async () => {
  return http.get(products_apis.getNorouziList);
};

// Get Dessert Filter Items
export const apiCall_getDessertFilterItemsList = async () => {
  return http.get(products_apis.getDessertItemsList);
};
