import { LoginUserApi } from './ApiService'
import {notify} from "../utilities/index.js";

export const IsLogin = () => {
    const tenant = localStorage.getItem('tenant');
    if (tenant == null) return tenant;

    return localStorage.getItem('token');
}

export const SetToken = (token) => {
    localStorage.setItem('token', token);
}

export const SetCurrentTenant = (tenant) => {
    localStorage.setItem('tenant', tenant);
}

export const GetTenant = () => {
    return localStorage.getItem('tenant');
}

export const LoginUser = async (mobile, password, rememberMe) => {

    const result = await LoginUserApi(mobile, password, rememberMe);

    if (result.status === 200) {
        const token = result.data['accessToken'];

        let userData = result.data;
        userData.mobile = mobile;

        if (!userData.tenants || userData.tenants.length === 0) {
            notify('کاربر مورد نظر یافت نشد.');
            return;
        }

        if (userData.tenants.length === 1) {
            SetCurrentTenant(userData.tenants[0].id);
        }

        SetToken(token);
        SetUserData(userData);
    }

    return result;
}

export const Logout = () => {
    // logout user
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('tenant');

    window.location.href = '/login';
}

export const SetUserData = (data) => {
    // set user data to localStorage afdter login
    localStorage.setItem('currentUser', JSON.stringify(data))
}
export const CurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'))
}

export const CurrentUserPermissions = () => {
    const currentUser = CurrentUser();
    return currentUser ? (currentUser['permissions'] ?? []) : [];
}

export const HasPermission = (permission) => {
    return CurrentUserPermissions().includes(permission);
}