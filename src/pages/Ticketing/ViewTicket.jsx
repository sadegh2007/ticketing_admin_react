import {Link, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {
    ChangeTicketStatus,
    GetTicketById,
    RemoveMessageFromTicket,
    SendNewComment
} from "../../services/TicketingApiService.js";
import {appContext} from "../../context/AppContext.js";
import {ReactSVG} from "react-svg";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";
import {CurrentUser} from "../../services/AuthService.js";
import PersianDate from "../../components/global/PersianDate.jsx";
import Card from "../../components/global/Card.jsx";
import {handleError} from "../../services/GlobalService.js";
import {constants} from "../../general/constants.js";
import {notify} from "../../utilities/index.js";
import UsersSidebar from "../../components/ticketing/UsersSidebar.jsx";
import TicketComment from "../../components/ticketing/TicketComment.jsx";
import MessageBox from "../../components/ticketing/MessageBox.jsx";
import {confirmAlert} from "react-confirm-alert";
import SelectCategoryModal from "../../components/ticketing/SelectCategoryModal.jsx";
import SelectDepartmentModal from "../../components/ticketing/SelectDepartmentModal.jsx";
import TicketHistoryModal from "../../components/ticketing/TicketHistoryModal.jsx";

const ViewTicket = () => {
    const {ticketId} = useParams();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [ticket, setTicket] = useState(null);
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [showCategoriesModal, setShowCategoriesModal] = useState(false);
    const [showDepartmentModal, setShowDepartmentModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const [showUserSidebar, setShowUserSidebar] = useState(false);

    const currentUser = CurrentUser();

    useEffect(() => {
        if (ticket == null) {
            loadTicket();
        }
    }, []);

    useEffect(() => {
        if (ticket && ticket.comments.length > 0) {
            scrollToId(ticket.comments[ticket.comments.length-1].id);
        }
    }, [ticket]);

    const loadTicket = () => {
        toggleMainLoader(true);

        GetTicketById(ticketId).then(response => {
            toggleMainLoader(false);
            setTicket(response);
        }).catch((error) => {
            toggleMainLoader(false);
            handleError(error)
        });
    }

    const sendMessage = (replyId) => {
        toggleMainLoader(true);

        const formData = new FormData();
        formData.set('message', message);
        if (replyId) {
            formData.set('replayId', replyId);
        }

        files.forEach((file) => {
            formData.append('files', file);
        })

        SendNewComment(ticketId, formData).then(res => {
            const newTicket = ticket;
            newTicket.comments.push(res);

            setTicket(newTicket);
            setMessage('');
            setFiles([]);
            setReplyTo(null);

            toggleMainLoader(false);

            // if (res && res.id) {
            //     scrollToId(res.id);
            // }

            notify(constants.ADD_SUCCESS_TEXT, 'success')
        })
        .catch(e => {
            toggleMainLoader(false);
            handleError(e);
        });
    }

    const scrollToId = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({behavior: 'smooth'});
    }

    const leftTicket = () => {
        const options = {
            title: 'خروج از تیکت',
            message: 'آیا از خروج از این تیکت مطمئن هستید؟',
            buttons: [
                {
                    label: 'خیر',
                    onClick: () => {}
                },
                {
                    label: 'بله!',
                    onClick: () => {
                        toggleMainLoader(true);

                    }
                },
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
        };

        confirmAlert(options);
    }

    const removeMessage = (commentId) => {
        const options = {
            title: 'حذف پیام',
            message: 'آیا از حذف این پیام مطمئن هستید؟',
            buttons: [
                {
                    label: 'خیر',
                    onClick: () => {
                    }
                },
                {
                    label: 'بله!',
                    onClick: () => {
                        toggleMainLoader(true);

                        RemoveMessageFromTicket(ticketId, commentId)
                            .then(res => {
                                const newTicket = ticket;
                                newTicket.comments = newTicket.comments.filter((c) => c.id !== commentId);
                                setTicket(newTicket);

                                toggleMainLoader(false);

                                notify('با موفقیت حذف شد.', 'success');
                            }).catch(e => {
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

    const copyLink = () => {
        navigator.clipboard.writeText(`${constants.APP_BASE_URL}/admin/ticketing/${ticketId}`);
        notify('با موفقیت کپی شد.', 'success');
    }

    const changeStatus = (statusName) => {
        toggleMainLoader(true);
        ChangeTicketStatus(ticketId, statusName)
            .then(res => {

                const newTicket = ticket;
                newTicket.status = res;

                setTicket(newTicket);

                toggleMainLoader(false);
            }).catch(err => {
                toggleMainLoader(false);
                handleError(err.response)
            })
    }

    return (
        <>
            <Breadcrumb
                items={[{to: '/admin/ticketing', title: 'فهرست تیکت ها'}, {to: '#', title: `تیکت شماره ${ticket?.number}`}]}/>

            <div className="ticketing-container grid grid-cols-1 md:grid-cols-5 md:gap-2">
                <Card className="col-span-4" padding='p-0' withBorder={false}>
                    <div className="card-header">
                        <div className="border-2 rounded mt-2 mx-2 p-1.5">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600"># {ticket?.number ?? '-'} - {ticket?.title}</span>
                                <Link to="/admin/ticketing/create" className="hidden md:inline-flex btn btn-sm rounded btn-svg">
                                    <ReactSVG src="/src/assets/svgs/plus.svg" />
                                    <span className="text-xs mr-1">تیکت جدید</span>
                                </Link>
                                <button onClick={() => setShowUserSidebar(true)} className="inline-flex md:hidden btn btn-sm btn-outline btn-sm-svg border-none">
                                    <ReactSVG src="/src/assets/svgs/users.svg" />
                                </button>
                            </div>
                            <div className="divider my-0"></div>
                            <div className="md:hidden mb-1 flex items-center justify-center">
                                <span className="mb-1 text-xs">{ticket?.creator.fullName}</span>
                                <PersianDate className="mr-1 md:mr-0 text-xs" date={ticket?.createdAt} format="fullDateTime"/>
                            </div>
                            <div className="flex text-sm text-gray-600 justify-between items-center">
                                <div className="">
                                    <div className="dropdown">
                                        <label tabIndex="0" className="btn dropdown-caret border-none rounded bg-blue-500 btn-sm text-xs px-2 py-2 m-1">وضعیت: {ticket?.status?.title ?? 'نامشخص'}</label>
                                        <ul tabIndex="0"
                                            className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                                            <li onClick={() => changeStatus('opened')} className=""><a className="p-2">باز</a></li>
                                            <li onClick={() => changeStatus('closed')} className=""><a className="p-2">بسته</a></li>
                                        </ul>
                                    </div>

                                </div>

                                <div className="hidden md:flex flex-col items-center">
                                    <span className="mb-1 font-semibold">{ticket?.creator.fullName}</span>
                                    <PersianDate className="mr-1 md:mr-0 text-xs" date={ticket?.createdAt} format="shortDateTime"/>
                                </div>

                                <div dir="ltr" className={`justify-end grid grid-cols-6 gap-1`}>
                                    <button onClick={loadTicket}
                                            className="btn btn-xs border-gray-400 rounded md:btn-sm btn-sm-svg btn-outline btn-square">
                                        <ReactSVG className="tooltip" data-tip="رفرش" src="/src/assets/svgs/reload.svg"/>
                                    </button>

                                    <button onClick={() => setShowHistoryModal(true)}
                                            className="btn btn-xs border-gray-400 text-gray-600 rounded md:btn-sm btn-sm-svg btn-outline btn-square">
                                        <ReactSVG className="tooltip" data-tip="تاریخچه" src="/src/assets/svgs/history.svg"/>
                                    </button>

                                    <button onClick={copyLink}
                                            className="btn btn-xs btn-success border-success-400 text-gray-600 rounded md:btn-sm btn-sm-svg btn-outline btn-square">
                                        <ReactSVG className="tooltip" data-tip="کپی لینک تیکت" src="/src/assets/svgs/link.svg"/>
                                    </button>

                                    <button onClick={() => setShowCategoriesModal(true)}
                                            className="btn btn-xs border-info-400 text-gray-600 btn-info rounded md:btn-sm btn-sm-svg btn-outline btn-square">
                                        <ReactSVG className="tooltip" data-tip="دسته بندی ها" src="/src/assets/svgs/tags.svg"/>
                                    </button>

                                    <button onClick={() => setShowDepartmentModal(true)}
                                            className="btn btn-xs btn-primary border-primary-400 text-gray-600 rounded md:btn-sm btn-sm-svg btn-outline btn-square">
                                        <ReactSVG className="tooltip" data-tip="انتقال تیکت" src="/src/assets/svgs/sign-right.svg"/>
                                    </button>

                                    {
                                        (ticket && CurrentUser().user.id !== ticket.creator.id) ? <button onClick={leftTicket}
                                                                                                          className="btn btn-xs btn-error border-red-400 rounded md:btn-sm btn-sm-svg btn-outline btn-square">
                                            <ReactSVG className="tooltip" data-tip="خروج" src="/src/assets/svgs/logout.svg"/>
                                        </button> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-2 justify-between flex flex-col">
                        <div id="messages" className="flex flex-col space-y-4 p-1 md:p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                            {
                                ticket?.comments.map((comment, index) => {
                                    const isCurrentUser = comment.creator.id === currentUser.user.id;
                                    return <TicketComment
                                        ticket={ticket}
                                        id={comment.id}
                                        key={comment.id}
                                        comment={comment}
                                        isCurrentUser={isCurrentUser}
                                        onRemove={removeMessage}
                                        onReply={setReplyTo}
                                        scrollToReply={(id) => scrollToId(id)}
                                    />;
                                })
                            }
                        </div>

                        <div className="border-gray-200">
                            <MessageBox
                                message={message}
                                setMessage={setMessage}
                                files={files}
                                setFiles={setFiles}
                                replyTo={replyTo}
                                onSend={sendMessage}
                                onCloseReply={() => setReplyTo(null)}
                            />
                        </div>
                    </div>
                </Card>

                <UsersSidebar
                    ticket={ticket}
                    loadTicket={loadTicket}
                    showSide={showUserSidebar}
                    toggleSide={() => setShowUserSidebar(!showUserSidebar)}
                />
                {
                    showCategoriesModal ? <SelectCategoryModal
                    ticket={ticket}
                    closeModal={(reload) => {
                        setShowCategoriesModal(false);
                        if (reload) {
                            loadTicket();
                        }
                    }}
                    show={showCategoriesModal}
                    /> : null
                }
                {
                    showDepartmentModal ? <SelectDepartmentModal
                        ticket={ticket}
                        closeModal={(reload) => {
                            setShowDepartmentModal(false);
                            if (reload) {
                                loadTicket();
                            }
                        }}
                        show={showDepartmentModal}
                    /> : null
                }
                {
                    showHistoryModal ? <TicketHistoryModal closeModal={setShowHistoryModal} show={showHistoryModal} ticketId={ticketId} /> : undefined
                }
            </div>
        </>
    )
}

export default ViewTicket;