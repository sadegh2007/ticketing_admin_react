import {useParams} from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import React, {useContext, useEffect, useState} from "react";
import {GetTicketById} from "../../services/TicketingApiService.js";
import {appContext} from "../../context/AppContext.js";
import {ReactSVG} from "react-svg";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";
import {CurrentUser} from "../../services/AuthService.js";
import PersianDate from "../../components/global/PersianDate.jsx";
import Card from "../../components/global/Card.jsx";
import {handleError} from "../../services/GlobalService.js";

const ViewTicket = () => {
    const {ticketId} = useParams();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [ticket, setTicket] = useState(null);

    const currentUser = CurrentUser();

    useEffect(() => {
        loadTicket();
    }, []);

    const loadTicket = () => {
        toggleMainLoader(true);

        GetTicketById(ticketId).then(response => {
            toggleMainLoader(false);
            setTicket(response);
        })
            .catch((error) => {
                toggleMainLoader(false);
                handleError(error)
            })
    }

    return (
        <>
            <Breadcrumb
                items={[{to: '/ticketing', title: 'فهرست تیکت ها'}, {to: '#', title: `تیکت شماره ${ticket?.number}`}]}/>

            <div className="ticketing-container grid grid-cols-1 md:grid-cols-5 md:gap-2">
                <Card className="col-span-4">
                    <div className="card-header">
                        <div className="border-2 rounded mt-4 mx-4 p-3">
                            <span># { ticket?.number } - { ticket?.title }</span>
                            <div className="divider my-1"></div>
                            <div className="flex text-sm text-gray-600 justify-between items-baseline">
                                <span className="">وضعیت: { ticket?.status?.title ?? 'نامشخص' }</span>
                                <span className="">{ ticket?.creator.fullName } - <PersianDate date={ticket?.createdAt} format="shortDateTime"/></span>
                                <div className="buttons justify-end">
                                    <button onClick={loadTicket} className="btn border-gray-400 rounded btn-sm btn-svg btn-outline btn-square">
                                        <ReactSVG src="/src/assets/svgs/reload.svg" />
                                    </button>
                                </div>


                            </div>

                        </div>
                    </div>

                    <div className="flex-1 p-2 pt-2 sm:p-6 sm:pt-2 justify-between flex flex-col">
                        <div id="messages"
                             className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                            {
                                ticket?.comments.map((comment) => {
                                    const isCurrentUser = comment.creator.id == currentUser.user.id;

                                    return (
                                        <div className="chat-message">
                                            <div className={`flex items-end ${!isCurrentUser ? 'justify-end' : ''}`}>
                                                <div
                                                    className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 ${!isCurrentUser ? 'order-1 items-end' : 'order-2 items-start'}`}>
                                                    <div><span
                                                        className={`px-4 py-2 inline-block rounded ${isCurrentUser ? 'bg-gray-300 text-gray-600 rounded-br-none' : 'rounded-bl-none bg-blue-600 text-white '}`}>{comment.message}</span>
                                                    </div>
                                                </div>
                                                <img
                                                    src={comment.creator.picture ?? '/src/assets/user-placeholder.png'}
                                                    alt="profile picture"
                                                    className={`w-10 h-10 rounded-full border ${isCurrentUser ? 'order-1' : 'order-2'}`}/>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                            <div className="">
                                <textarea type="text" placeholder="پیام خود را اینجا بنویسید..."
                                       className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pr-4 pl-12 bg-gray-200 rounded-md py-3">
                                </textarea>
                                <div className="mt-4 left-0 items-center">
                                    <button type="button"
                                            className="btn btn-success text-white">
                                        <ReactSVG src='/src/assets/svgs/send.svg'/>
                                        <span className="pr-2">ارسال</span>
                                    </button>

                                    <button type="button"
                                            className="btn text-white mr-2">
                                        <ReactSVG src='/src/assets/svgs/paperclip.svg'/>
                                        <span className="pr-2 text-sm">فایل ضمیمه</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="hidden md:block">
                    <div className="card-header border-b rounded-t bg-gray-800 text-white p-3 text-center">
                        کاربران
                    </div>
                    <div className="card-body">
                        <ul>

                        </ul>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default ViewTicket;