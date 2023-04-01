import {createContext} from "react";

export const appContext = createContext({
    showSidebar: true,
    toggleSidebar: () => {
        // this.showSidebar = !this.showSidebar;
    },
    showUserDropDown: false,
    toggleUserDropDown: () => {
    },
    showMainLoader: false,
    toggleMainLoader: () => {},
    showNotification: false,
    toggleNotification: () => {}
});