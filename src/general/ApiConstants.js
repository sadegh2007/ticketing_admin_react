import {constants} from "./constants.js";

const baseUrl = constants.BASE_URL;

const Apis = {
    Dashboard: {
        info: `${baseUrl}/api/dashboard`,
    },
    Notifications: {
        List: `${baseUrl}/api/notification/list`,
    },
    Ticketing: {
        List: `${baseUrl}/api/ticketing/list`,
        Create: `${baseUrl}/api/ticketing`,
        Get: (ticketId) => `${baseUrl}/api/ticketing/${ticketId}`,
        Delete: (ticketId) => `${baseUrl}/api/ticketing/${ticketId}`,
        Histories: (ticketId) => `${baseUrl}/api/ticketing/${ticketId}/histories`,
        Comments: (ticketId) => {
            return {
                Create: `${baseUrl}/api/ticketing/${ticketId}/comments`,
                Delete: (commentId) => `${baseUrl}/api/ticketing/${ticketId}/comments/${commentId}`,
                Viewers: (commentId) => `${baseUrl}/api/ticketing/${ticketId}/comments/${commentId}/viewers`,
            }
        },
        Users: (ticketId) => {
            return {
                Add: `${baseUrl}/api/ticketing/${ticketId}/users`,
                Delete: (userId) => `${baseUrl}/api/ticketing/${ticketId}/users/${userId}`
            }
        },
        Categories: (ticketId) => {
            return {
                Add: `${baseUrl}/api/ticketing/${ticketId}/categories`
            }
        },
        Department: (ticketId) => {
            return {
                Move: (departmentId) => `${baseUrl}/api/ticketing/${ticketId}/move/${departmentId}`
            }
        },
    },
    Departments: {
        List: `${baseUrl}/api/departments/list`,
        Create: `${baseUrl}/api/departments`,
        Update: (categoryId) => `${baseUrl}/api/departments/${categoryId}`,
        Get: (categoryId) => `${baseUrl}/api/departments/${categoryId}`,
        Delete: (categoryId) => `${baseUrl}/api/departments/${categoryId}`,
    },
    Categories: {
        List: `${baseUrl}/api/ticketing/categories/list`,
        Create: `${baseUrl}/api/ticketing/categories`,
        Update: (categoryId) => `${baseUrl}/api/ticketing/categories/${categoryId}`,
        Get: (categoryId) => `${baseUrl}/api/ticketing/categories/${categoryId}`,
        Delete: (categoryId) => `${baseUrl}/api/ticketing/categories/${categoryId}`,
    },
    Users: {
        List: `${baseUrl}/api/users/list`,
        Create: `${baseUrl}/api/users`,
        Update: (userId) => `${baseUrl}/api/users/${userId}`,
        Delete: (userId) => `${baseUrl}/api/users/${userId}`,
        Roles: {
            Get: (roleId) => `${baseUrl}/api/users/roles/${roleId}`,
            List: `${baseUrl}/api/users/roles/list`,
            Create: `${baseUrl}/api/users/roles`,
            Update: (roleId) => `${baseUrl}/api/users/roles/${roleId}`,
            Delete: (roleId) => `${baseUrl}/api/users/roles/${roleId}`,
        },
        Permissions: {
            All: `${baseUrl}/api/users/roles/permissions`,
            List: `${baseUrl}/api/users/roles/permissions/list`,
            Create: `${baseUrl}/api/users/roles/permissions`,
            Update: (roleId) => `${baseUrl}/api/users/roles/permissions/${roleId}`,
            Delete: (roleId) => `${baseUrl}/api/users/roles/permissions/${roleId}`,
        },
    },
};

export default Apis;