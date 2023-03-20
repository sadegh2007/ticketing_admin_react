import {toast} from "react-toastify";
import {constants} from "../general/constants";

export const handleArrayErrors = (errors) => {
    Object.keys(errors).map((key, index) => {
        // console.log(errors[key][0])
        toast.error(errors[key][0], {
            position: toast.POSITION.BOTTOM_LEFT
        });
        return true
    });
}

export const handleError = ({type, errors, status, data}) => {

    // console.log(type)
    // console.log(errors)
    // console.log(status)

    if (data && data.errors) {
        handleArrayErrors(data.errors);
        return false;
    }

    if (status === 404) {
        toast.error('آیتم مورد نظر یافت نشد.', {
            position: toast.POSITION.BOTTOM_LEFT
        });
        return false;
    }

    if (status === 500 && data.detail) {
        toast.error(data.detail, {
            position: toast.POSITION.BOTTOM_LEFT
        });
        return false;
    }

    // for server errors - 500
    if (status === 500) {
        toast.error(constants.SERVER_ERROR, {
            position: toast.POSITION.BOTTOM_LEFT
        });
        return false;
    }

    // to handle form errors that come from server
    if (errors) {
        handleArrayErrors(errors);
        return false;
    }

    switch (type) {

        case 'add':
            toast.error(constants.ADD_ERROR_TEXT, {
                position: toast.POSITION.BOTTOM_LEFT
            });
            break
        case 'edit':
            toast.error(constants.EDIT_ERROR_TEXT, {
                position: toast.POSITION.BOTTOM_LEFT
            });
            break
        case 'delete':
            toast.error(constants.DELETE_ERROR_TEXT, {
                position: toast.POSITION.BOTTOM_LEFT
            });
            break;
        default:
            toast.error(constants.ACTION_ERROR_TEXT, {
                position: toast.POSITION.BOTTOM_LEFT
            });
            break;
    } // switch

}

export const formatPrice = (price) => {
    return price ? price.toLocaleString() : '';
}