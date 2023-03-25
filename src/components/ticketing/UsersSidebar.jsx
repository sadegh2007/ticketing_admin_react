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
                                handleError(e);
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
            <div className={`user-drawer-overlay block md:hidden ${showSide ? 'show-user-drawer-overlay' : ''}`}></div>
            <div
                className={`user-drawer card sm:rounded-tl-none rounded bg-base-100 shadow text-gray-500 ${showSide ? 'open-user-drawer' : 'close-user-drawer'} md:block`}>
                <div
                    className="card-header flex justify-between items-center border-b rounded-tl-none md:rounded-tl rounded-t bg-gray-800 text-white p-2 text-center">

                    <div className="">
                        <button onClick={() => toggleSide(false)}
                                className="inline-flex md:hidden btn-sm-svg btn-outline text-white border-none btn btn-sm btn-square ml-2">
                            <ReactSVG src="/src/assets/svgs/X.svg"/>
                        </button>
                        <span>{(ticket && ticket.department) ? ticket.department.title : 'کاربران'}</span>
                    </div>


                    <button onClick={() => setShowNewUserModal(true)}
                            className="btn-sm-svg btn-primary btn btn-sm btn-square">
                        <ReactSVG src="/src/assets/svgs/plus.svg"/>
                    </button>
                </div>
                <div className="card-body p-2">
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
                                            <img className="rounded-full border z-30"
                                                 src={(userItem.user && userItem.user.picture) ? userItem.user.picture : '/src/assets/user-placeholder.png'}
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