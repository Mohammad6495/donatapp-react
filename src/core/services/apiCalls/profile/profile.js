import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const auth_apis = API_URLs.profile;


export const apiCall_getProfile = async () => {
    return http.get(auth_apis.getProfile);
};
export const apiCall_editProfile = async ({ firstName, lastName, email, phone }) => {
    const formdata = new FormData();

    formdata.append("FirstName", firstName);
    formdata.append("LastName", lastName);
    formdata.append("Email", email);
    formdata.append("Phone", phone);

    return http.put(auth_apis.editProfile, formdata);
};
export const apiCall_changePassword = async ({ lastPassword, password, repeatePassword }) => {
    const formdata = new FormData();

    formdata.append("LastPassword", lastPassword);
    formdata.append("Password", password);
    formdata.append("ConfirmPassword", repeatePassword);

    return http.put(auth_apis.changePassword, formdata);
};