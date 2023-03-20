import {ApiRequest, PostApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const DeleteUser = async (userId) => {
    return await ApiRequest(ApiConstants.Users.Delete(userId), 'DELETE');
}

export const CreateUser = async (data) => {
    return await PostApiRequest(ApiConstants.Users.Create, data);
}

export const UpdateUser = async (userId, data) => {
    return await PostApiRequest(ApiConstants.Users.Update(userId), data);
}