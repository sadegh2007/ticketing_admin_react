import { toast } from "react-toastify";

export const notify = (message) => {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_LEFT
    });
};

export const toEnglishDigits = () => {
    return this.replace(/[۰-۹]/g, function (chr) {
        const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return persian.indexOf(chr);
    });
};