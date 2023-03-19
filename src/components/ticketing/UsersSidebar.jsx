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

const UsersSidebar = ({ticket, loadTicket}) => {
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
            <Card className="hidden md:block">
                <div
                    className="card-header flex justify-between items-center border-b rounded-t bg-gray-800 text-white p-3 text-center">
                    <span>کاربران</span>
                    <button onClick={() => setShowNewUserModal(true)}
                            className="btn-sm-svg btn-primary btn btn-sm btn-square">
                        <ReactSVG src="/src/assets/svgs/plus.svg"/>
                    </button>
                </div>
                <div className="card-body p-3">
                    <ul>
                        {
                            ticket?.users.map((userItem) => {
                                return (
                                    <li id={userItem.id} key={userItem.id}
                                        className="flex justify-between items-center mb-2 border-b pb-2">
                                        <div className="flex items-center">
                                            {
                                                (userItem.user && userItem.user?.id !== ticket.creator.id && userItem.user?.id !== CurrentUser()?.user.id)
                                                    ?
                                                    <div className="hover:opacity-100 opacity-0 absolute z-40 right-3">
                                                        <button onClick={() => deleteUser(userItem.user.id)}
                                                                style={{height: '2.5rem', width: '2.5rem'}}
                                                                className="btn btn-sm btn-error btn-circle rounded-full btn-sm-svg">
                                                            <ReactSVG src="/src/assets/svgs/trash.svg"/>
                                                        </button>
                                                    </div>
                                                    : undefined
                                            }
                                            <img className="w-10 rounded-full border z-30"
                                                 src={(userItem.user && userItem.user.picture) ? userItem.user.picture : '/src/assets/user-placeholder.png'}
                                                 alt="user"/>
                                            <div className="flex items-baseline">
                                                <span
                                                    className="mr-2 text-sm">{(userItem.user && userItem.user.fullName) ? userItem.user.fullName : '-'}</span>
                                                {userItem.user?.id === ticket.creator.id ?
                                                    <ReactSVG className="mr-2 btn-sm-svg"
                                                              src="/src/assets/svgs/star-filled.svg"/> : ''}
                                            </div>
                                        </div>


                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </Card>

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