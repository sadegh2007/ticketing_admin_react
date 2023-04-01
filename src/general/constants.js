export const constants = {
    APP_TITLE: import.meta.env.VITE_APP_TITLE,
    APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL,//'https://localhost:5173', // https://ticketing.weezh.ir
    BASE_URL: import.meta.env.VITE_BASE_URL, // https://ticketing-api.weezh.ir
    SIGNALR_URL: import.meta.env.VITE_SIGNALR_URL, // https://ticketing-api.weezh.ir
    TABLE_PAGE_SIZE: 20,
    ADD_STATUS_CODE: 201,
    EDIT_STATUS_CODE_SUCCESS: 200,
    GET_STATUS_CODE_SUCCESS: 200,
    DELETE_STATUS_CODE_SUCCESS: 204,
    SERVER_ERROR: 'خطای سرور',
    ACTION_SUCCESS_TEXT: 'عملیات با موفقیت انجام شد',
    ACTION_ERROR_TEXT: 'عملیات با مشکل مواجه شد',
    ADD_SUCCESS_TEXT: 'ثبت اطلاعات با موفقیت انجام شد',
    ADD_ERROR_TEXT: 'ثبت اطلاعات با مشکل مواجه شد',
    EDIT_SUCCESS_TEXT: 'ویرایش اطلاعات با موفقیت انجام شد',
    EDIT_ERROR_TEXT: 'ویرایش اطلاعات با مشکل مواجه شد',
    DELETE_SUCCESS_TEXT: 'حذف اطلاعات با موفقیت انجام شد',
    DELETE_ERROR_TEXT: 'حذف اطلاعات با مشکل مواجه شد',
    ITEM_EXIST: 'این مورد از قبل وجود دارد',
    SELECT_AT_LEAST_ONE: 'حداقل یک مورد انتخاب کنید',
    CONFIRM_DELETE_TEXT: 'آیا از حذف این مورد اطمینان دارید؟',

    VALIDATIONS: {
        NUMBERS: /^[0-9]+$/,
        URL: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
        EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
};