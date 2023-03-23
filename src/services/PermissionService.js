import {ApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const AllPermissions = async () => {
    return await ApiRequest(ApiConstants.Users.Permissions.All, 'GET');
}