import {ReactSVG} from "react-svg";
import {useContext, useEffect, useState} from "react";
import {TicketCommentViewers} from "../../services/TicketingApiService.js";
import {appContext} from "../../context/AppContext.js";
import {handleError} from "../../services/GlobalService.js";

const CommentViewersModal = ({ticketId, commentId, closeModal, show}) => {
    const [viewers, setViewers] = useState([]);
    const {showMainLoader, toggleMainLoader} = useContext(appContext);

    useEffect(() => {
        toggleMainLoader(true);

        TicketCommentViewers(ticketId, commentId)
            .then(res => {
                setViewers(res);
                toggleMainLoader(false);
            })
            .catch(e => {
                toggleMainLoader(false);
                handleError(e.response);
            })
    }, []);

    return (
        <div className={`modal ${show ? 'modal-open' : ''} overflow-visible`}>
            <div className="modal-box rounded relative" style={{overflow: 'initial'}}>
                <button onClick={() => {
                    setViewers([]);
                    closeModal(false)
                }} className="btn btn-sm btn-square btn-svg text-gray-600 rounded btn-outline absolute left-2 top-2">
                    <ReactSVG src="/src/assets/svgs/X.svg"/>
                </button>
                <h3 className="text-lg font-bold">بازدید کنندگان پیام</h3>
                <div className="divider m-0 mt-2"></div>
                <ul>
                    {
                        viewers.length === 0 ? <p>هیچ کاربری وجود ندارد</p> : undefined
                    }
                    {
                        viewers.map((userItem, index) => {
                            return (
                                <>
                                    <li id={userItem.id} key={userItem.id}
                                        className="flex justify-between items-center my-2">
                                        <div className="flex items-center">
                                            <img className="w-8 rounded-full border"
                                                 src={(userItem.creator && userItem.creator.picture) ? userItem.creator.picture : '/src/assets/user-placeholder.png'}
                                                 alt="user"/>
                                            <div className="flex items-center">
                                                <span
                                                    className="mr-2 text-xs">{(userItem.creator && userItem.creator.fullName) ? userItem.creator.fullName : '-'}</span>
                                            </div>
                                        </div>
                                    </li>
                                    {
                                        (index < (viewers.length-1)) ? <div className="border-b m-0 mt-2 p-0"></div> : undefined
                                    }
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default CommentViewersModal;