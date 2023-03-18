import {ApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const CategoryList = async () => {
    return await ApiRequest(ApiConstants.Categories.List, 'POST');
}

export const GetCategoryById = async (id) => {
    return await ApiRequest(ApiConstants.Categories.Get(id), 'GET');
}

export const CreateCategory = async (data) => {
    return await ApiRequest(ApiConstants.Categories.Create, 'POST', data);
}

export const UpdateCategory = async (categoryId, data) => {
    return await ApiRequest(ApiConstants.Categories.Update(categoryId), 'PATCH', data);
}

export const DeleteCategory = async (categoryId) => {
    return await ApiRequest(ApiConstants.Categories.Delete(categoryId), 'DELETE');
}