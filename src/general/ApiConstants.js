import {constants} from "./constants.js";

const baseUrl = constants.BASE_URL;

const Apis = {
    Ticketing: {
        list: `${baseUrl}/api/ticketing/list`,
        get: (id) => `${baseUrl}/api/ticketing/${id}`,
    },
};

export default Apis;