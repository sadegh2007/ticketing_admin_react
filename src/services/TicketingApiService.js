import {ApiRequest, PostApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const GetTicketById = async (id) => {
    return await ApiRequest(ApiConstants.Ticketing.get(id));
}

export const SendNewComment = async (ticketId, data) => {
    return await PostApiRequest(ApiConstants.Ticketing.comments(ticketId).create, data);
}