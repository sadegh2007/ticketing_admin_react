import {ApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const DashboardInfo = async () => {
    return await ApiRequest(ApiConstants.Dashboard.info, 'GET');
}

export const NotificationList = async (pageCount = 15) => {
    return await ApiRequest(ApiConstants.Notifications.List, 'POST', {count: pageCount});
}