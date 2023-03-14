import { toast } from "react-toastify";

export const notify = (message, type = 'error') => {
    if (type === 'error') {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_LEFT
        });
    }
    else if (type === 'success') {
        toast.success(message, {
            position: toast.POSITION.BOTTOM_LEFT
        });
    }
};

export const toEnglishDigits = () => {
    return this.replace(/[۰-۹]/g, function (chr) {
        const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return persian.indexOf(chr);
    });
};

export const strLimit = (str, length = 20) => {
  if (str.length > length) {
      return str.substring(1, length) + '...';
  }

  return str;
}