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
import NewUserModal from "../../components/ticketing/NewUserModal.jsx";
import { useForm } from "react-hook-form";
import UsersSidebar from "../../components/ticketing/UsersSidebar.jsx";

const ViewTicket = () => {
    const {ticketId} = useParams();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [ticket, setTicket] = useState(null);
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    let fileRef = useRef();

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
        // if (!message || message.trim().length === 0) {
        //     notify('لطفا پیام خود را وارد کنید.');
        //     return;
        // }

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

    const attachFile = () => {
        fileRef.click();
    }

    const fileSelectChange = (e) => {
        const newFiles = [...files, ...e.target.files]
        setFiles(newFiles);

        // clear input
        e.target.value = null;
    }

    const removeFile = (index) => {
        let newFiles = [...files];
        newFiles.splice(index, 1);

        setFiles(newFiles);
    }

    const scrollToId = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <>
            <Breadcrumb
                items={[{to: '/ticketing', title: 'فهرست تیکت ها'}, {to: '#', title: `تیکت شماره ${ticket?.number}`}]}/>

            <div className="ticketing-container grid grid-cols-1 md:grid-cols-5 md:gap-2">
                <Card className="col-span-4">
                    <div className="card-header">
                        <div className="border-2 rounded mt-4 mx-4 p-3">
                            <span># {ticket?.number} - {ticket?.title}</span>
                            <div className="divider my-1"></div>
                            <div className="flex text-sm text-gray-600 justify-between items-center">
                                <span
                                    className="px-2 py-1 border rounded bg-blue-400 text-white">وضعیت: {ticket?.status?.title ?? 'نامشخص'}</span>
                                <div className="flex items-center flex-col">
                                    <span className="mb-1">{ticket?.creator.fullName}</span>
                                    <PersianDate className="text-xs" date={ticket?.createdAt} format="shortDateTime"/>
                                </div>
                                <div className="buttons justify-end">
                                    <button onClick={loadTicket}
                                            className="btn border-gray-400 rounded btn-sm btn-svg btn-outline btn-square">
                                        <ReactSVG src="/src/assets/svgs/reload.svg"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-2 pt-2 sm:p-6 sm:pt-2 justify-between flex flex-col">
                        <div id="messages"
                             className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                            {
                                ticket?.comments.map((comment, index) => {
                                    const isCurrentUser = comment.creator.id == currentUser.user.id;

                                    return (
                                        <div id={comment.id} key={index} className="chat-message">
                                            <div className={`flex items-end ${!isCurrentUser ? 'justify-end' : ''}`}>
                                                <div
                                                    className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 ${!isCurrentUser ? 'order-1 items-end' : 'order-2 items-start'}`}>
                                                    <div>
                                                        <span
                                                            className={`px-4 py-2 inline-block rounded ${isCurrentUser ? 'bg-gray-300 text-gray-600 rounded-br-none' : 'rounded-bl-none bg-blue-600 text-white '}`}>
                                                            {comment.message}
                                                            <div className="flex mt-2 justify-end">
                                                                {
                                                                    comment.files.map((file) => {
                                                                        return (
                                                                            <a key={file.id} data-tip={file.fileName}
                                                                               className="btn btn-outline btn-square btn-sm btn-svg rounded mr-1 tooltip"
                                                                               target="_blank"
                                                                               href={`${constants.BASE_URL}${file.path}`}>
                                                                                <ReactSVG
                                                                                    src="/src/assets/svgs/file.svg"/>
                                                                            </a>
                                                                        );
                                                                    })
                                                                }
                                                            </div>
                                                        </span>
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
                            <form onSubmit={handleSubmit(sendMessage)}>
                                <textarea
                                    placeholder="پیام خود را اینجا بنویسید..."
                                    {...register('message', {required: true, min: 3})}
                                    value={message}
                                    onInput={(e) => setMessage(e.target.value)}
                                    className={`textarea rounded ${errors.message && 'textarea-error'} w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pr-4 pl-12 bg-gray-200 py-3`}>
                                </textarea>
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="">
                                        <button type="submit"
                                                // onClick={sendMessage}
                                                className="btn btn-success text-white">
                                            <ReactSVG src='/src/assets/svgs/send.svg'/>
                                            <span className="pr-2">ارسال</span>
                                        </button>

                                        <button type="button"
                                                onClick={attachFile}
                                                className="btn text-white mr-2"
                                        >
                                            <ReactSVG src='/src/assets/svgs/paperclip.svg'/>
                                            <span className="pr-2 text-sm">فایل ضمیمه</span>
                                        </button>
                                        <input onChange={fileSelectChange} ref={(inputRef) => fileRef = inputRef} hidden={true} type="file" name="files"/>
                                    </div>
                                    <div dir="ltr" className="flex text-sm text-gray-600">
                                        {
                                            files.map((file, index) => {
                                                return (
                                                    <div key={index} className="mr-1 px-2 py-1 border rounded bg-slate-200">
                                                        {file.name}
                                                        <button onClick={() => removeFile(index)} className="ml-1 btn-outline btn btn-sm btn-square">x</button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </form>
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