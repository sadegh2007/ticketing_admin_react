import {ApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const DepartmentList = async () => {
    return await ApiRequest(ApiConstants.Departments.List, 'POST');
}

export const GetDepartmentById = async (departmentId) => {
    return await ApiRequest(ApiConstants.Departments.Get(departmentId), 'GET');
}

export const CreateDepartment = async (data) => {
    return await ApiRequest(ApiConstants.Departments.Create, 'POST', data);
}

export const UpdateDepartment = async (departmentId, data) => {
    return await ApiRequest(ApiConstants.Departments.Update(departmentId), 'PATCH', data);
}

export const DeleteDepartment = async (departmentId) => {
    return await ApiRequest(ApiConstants.Departments.Delete(departmentId), 'DELETE');
}