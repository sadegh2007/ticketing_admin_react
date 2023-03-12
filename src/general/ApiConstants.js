import {constants} from "./constants.js";

const baseUrl = constants.BASE_URL;

const Apis = {
    Ticketing: {
        List: `${baseUrl}/api/ticketing/list`,
        Get: (id) => `${baseUrl}/api/ticketing/${id}`,
        Comments: (ticketId) => {
            return {
                create: `${baseUrl}/api/ticketing/${ticketId}/comments`
            }
        },
        Users: (ticketId) => {
            return {
                Add: `${baseUrl}/api/ticketing/${ticketId}/users`,
                Delete: (userId) => `${baseUrl}/api/ticketing/${ticketId}/users/${userId}`
            }
        }
    },
    Users: {
        List: `${baseUrl}/api/users/list`,
    }
};

export default Apis;