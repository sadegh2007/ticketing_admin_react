import {constants} from "../../general/constants.js";
import {ReactSVG} from "react-svg";
import React, {useContext, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import {appContext} from "../../context/AppContext.js";
import {RemoveMessageFromTicket} from "../../services/TicketingApiService.js";
import {handleError} from "../../services/GlobalService.js";
import CommentViewersModal from "./CommentViewersModal.jsx";

const TicketComment = ({ticket, comment, isCurrentUser, onRemove, onReply, scrollToReply}) => {
    const [showViewer, setShowViewer] = useState(false);

    return (
        <>
            <div id={comment.id} className="chat-message">
                <div className={`flex items-end ${!isCurrentUser ? 'justify-end' : ''}`}>
                    <div
                        className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 ${!isCurrentUser ? 'order-1 items-end' : 'order-2 items-start'}`}>
                        <div>
                        <span

                            className={`px-3 py-2 inline-block rounded ${isCurrentUser ? 'bg-gray-300 text-gray-600 rounded-br-none' : 'rounded-bl-none bg-blue-600 text-white '}`}>
                            {/*{comment.message}*/}

                            {
                                comment.replay ? <div onClick={() => scrollToReply(comment.replay.id)} className={`${isCurrentUser ? 'hover:bg-gray-400 border-gray-500' : 'hover:bg-blue-400 border-blue-500'} rounded border cursor-pointer mb-2 text-xs border-dashed`}>
                                    <div className="px-2 py-1" dangerouslySetInnerHTML={{__html: comment.replay.message}}/>
                                </div> : undefined
                            }

                            <div dangerouslySetInnerHTML={{__html: comment.message}}/>

                            {
                                comment.files.length > 0 ?
                                    <div className="flex mt-2 justify-end">
                                        <span className="divider m-0 p-0"></span>

                                        {
                                            comment.files.map((file) => {
                                                return (
                                                    <a key={file.id}
                                                       data-tip={file.fileName}
                                                       className="btn btn-outline btn-square btn-sm btn-svg rounded mr-1 tooltip"
                                                       target="_blank"
                                                       href={`${constants.BASE_URL}${file.path}`}>
                                                        <ReactSVG
                                                            src="/src/assets/svgs/file.svg"/>
                                                    </a>
                                                );
                                            })
                                        }
                                    </div> : undefined
                            }

                            <span className="divider m-0 p-0"></span>

                            <span className="flex justify-end items-center">
                                <button
                                    onClick={() => setShowViewer(true)}
                                    className={`btn-xs btn-sm-svg ml-1 btn-square ${isCurrentUser ? 'bg-gray-300 hover:bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    <ReactSVG className="tooltip" data-tip="دیده شده" src="/src/assets/svgs/eye.svg"/>
                                </button>

                                <button
                                    onClick={() => onReply(comment)}
                                    className={`btn-xs btn-sm-svg ml-1 btn-square ${isCurrentUser ? 'bg-gray-300 hover:bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    <ReactSVG className="tooltip" data-tip="پاسخ"
                                              src="/src/assets/svgs/arrow-forward.svg"/>
                                </button>
                                {
                                    ticket.creator.id === comment.creator.id ? <button
                                        onClick={() => onRemove(comment.id)}
                                        className={`btn-xs btn-sm-svg btn-square ${isCurrentUser ? 'bg-gray-300 hover:bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                                    >
                                        <ReactSVG className="tooltip" data-tip="حذف" src="/src/assets/svgs/trash.svg"/>
                                    </button> : null
                                }
                            </span>
                        </span>
                        </div>
                    </div>
                    <img
                        src={comment.creator.picture ?? '/src/assets/user-placeholder.png'}
                        alt="profile picture"
                        className={`w-10 h-10 rounded-full border ${isCurrentUser ? 'order-1' : 'order-2'}`}/>
                </div>
            </div>
            {
                showViewer
                    ? <CommentViewersModal
                        show={showViewer}
                        ticketId={ticket.id}
                        commentId={comment.id}
                        closeModal={setShowViewer}
                    />
                    : undefined
            }

        </>
    );
}

export default TicketComment;