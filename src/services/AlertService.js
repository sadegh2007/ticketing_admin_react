import {confirmAlert} from "react-confirm-alert";

export const ConfirmAlert = (
    title,
    message,
    onConfirmClick,
    onCancelClick = () => {
    },
    confirmLabel = "بله",
    cancelLabel = "خیر",
) => {
    const options = {
        title: title,
        message: message,
        buttons: [
            {
                label: cancelLabel,
                onClick: onCancelClick
            },
            {
                label: confirmLabel,
                onClick: onConfirmClick,
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
    };

    confirmAlert(options);
}