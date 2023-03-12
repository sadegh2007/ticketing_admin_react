import {ApiRequest, PostApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const GetTicketById = async (id) => {
    return await ApiRequest(ApiConstants.Ticketing.Get(id));
}

export const AddUserToTicket = async (ticketId, userIds) => {
    return await ApiRequest(ApiConstants.Ticketing.Users(ticketId).Add, 'POST', {userIds});
}

export const SendNewComment = async (ticketId, data) => {
    return await PostApiRequest(ApiConstants.Ticketing.Comments(ticketId).Create, data);
}