import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const account_apis = API_URLs.account;

// ----- Register Api -----
export const apiCall_register = async (phoneNumber) => {
  return http.post(account_apis.register, { phoneNumber });
};

// ----- Verify Register Api -----
export const apiCall_verifyRegister = async ({ code, phoneNumber, refererCode }) => {
  return http.post(account_apis.verify, { code, phoneNumber, refererCode });
};

// ----- Verify Register User Api -----
export const apiCall_verifyRegisterUser = async ({ code, phoneNumber }) => {
  return http.post(account_apis.verifyUser, { code, phoneNumber });
};

// ----- Get User Profile Api -----
export const apiCall_getUserProfile = async () => {
  return http.get(account_apis.getProfile);
};

export const apiCall_getbalance = async () => {
  return http.get(account_apis.balance);
};


export const apiCall_increasebalance = async (amount) => {
  return http.post(account_apis.increasebalance + '?amount=' + amount);
};


// ----- Edit User Profile Api -----
export const apiCall_editProfile = async ({
  firstName,
  lastName,
  email,
  nationalCode
}) => {
  const formdata = new FormData();

  formdata.append("firstName", firstName);
  formdata.append("lastName", lastName);
  formdata.append("email", email);
  formdata.append("nationalCode", nationalCode);

  return http.put(account_apis.editProfile, formdata);
};


export const apiCall_sendCodeAgain = async ({
  phoneNumber
}) => {

  return http.post(account_apis.didntreceivesms + '?phoneNumber=' + phoneNumber);
};




export const apiCall_getreffercode = async () => {
  return http.get(account_apis.getreffercode);
};
export const apiCall_getreffertext = async () => {
  return http.get(account_apis.getreffertext);
};
export const apiCall_exists = async (phone) => {
  return http.get(account_apis.exists + '?phone=' + phone);
};