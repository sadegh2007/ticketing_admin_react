import {ApiRequest, PostApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const GetTicketById = async (id) => {
    return await ApiRequest(ApiConstants.Ticketing.Get(id));
}

export const AddUserToTicket = async (ticketId, userIds) => {
    return await ApiRequest(ApiConstants.Ticketing.Users(ticketId).Add, 'POST', {userIds});
}

export const RemoveUserFromTicket = async (ticketId, userId) => {
    return await ApiRequest(ApiConstants.Ticketing.Users(ticketId).Delete(userId), 'DELETE');
}

export const SendNewComment = async (ticketId, data) => {
    return await PostApiRequest(ApiConstants.Ticketing.Comments(ticketId).Create, data);
}

export const CreateNewTicket = async (data) => {
    return await PostApiRequest(ApiConstants.Ticketing.Create, data);
}