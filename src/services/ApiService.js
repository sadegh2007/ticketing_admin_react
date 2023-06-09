import axios from "axios";
import { constants } from './../general/constants';
import {GetTenant, IsLogin} from "./AuthService.js";

const baseUrl = constants.BASE_URL;

const cachedData = {};

const CacheKey = (url, method, formData = {}) => {
    let cacheKey = `${url}?method=${method}`;

    Object.keys(formData).forEach((key) => {
        cacheKey += `&${key}=${formData[key]}`
    });

    return cacheKey;
}

export const ApiRequest = async (url, method = 'GET', formData = {}, useCache = false) => {
    const cacheKey = CacheKey(url, method, formData);

    if (useCache && cachedData[cacheKey]) {
        return cachedData[cacheKey];
    }

    let requestConfig = {
        baseURL: url,
        method: method,
        headers: {}
    };

    if (requestConfig.method === 'GET') {
        requestConfig['params'] = formData;
    } else {
        requestConfig['data'] = formData;
    }

    const token = IsLogin();
    if (token) {
        requestConfig.headers['Authorization'] = `Bearer ${token}`;
    }

    const tenant = GetTenant();
    if (tenant) {
        requestConfig.headers['x-tenant'] = tenant;
    }

    const { data } = await axios.request(requestConfig);
    cachedData[cacheKey] = data;

    return data;
}

export const PostApiRequest = async (url, data) => {
    let requestConfig = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    const token = IsLogin();
    if (token) {
        requestConfig.headers['Authorization'] = `Bearer ${token}`;
    }

    const tenant = GetTenant();
    if (tenant) {
        requestConfig.headers['x-tenant'] = tenant;
    }

    // const formData = new FormData();
    // Object.keys(data).forEach((key) => {
    //    formData.set(key, data[key]);
    // });

    const response = await axios.post(url, data, requestConfig);
    return response.data;
}

export const LoginUserApi = (mobile, password, rememberMe) => {
    const url = `${baseUrl}/api/Account/otp-verify`;
    return axios.post(url, {
        mobile: mobile,
        password: password,
        rememberMe: rememberMe,
        code: "000000"
    }, {
        headers: {
            "Content-Type": "Application/json",
            "Accept": "Application/json",
        }
    });
}

// // get all contacts
// export const getContacts = () => {
//   const url = `${baseUrl}/contacts`;
//   return axios.get(url);
// }

// // get contact data
// export const getContact = (id) => {
//   const url = `${baseUrl}/contacts/${id}`
//   return axios.get(url);
// }

// // get all groups
// export const getGroups = () => {
//   const url = `${baseUrl}/groups`
//   return axios.get(url);
// }

// // get group data
// export const getGroup = (id) => {
//   const url = `${baseUrl}/groups/${id}`
//   return axios.get(url);
// }

// // create new contact
// export const createContact = (data) => {
//   const url = `${baseUrl}/contacts`
//   return axios.post(url, data);
// }

// // update contact
// export const updateContact = (id, data) => {
//   const url = `${BASE_URL}/contacts/${id}`
//   return axios.put(url, data);
// }

// // delete contact
// export const deleteContact = (id) => {
//   const url = `${BASE_URL}/contacts/${id}`
//   return axios.delete(url);
// }

// axios.interceptors.response.use(
//     function (response) { return response },
//     function (error) {
//
//         if (error.response) {
//             // console.log(error.response)
//             const status = error.response.status;
//
//             if (status === 401 && window.location.pathname !== '/login') {
//                 // logout user if session was expired on serverr and get 401
//                 Logout();
//             }
//             return error.response
//         }
//
//     });
