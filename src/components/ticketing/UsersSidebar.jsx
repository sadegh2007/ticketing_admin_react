import {ReactSVG} from "react-svg";
import Card from "../global/Card.jsx";
import React, {useContext, useState} from "react";
import NewUserModal from "./NewUserModal.jsx";
import {appContext} from "../../context/AppContext.js";
import { confirmAlert } from 'react-confirm-alert';

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
                    onClick: () => {}
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
                <div className="card-header flex justify-between items-center border-b rounded-t bg-gray-800 text-white p-3 text-center">
                    <span>کاربران</span>
                    <button onClick={() => setShowNewUserModal(true)} className="btn-svg btn-primary btn btn-sm btn-square">
                        <ReactSVG src="/src/assets/svgs/plus.svg" />
                    </button>
                </div>
                <div className="card-body p-3">
                    <ul>
                        {
                            ticket?.users.map((userItem) => {
                                return (
                                    <li key={userItem.id} className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <img className="w-8 rounded-full border"
                                                 src={userItem.user.picture ?? '/src/assets/user-placeholder.png'}
                                                 alt="user"/>
                                            <div className="flex items-center">
                                                <span className="mr-2 text-xs">{userItem.user.fullName}</span>
                                                { userItem.userId === ticket.creatorId ? <ReactSVG className="mr-2 btn-sm-svg" src="/src/assets/svgs/star-filled.svg"/> : '' }
                                            </div>

                                        </div>
                                        <button onClick={() => deleteUser(userItem.UserId)} className="btn btn-error btn-sm btn-square btn-svg text-gray-600 rounded btn-outline">
                                            <ReactSVG src="/src/assets/svgs/trash.svg" />
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </Card>

            <NewUserModal
                ticketId={ticket?.id}
                show={showNewUserModal}
                closeModal={(reload = false) => {
                    setShowNewUserModal(false)
                    if (reload) {
                        loadTicket();
                    }
                }
            }/>
        </>
    )
}

export default UsersSidebar;