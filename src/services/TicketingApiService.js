import {ApiRequest, PostApiRequest} from "./ApiService.js";
import ApiConstants from "../general/ApiConstants.js";

export const GetTicketById = async (id) => {
    return await ApiRequest(ApiConstants.Ticketing.Get(id));
}

export const GetTicketHistories = async (id) => {
    return await ApiRequest(ApiConstants.Ticketing.Histories(id));
}

export const AddUserToTicket = async (ticketId, userIds) => {
    return await ApiRequest(ApiConstants.Ticketing.Users(ticketId).Add, 'POST', {userIds});
}

export const RemoveMessageFromTicket = async (ticketId, commentId) => {
    return await ApiRequest(ApiConstants.Ticketing.Comments(ticketId).Delete(commentId), 'DELETE');
}

export const TicketCommentViewers = async (ticketId, commentId) => {
    return await ApiRequest(ApiConstants.Ticketing.Comments(ticketId).Viewers(commentId), 'GET');
}

export const RemoveUserFromTicket = async (ticketId, userId) => {
    return await ApiRequest(ApiConstants.Ticketing.Users(ticketId).Delete(userId), 'DELETE');
}

export const AddCategoriesToTicket = async (ticketId, categories) => {
    return await ApiRequest(ApiConstants.Ticketing.Categories(ticketId).Add, 'POST', {categories});
}

export const MoveDepartmentOfTicket = async (ticketId, departmentId) => {
    return await ApiRequest(ApiConstants.Ticketing.Department(ticketId).Move(departmentId), 'POST', {departmentId});
}

export const SendNewComment = async (ticketId, data) => {
    return await PostApiRequest(ApiConstants.Ticketing.Comments(ticketId).Create, data);
}

export const CreateNewTicket = async (data) => {
    return await PostApiRequest(ApiConstants.Ticketing.Create, data);
}

export const DeleteTicket = async (ticketId) => {
    return await ApiRequest(ApiConstants.Ticketing.Delete(ticketId), 'DELETE');
}

export const ChangeTicketStatus = async (ticketId, statusName) => {
    return await ApiRequest(ApiConstants.Ticketing.ChangeStatus(ticketId), 'PUT', {statusName});
}