import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-quill/dist/quill.snow.css';
import './scss/style.scss'
import './App.css';
import axios from 'axios';

import {useEffect, useState} from 'react'
import {constants} from "./general/constants.js";
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./general/routes.jsx";
import {appContext} from "./context/AppContext.js";
import {ToastContainer} from 'react-toastify';
import {GetTenant, IsLogin} from "./services/AuthService.js";
import {notify} from "./utilities/index.js";

if (IsLogin) {
    axios.defaults.headers.post['Authorization'] = `bearer ${IsLogin()}`;
}
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['x-tenant'] = GetTenant();

if (window.innerHeight < 768) {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
} else {
    const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', appHeight)
}
// const appHeight = () => {
//     const doc = document.documentElement
//     doc.style.setProperty('--app-height', `${window.innerHeight}px`)
// }
// window.addEventListener('resize', appHeight)

axios.interceptors.request.use(request => {
    // console.log(request);
    // Edit request config
    return request;
}, error => {
    if (error.response && error.response.status === 404) {
        notify('آیتم مورد نظر یافت نشد.');
    }
    // else if (error.response && error.response.message) {
    //     notify(error.message);
    // }

    return Promise.reject(error);
});

function App() {
    useEffect(() => {
        document.title = constants.APP_TITLE
    }, []);

    const [showMainLoader, toggleMainLoader] = useState(false);
    const [showSidebar, toggleSidebar] = useState(window.innerHeight > 768);
    const [showUserDropDown, toggleUserDropDown] = useState(false);
    const [showNotification, toggleNotification] = useState(false);

    return (<appContext.Provider value={{
            showSidebar,
            toggleSidebar,
            showUserDropDown,
            toggleUserDropDown,
            showMainLoader,
            toggleMainLoader,
            showNotification,
            toggleNotification
        }}>
            <BrowserRouter>
                <AppRouter/>
                <ToastContainer/>
            </BrowserRouter>
        </appContext.Provider>
    )
}

export default App
