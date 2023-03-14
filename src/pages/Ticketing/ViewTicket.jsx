import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from "react";
import {GetTicketById, SendNewComment} from "../../services/TicketingApiService.js";
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

const ViewTicket = () => {
    const {ticketId} = useParams();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [ticket, setTicket] = useState(null);
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [departmentModal, setDepartmentModal] = useState(false);

    const currentUser = CurrentUser();

    useEffect(() => {
        loadTicket();
    }, []);

    useEffect(() => {
        if (ticket) {
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

    const sendMessage = () => {
        toggleMainLoader(true);

        const formData = new FormData();
        formData.set('message', message);

        files.forEach((file) => {
            formData.append('files', file);
        })

        SendNewComment(ticketId, formData).then(res => {
            const newTicket = ticket;
            newTicket.comments.push(res);

            setTicket(newTicket);
            setMessage('');
            setFiles([]);

            toggleMainLoader(false);

            if (res.id) {
                scrollToId(res.id);
            }

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

    }

    const copyLink = () => {
        navigator.clipboard.writeText(`${constants.APP_BASE_URL}/admin/ticketing/${ticketId}`);
    }

    return (
        <>
            <Breadcrumb
                items={[{to: '/admin/ticketing', title: 'فهرست تیکت ها'}, {to: '#', title: `تیکت شماره ${ticket?.number}`}]}/>

            <div className="ticketing-container grid grid-cols-1 md:grid-cols-5 md:gap-2">
                <Card className="col-span-4">
                    <div className="card-header">
                        <div className="border-2 rounded mt-4 mx-4 p-3">
                            <div className="flex justify-between items-center">
                                <span># {ticket?.number} - {ticket?.title}</span>
                                <div className="">
                                    <span className="text-xs">وضعیت: </span>
                                    <span className="px-2 py-1 rounded bg-blue-400 text-white text-xs">{ticket?.status?.title ?? 'نامشخص'}</span>
                                </div>
                                <button className="btn btn-sm rounded btn-svg">
                                    <ReactSVG src="/src/assets/svgs/plus.svg" />
                                    <span className="text-sm">تیکت جدید</span>
                                </button>
                            </div>
                            <div className="divider my-1"></div>
                            <div className="flex text-sm text-gray-600 justify-between items-center">
                                <span className="mb-1">{ticket?.creator.fullName}</span>

                                <PersianDate className="text-xs" date={ticket?.createdAt} format="shortDateTime"/>

                                <div className="flex">

                                    <div className="buttons justify-end">
                                        <button onClick={loadTicket}
                                                className="btn border-gray-400 rounded btn-sm btn-svg btn-outline btn-square">
                                            <ReactSVG className="tooltip" data-tip="رفرش" src="/src/assets/svgs/reload.svg"/>
                                        </button>
                                    </div>

                                    <div className="buttons justify-end mr-1">
                                        <button onClick={leftTicket}
                                                className="btn btn-error border-red-400 rounded btn-sm btn-svg btn-outline btn-square">
                                            <ReactSVG className="tooltip" data-tip="خروج" src="/src/assets/svgs/logout.svg"/>
                                        </button>
                                    </div>

                                    <div className="buttons justify-end mr-1">
                                        <button onClick={leftTicket}
                                                className="btn border-gray-400 text-gray-600 rounded btn-sm btn-svg btn-outline btn-square">
                                            <ReactSVG className="tooltip" data-tip="تاریخچه" src="/src/assets/svgs/history.svg"/>
                                        </button>
                                    </div>

                                    <div className="buttons justify-end mr-1">
                                        <button onClick={copyLink}
                                                className="btn border-gray-400 text-gray-600 rounded btn-sm btn-svg btn-outline btn-square">
                                            <ReactSVG className="tooltip" data-tip="کپی لینک تیکت" src="/src/assets/svgs/link.svg"/>
                                        </button>
                                    </div>

                                    <div className="buttons justify-end mr-1">
                                        <button onClick={() => setShowCategories(true)}
                                                className="btn border-gray-400 text-gray-600 rounded btn-sm btn-svg btn-outline btn-square">
                                            <ReactSVG className="tooltip" data-tip="دسته بندی ها" src="/src/assets/svgs/tags.svg"/>
                                        </button>
                                    </div>

                                    <div className="buttons justify-end mr-1">
                                        <button onClick={() => setDepartmentModal(true)}
                                                className="btn border-gray-400 text-gray-600 rounded btn-sm btn-svg btn-outline btn-square">
                                            <ReactSVG className="tooltip" data-tip="انتقال تیکت" src="/src/assets/svgs/sign-right.svg"/>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-2 pt-2 sm:p-6 sm:pt-2 justify-between flex flex-col">
                        <div id="messages"
                             className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                            {
                                ticket?.comments.map((comment, index) => {
                                    const isCurrentUser = comment.creator.id === currentUser.user.id;
                                    return <TicketComment key={comment.id} comment={comment} isCurrentUser={isCurrentUser} />;
                                })
                            }
                        </div>

                        <div className="border-t-2 border-gray-200 pt-4 mb-2 sm:mb-0">
                            <MessageBox
                                message={message}
                                setMessage={setMessage}
                                files={files}
                                setFiles={setFiles}
                                onSend={sendMessage}
                            />
                        </div>
                    </div>
                </Card>

                <UsersSidebar
                    ticket={ticket}
                    loadTicket={loadTicket}
                />
            </div>
        </>
    )
}

export default ViewTicket;