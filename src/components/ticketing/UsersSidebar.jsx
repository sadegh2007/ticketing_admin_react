import {ReactSVG} from "react-svg";
import Card from "../global/Card.jsx";
import React, {useContext, useState} from "react";
import NewUserModal from "./NewUserModal.jsx";
import {appContext} from "../../context/AppContext.js";
import {confirmAlert} from 'react-confirm-alert';
import {RemoveUserFromTicket} from "../../services/TicketingApiService.js";
import {handleError} from "../../services/GlobalService.js";
import {notify} from "../../utilities/index.js";
import {constants} from "../../general/constants.js";
import {CurrentUser} from "../../services/AuthService.js";

const UsersSidebar = ({ticket, loadTicket, toggleSide, showSide = false}) => {
    const [showNewUserModal, setShowNewUserModal] = useState(false);
    const {showMainLoader, toggleMainLoader} = useContext(appContext);

    const deleteUser = (userId) => {
        const options = {
            title: 'حذف کاربر',
            message: 'آیا از حذف این کاربر مطمئن هستید؟',
            buttons: [
                {
                    label: 'خیر',
                    onClick: () => {
                    }
                },
                {
                    label: 'حذف کن!',
                    onClick: () => {
                        toggleMainLoader(true);
                        RemoveUserFromTicket(ticket.id, userId)
                            .then((res) => {
                                loadTicket();
                                // toggleMainLoader(false);
                                //
                                // ticket.users = ticket.users.filter((user) => {
                                //     return user.id !== userId;
                                // });

                                notify(constants.DELETE_SUCCESS_TEXT, 'success');
                            })
                            .catch(e => {
                                console.log(e);
                                toggleMainLoader(false);
                                handleError(e.response);
                            });
                    }
                },
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
        };

        confirmAlert(options);
    }

    return (
        <>
            <div onClick={() => toggleSide(false)} className={`user-drawer-overlay block md:hidden ${showSide ? 'show-user-drawer-overlay' : ''}`}></div>
            <div
                className={`user-drawer card sm:rounded-tl-none rounded bg-base-100 shadow text-gray-500 ${showSide ? 'open-user-drawer' : 'close-user-drawer'} md:block`}>
                <div
                    className="card-header flex justify-between items-center border-b rounded-tl-none md:rounded-tl rounded-t bg-gray-800 text-white p-2 text-center">

                    <div className="">
                        <button onClick={() => toggleSide(false)}
                                className="rounded inline-flex md:hidden btn-sm-svg btn-outline text-white border-none btn btn-sm btn-square ml-2">
                            <ReactSVG src="/src/assets/svgs/X.svg"/>
                        </button>
                        <span>{(ticket && ticket.department) ? ticket.department.title : 'کاربران'}</span>
                    </div>
                </div>
                <div className="card-body p-2 overflow-y-scroll">
                    <ul>
                        {
                            ticket?.users.map((userItem) => {
                                return (
                                    <li id={userItem.id} key={userItem.id} className="">
                                        <div className="image-wrapper">
                                            {
                                                (userItem.user && userItem.user?.id !== ticket.creator.id && userItem.user?.id !== CurrentUser()?.user.id)
                                                    ?
                                                    <div className="hover:opacity-100 opacity-0 absolute z-40">
                                                        <button onClick={() => deleteUser(userItem.user.id)}
                                                                className="btn-user-delete btn btn-sm btn-error btn-circle rounded-full btn-sm-svg">
                                                            <ReactSVG src="/src/assets/svgs/trash.svg"/>
                                                        </button>
                                                    </div>
                                                    : undefined
                                            }
                                            <img className="profile rounded-full border border-gray-300 z-30"
                                                 src={(userItem.user && userItem.user.picture) ? `${constants.BASE_URL}${userItem.user.picture}` : '/src/assets/user-placeholder.png'}
                                                 alt="user"/>
                                        </div>
                                        <div className="content mr-2">
                                            <div className="user-full-name text-gray-600 text-sm font-semibold max-w-full">
                                                {
                                                    (userItem.user.id === CurrentUser().user.id) ? 'شما' :
                                                        (userItem.user && userItem.user.fullName) ? userItem.user.fullName : '-'
                                                }
                                            </div>

                                            <div className="user-email text-xs">{(userItem.user && userItem.user.email) ? userItem.user.email : '-'}</div>

                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="text-center border-t py-4">
                        <button onClick={() => setShowNewUserModal(true)}
                                className="btn-sm-svg bg-primary btn btn-sm rounded">
                            <ReactSVG src="/src/assets/svgs/user-plus.svg"/>
                            <span className="mr-1 font-normal">افزودن</span>
                        </button>
                    </div>
                </div>
            </div>

            {
                showNewUserModal ? <NewUserModal
                    ticketId={ticket?.id}
                    show={showNewUserModal}
                    closeModal={(reload = false) => {
                        setShowNewUserModal(false)
                        if (reload) {
                            loadTicket();
                        }
                    }
                    }/> : null
            }
        </>
    )
}

export default UsersSidebar;