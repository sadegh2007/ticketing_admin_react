import react from "react";
import {Outlet} from "react-router-dom";
import MainHeader from "../header/MainHeader.jsx";
import Sidebar from "../global/Sidebar.jsx";
import {useNavigate} from 'react-router-dom'
import {IsLogin} from '../../services/AuthService';
import {useContext, useEffect} from "react"
import {appContext} from "../../context/AppContext"
import Footer from "../global/Footer.jsx";
import MainLoader from "../global/MainLoader.jsx";

const DashboardLayout = (props) => {
    const {showSidebar, toggleSidebar, toggleUserDropDown, showMainLoader} = useContext(appContext);
    const navigate = useNavigate();

    const clickOnBody = () => {
        // close user dropdown when click outside
        // toggleSidebar(true);
        // toggleUserDropDown(false);
    }

    useEffect(() => {
        if (!IsLogin()) {
            navigate('/login')
        }
    }, [])

    return (
        <div
            className={showSidebar ? "flex flex-row justify-between sidebar-open" : 'flex flex-row justify-between sidebar-close'}>
            <Sidebar/>

            <div className="main-content">
                <MainLoader show={showMainLoader}/>

                <div className="panel-navbar mb-4 mt-2 mx-4">
                    <div className="bg-base-100 w-full navbar rounded p-1 shadow rounded">
                        <div className="navbar-start">
                            <button onClick={() => toggleSidebar(!showSidebar)} className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     className="inline-block w-6 h-6 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="navbar-end">
                            <div className="dropdown dropdown-end">
                                <button className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                        </svg>
                                        <span className="badge badge-xs badge-primary indicator-item"></span>
                                    </div>
                                </button>
                                <ul tabIndex="0"
                                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>تست ۱</a></li>
                                    <li><a>تست ۲</a></li>
                                    <li><a>تست ۳</a></li>
                                </ul>
                            </div>
                            <div className="dropdown dropdown-end">
                                <label tabIndex="0" className="btn btn-ghost btn-circle">
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                </label>
                                <ul tabIndex="0"
                                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>تنظیمات</a></li>
                                    <li>
                                        <button click="logout">خروج</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper container mb-4">
                    <Outlet/>
                    {/*{props.children}*/}
                    {/*<Footer/>*/}
                </div>
            </div>
        </div>
    )
};

export default DashboardLayout;