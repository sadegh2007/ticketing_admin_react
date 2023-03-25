import {constants} from "../../general/constants.js";
import {ReactSVG} from "react-svg";
import React, {useState} from "react";
import CommentViewersModal from "./CommentViewersModal.jsx";
import PersianDate from "../global/PersianDate.jsx";

const TicketComment = ({ticket, comment, isCurrentUser, onRemove, onReply, scrollToReply}) => {
    const [showViewer, setShowViewer] = useState(false);

    return (
        <>
            <div id={comment.id} className="chat-message">
                <div className={`flex items-end ${!isCurrentUser ? 'justify-end' : ''}`}>
                    <div
                        className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 ${!isCurrentUser ? 'order-1 items-end' : 'order-2 items-start'}`}>
                        <div>
                        <span className={`px-3 py-2 inline-block rounded ${isCurrentUser ? 'rounded-br-none bg-blue-600 text-white' : 'bg-gray-300 text-gray-600 rounded-bl-none'}`}>
                            <span className="flex justify-between items-center text-xs">
                                <p className="ml-8">{comment.creator.fullName}</p>
                                <PersianDate format="shortDateTime" className={isCurrentUser ? "text-blue-300" : "text-gray-500"} date={comment.createdAt} />
                            </span>

                            <div className="divider m-0 p-0"></div>

                            {
                                comment.replay
                                    ? <div onClick={() => scrollToReply(comment.replay.id)} className={`${isCurrentUser ? 'hover:bg-blue-500 hover:border-blue-800 border-blue-800 text-blue-300' : 'hover:bg-gray-400 hover:border-gray-500 border-gray-500 text-gray-500'} border-2 border-y-transparent border-l-transparent mb-1 cursor-pointer mb-2 text-xs border-dashed`}>
                                        <span className="flex btn-sm-svg mb-1 mr-2">
                                            <ReactSVG className="ml-1" src="/src/assets/svgs/arrow-forward.svg"/>
                                            {comment.replay.creator.fullName}
                                        </span>
                                        <div className="px-2 py-0.5 max-h-5 text-clip overflow-hidden" dangerouslySetInnerHTML={{__html: comment.replay.message}}/>
                                    </div>
                                    : undefined
                            }

                            <div className="font-semibold" dangerouslySetInnerHTML={{__html: comment.message}}/>

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
                                    className={`btn-xs btn-sm-svg ml-1 btn-square ${isCurrentUser ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'}`}
                                >
                                    <ReactSVG className="tooltip" data-tip="دیده شده" src="/src/assets/svgs/eye.svg"/>
                                </button>

                                <button
                                    onClick={() => onReply(comment)}
                                    className={`btn-xs btn-sm-svg ml-1 btn-square ${isCurrentUser ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'}`}
                                >
                                    <ReactSVG className="tooltip" data-tip="پاسخ"
                                              src="/src/assets/svgs/arrow-forward.svg"/>
                                </button>
                                {
                                    ticket.creator.id === comment.creator.id ? <button
                                        onClick={() => onRemove(comment.id)}
                                        className={`btn-xs btn-sm-svg btn-square ${isCurrentUser ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'}`}
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
                        className={`hidden md:inline-block w-10 h-10 rounded-full border ${isCurrentUser ? 'order-1' : 'order-2'}`}/>
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