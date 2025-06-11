import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const auth_apis = API_URLs.authentincation;

export const apiCall_signup = async ({ phoneNumber, firstname, lastname, email, password, repeatPassword, referralCode }) => {

  const formdata = new FormData();

  formdata.append("Email", email);
  formdata.append("LastName", lastname);
  formdata.append("Phone", phoneNumber);
  formdata.append("Password", password);
  formdata.append("FirstName", firstname);
  formdata.append("Phone", repeatPassword);
  if (referralCode) {
    formdata.append("ReferralCode", referralCode);
  }
  return http.post(auth_apis.signup.replace("%E2%80%8B", ""), formdata, { headers: { authorization: "bearer " + localStorage.getItem("helperBrokerToken") } });
};

export const apiCall_login = async ({ password, email }) => {

  const formdata = new FormData();

  formdata.append("email", email);
  formdata.append("password", password);

  return http.post(auth_apis.login, formdata);
};

export const apiCall_verify = async ({ email, verifyCode }) => {

  const formdata = new FormData();

  formdata.append("Email", email);
  formdata.append("VerificationCode", verifyCode);

  return http.put(auth_apis.verify, formdata);
};

export const apiCall_resendEmail = async ({ email }) => {

  const formdata = new FormData();

  formdata.append("Email", email);

  return http.put(auth_apis.resendEmail, formdata);
};

export const apiCall_forgetPassword = async ({ email, password, repeatPassword, code }) => {

  const formdata = new FormData();

  formdata.append("Email", email);
  formdata.append("Code", code);
  formdata.append("Password", password);
  formdata.append("ConfirmPassword", repeatPassword);

  return http.put(auth_apis.forgetPass, formdata);
};

// authentication
export const apiCall_accountAuthentication = async ({
  id,
  birthDate,
  address,
  country,
  city,
  province,
  postalCode,
  idCard_On,
  idCard_Back,
  addressCertificatePath,
}) => {

  const formdata = new FormData();

  formdata.append("Id", id);
  formdata.append("BirthDate", birthDate);
  formdata.append("Address", address);
  formdata.append("Country", country);
  formdata.append("City", city);
  formdata.append("Province", province);
  formdata.append("PostalCode", postalCode);
  formdata.append("IdCard_On", idCard_On);
  formdata.append("IdCard_Back", idCard_Back);
  formdata.append("AddressCertificatePath", addressCertificatePath);

  return http.post(auth_apis.accountAuthentication, formdata);
};

export const apiCall_getAuthenticationData = async () => {
  // return fetch({ url: auth_apis.getAuthenticationData, method: "GET", headers: { authorization: "bearer " + localStorage.getItem("helperBrokerToken") } });
  return http.get(auth_apis.getAuthenticationData, { headers: { authorization: "bearer " + localStorage.getItem("helperBrokerToken") } });
};
