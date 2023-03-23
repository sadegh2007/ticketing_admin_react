import {ApiRequest, PostApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const GetRoleById = async (roleId) => {
    return await ApiRequest(ApiConstants.Users.Roles.Get(roleId), 'GET');
}

export const CreateRole = async (data) => {
    return await ApiRequest(ApiConstants.Users.Roles.Create, 'POST', data);
}

export const UpdateRole = async (roleId, data) => {
    return await ApiRequest(ApiConstants.Users.Roles.Update(roleId), 'PUT', data);
}

export const DeleteRole = async (roleId) => {
    return await ApiRequest(ApiConstants.Users.Roles.Delete(roleId), 'DELETE');
}