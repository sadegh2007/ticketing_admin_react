import {useParams} from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import React, {useContext, useEffect, useState} from "react";
import {GetTicketById} from "../../services/TicketingApiService.js";
import {appContext} from "../../context/AppContext.js";
import {ReactSVG} from "react-svg";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";

const ViewTicket = () => {
    const {ticketId} = useParams();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        loadTicket();
    }, []);

    const loadTicket = () => {
        toggleMainLoader(true);

        GetTicketById(ticketId).then(response => {
            setTicket(response);
        })

        toggleMainLoader(false);
    }

    return (
        <>
            <Breadcrumb items={[{to: '/ticketing', title: 'فهرست تیکت ها'}, {to: '#', title: `تیکت شماره ${ticket.number}`}]}/>

            <div className="flex gap-2">
                <div className="chat-container w-4/5">
                    <div className="">
                        <div style={{height: '600px'}} className="card bg-base-100 shadow">
                            <div className="card-header bg-gray-300 p-2 rounded-t-xl border-b">
                                <p className="pr-3">{ticket.title}</p>
                            </div>

                            <div className="overflow-y-auto card-body p-4">

                                <div className="chat chat-start">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Obi-Wan Kenobi
                                    </div>
                                    <div className="chat-bubble">You were the Chosen One!</div>
                                    <div className="mt-1 chat-footer text-sm opacity-50">
                                        1401/12/18 12:20
                                    </div>
                                </div>

                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>

                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src="/src/assets/user-placeholder.png"/>
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Anakin
                                    <time className="text-xs opacity-50">12:46</time>
                                </div>
                                <div className="chat-bubble">I hate you!</div>
                                <div className="chat-footer opacity-50">
                                    Seen at 12:46
                                </div>
                            </div>
                                <div className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src="/src/assets/user-placeholder.png"/>
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Anakin
                                    <time className="text-xs opacity-50">12:46</time>
                                </div>
                                <div className="chat-bubble">I hate you!</div>
                                <div className="chat-footer opacity-50">
                                    Seen at 12:46
                                </div>
                            </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="/src/assets/user-placeholder.png"/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        Anakin
                                        <time className="text-xs opacity-50">12:46</time>
                                    </div>
                                    <div className="chat-bubble">I hate you!</div>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:46
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow mt-2">
                            <div className="card-body p-4">
                                <textarea rows={3} className="w-full textarea textarea-bordered" placeholder="متن پیام..."></textarea>
                                <div className="flex flex-row">
                                    <button className="btn btn-square text-white btn-success">
                                        <ReactSVG src="/src/assets/svgs/send.svg" />
                                    </button>
                                    <button className="btn btn-square mr-2">
                                        <ReactSVG src="/src/assets/svgs/paperclip.svg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat-user-container w-1/5 h-full">
                    <div style={{minHeight: '600px'}} className="card bg-base-100 shadow">
                        <div className="card-header bg-gray-300 p-2 rounded-t-xl border-b">
                            <p className="pr-3">کاربران</p>
                        </div>
                        <div className="card-body">
                            <ul>
                                <li>User 1</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewTicket;