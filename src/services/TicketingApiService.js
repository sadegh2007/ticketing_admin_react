import {ApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const GetTicketById = async (id) => {
    return await ApiRequest(ApiConstants.Ticketing.get(id));
}