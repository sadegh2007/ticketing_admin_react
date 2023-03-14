import {constants} from "../../general/constants.js";
import {ReactSVG} from "react-svg";
import React from "react";

const TicketComment = ({comment, isCurrentUser}) => {
    return (
        <div id={comment.id} className="chat-message">
            <div className={`flex items-end ${!isCurrentUser ? 'justify-end' : ''}`}>
                <div
                    className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 ${!isCurrentUser ? 'order-1 items-end' : 'order-2 items-start'}`}>
                    <div>
                        <span

                            className={`px-4 py-2 inline-block rounded ${isCurrentUser ? 'bg-gray-300 text-gray-600 rounded-br-none' : 'rounded-bl-none bg-blue-600 text-white '}`}>
                            {/*{comment.message}*/}
                            <div dangerouslySetInnerHTML={{__html: comment.message}}/>
                            {
                                comment.files.length > 0 ?
                                    <div className="flex mt-2 justify-end">
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
}

export default TicketComment;