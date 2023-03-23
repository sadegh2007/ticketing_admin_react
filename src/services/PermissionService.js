import {ApiRequest, PostApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const AllPermissions = async () => {
    return await ApiRequest(ApiConstants.Users.Permissions.All, 'GET');
}

export const PermissionsList = async () => {
    return await ApiRequest(ApiConstants.Users.Permissions.List, 'POST');
}

export const SyncPermissions = async (data) => {
    return await PostApiRequest(ApiConstants.Users.Permissions.Sync, data);
}