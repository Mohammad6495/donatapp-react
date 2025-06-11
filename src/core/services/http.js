import axios from "axios";
import { toast } from "react-toastify";
import { getItem, setItem, removeItem } from "./storage/storage";

// Token Keys :
const branchTokenKey = "BranchCode";
const userTokenKey = "token-donat";
const userBranchTokenKey = "token-branch";
const validInInstagram = "valid-in";
const tipsValue = "tipps-caro";

const setToken = (tokenKey, token) => {
  setItem(tokenKey, token);
};

const getToken = (tokenKey) => {
  return getItem(tokenKey);
};

const removeToken = (tokenKey) => {
  removeItem(tokenKey);
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // check if error is expected from backend

    try {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (expectedError) {
        if (error.response.status === 401) {
          if (
            // !window.location.pathname.includes("/login") ||
            // !window.location.pathname.includes("/verify-login") ||
            !window.location.pathname.includes("/register") &&
            !window.location.pathname.includes("/verify-register")
          ) {
            removeToken(userTokenKey);
            

            const pn = window.location.pathname;
            const publicRoutes = [
              "/",
              "/home",
              "/creamy-cookie",
              "/creamy-cookie-detail",
              "/cookie/",
              "/cookie-detail",
              "/tomorrow-cake",
              "/tomorrow-cake-details/",
              "/refrigerator-cake",
              "/refrigerator-cake-details/",
              "/bakery",
              "/dessert",
              "/faq",
              "/rules",
              "/support",
              "/selected-dessert-items",
              "/selected-bakery-items"
            ];
            if (!publicRoutes.some((path) => pn.includes(path))) {
              window.location.href = "/register";
            }
          }
        }
      }

      // if error doesnt expected when we log it
      if (!expectedError) {
        // tweak it later
        // get error message from backend (see object of response later... maybe its changed)
        try {
          toast.error(error.response.data.message.message[0].message);
        } catch (error) {}
      }
    } catch (error) {}
    return Promise.reject(error);
  }
);

// will send token to headers request ( in token body )
axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: "Bearer " + getItem(userTokenKey),
  };
  return config;
});

const http = {
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  get: axios.get,
  setToken: setToken,
  getToken: getToken,
  removeToken: removeToken,
  branchKey: branchTokenKey,
  tokenKey: userTokenKey,
  tipsValue,
  userBranchTokenKey,
  validInInstagram
};

export default http;
