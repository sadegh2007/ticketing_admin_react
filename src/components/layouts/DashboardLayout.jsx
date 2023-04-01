import react, {useRef, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import Sidebar from "../global/Sidebar.jsx";
import {useNavigate} from 'react-router-dom'
import {CurrentUser, GetTenant, IsLogin, Logout} from '../../services/AuthService';
import {useContext, useEffect} from "react"
import {appContext} from "../../context/AppContext"
import MainLoader from "../global/MainLoader.jsx";
import {constants} from "../../general/constants.js";
import { HubConnectionBuilder } from '@microsoft/signalr';
import {notify} from "../../utilities/index.js";
import {NotificationList} from "../../services/DashboardService.js";
import {handleError} from "../../services/GlobalService.js";
import {confirmAlert} from "react-confirm-alert";
import PersianDate from "../global/PersianDate.jsx";
import {ReactSVG} from "react-svg";

const DashboardLayout = (props) => {
    const {showNotification, toggleNotification, showSidebar, toggleSidebar, toggleUserDropDown, showMainLoader, toggleMainLoader} = useContext(appContext);
    const [connection, setConnection] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [showNewNotification, setShowNewNotification] = useState(false);

    const navigate = useNavigate();

    const clickOnBody = () => {
        // close user dropdown when click outside
        // toggleSidebar(false);
        // toggleUserDropDown(false);
        toggleNotification(false);
    }

    const logout = () => {
        const options = {
            title: 'خروج',
            message: 'آیا از این کار مطمئن هستید؟',
            buttons: [
                {
                    label: 'خیر',
                    onClick: () => {
                    }
                },
                {
                    label: 'بله!',
                    onClick: () => {
                        Logout();
                    }
                },
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
        };

        confirmAlert(options);
    }

    const getNotifications = () => {
        toggleMainLoader(true);
        NotificationList()
            .then(res => {
                setNotifications(res.items);
                toggleMainLoader(false);
                toggleNotification(true);
            })
            .catch(err => {
                toggleMainLoader(false);
                handleError(err.response);
            })
    }

    useEffect(() => {
        if (!IsLogin()) {
            return navigate('/login')
        }

        const newConnection = new HubConnectionBuilder()
            .withUrl(constants.SIGNALR_URL, { accessTokenFactory: () => IsLogin() })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (showSidebar && window.innerWidth < 768) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

    }, [showSidebar])

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('ReceiveMessage', message => {
                        setShowNewNotification(true);

                        notify(message, 'success');

                        // console.log(message);
                        // const updatedChat = [...latestChat.current];
                        // updatedChat.push(message);

                        // setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    return (
        <div
            onClick={clickOnBody}
            // style={{height: 'var(--app-height)'}}
            className={showSidebar ? "flex flex-row justify-between sidebar-open" : 'flex flex-row justify-between sidebar-close'}>
            <div onClick={() => toggleSidebar(false)}
                 className={`${!showSidebar ? 'hidden' : ''} sidebar-overlay opacity-10 md:hidden bg-black`}
            />
            <Sidebar/>

            <div className="main-content">
                <MainLoader show={showMainLoader}/>

                <div className="panel-navbar mb-2 mt-2 mx-4">
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
                            <div className="dropdown dropdown-end" onClick={getNotifications}>
                                <button className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                        </svg>
                                        {
                                            showNewNotification ? <span className="badge badge-xs badge-primary indicator-item"></span> : undefined
                                        }
                                    </div>
                                </button>
                                <ul tabIndex="0" className={`${showNotification ? 'show-notification' : ''} notification-menu menu menu-compact inline-block dropdown-content mt-16 shadow bg-base-100 rounded w-72 md:w-96 max-h-96 overflow-y-scroll`}>
                                    {
                                        notifications.length === 0 ?
                                            <li className={`border-b`}>
                                                <div className="hover:text-black flex items-center">
                                                    <div className="hidden md:inline-block avatar placeholder">
                                                        <div className="bg-neutral-100 rounded-full w-11 h-11">
                                                            <span>T</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span>هیج پیامی برای شما ثبت نشده است.</span>
                                                    </div>
                                                </div>
                                            </li>
                                        : notifications.map((notification) =>
                                            <li className={`border-b ${!notification.readAt ? 'font-bold' : ''}`} key={notification.id}>
                                                <Link className="hover:text-black flex items-center" to={`/${GetTenant()}/admin/ticketing/${notification.data.TicketId}`}>
                                                    <div className="hidden md:inline-block avatar placeholder">
                                                        <div className="bg-neutral-100 rounded-full w-11 h-11">
                                                            <span>T</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className={`${notification.readAt == null ? 'font-semibold' : ''}`}>{ notification.title }</span>
                                                        <div className="flex items-baseline text-gray-400 mt-1">
                                                            <ReactSVG className="btn-sm-svg ml-1" src="/src/assets/svgs/calendar-time.svg" />
                                                            <PersianDate className="text-xs" date={notification.createdAt} format="shortDateTime"/>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div className="dropdown dropdown-end">
                                <label tabIndex="0" className="btn btn-ghost btn-circle">
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={CurrentUser()?.user?.picture ? `${constants.BASE_URL}${CurrentUser()?.user?.picture}` : '/src/assets/user-placeholder.png' }/>
                                        </div>
                                    </div>
                                </label>
                                <ul tabIndex="0" className="notification-menu menu menu-compact inline-block dropdown-content mt-16 shadow bg-base-100 rounded w-44 overflow-y-scroll">
                                    <li className="border-b text-sm">
                                        <a href="">{CurrentUser()?.user?.fullName ?? CurrentUser()?.user?.userName}</a>
                                    </li>
                                    <li className="text-sm">
                                        <a onClick={logout}>خروج</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper mx-4 mb-4">
                    <Outlet/>
                    {/*{props.children}*/}
                    {/*<Footer/>*/}
                </div>
            </div>
        </div>
    )
};

export default DashboardLayout;