import {useContext, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import {GetTicketHistories} from "../../services/TicketingApiService.js";
import {appContext} from "../../context/AppContext.js";
import {handleError} from "../../services/GlobalService.js";
import PersianDate from "../global/PersianDate.jsx";

const TicketHistoryModal = ({show, ticketId, closeModal}) => {
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        toggleMainLoader(true);
        // load history
        GetTicketHistories(ticketId)
            .then(res => {
                setHistories(res);
                toggleMainLoader(false);
            })
            .catch(err => {
                toggleMainLoader(false);
                handleError(err.response);
            });
    }, [])

    return (
        <div className={`modal ${show ? 'modal-open' : ''}`}>
            <div className="modal-box p-4 rounded relative overflow-hidden">
                <button onClick={() => {
                    setHistories([]);
                    closeModal(false)
                }} className="btn btn-sm btn-square btn-sm-svg text-gray-600 rounded btn-outline absolute left-2 top-2">
                    <ReactSVG src="/src/assets/svgs/X.svg"/>
                </button>
                <h3 className="text-lg font-bold">تاریخچه تیکت</h3>

                <div className="divider m-0 p-0"></div>
                <div className="history-container">
                    <div
                        className="flex flex-col md:grid grid-cols-9 mx-auto text-blue-50"
                    >
                    {
                        histories.map((h, i) => {
                            if (i % 2 === 0) {
                                return (
                                    <div key={i} className="flex md:contents text-sm">
                                        <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                                            <div className="h-full w-3 flex items-center justify-center">
                                                <div className="h-full w-0.5 bg-blue-800 pointer-events-none"></div>
                                            </div>
                                            <div
                                                className="w-3 h-3 absolute top-1/2 -mt-3 rounded-full bg-blue-500"
                                            ></div>
                                        </div>
                                        <div
                                            className="bg-blue-500 col-start-6 col-end-10 p-3 rounded my-4 mr-auto"
                                        >
                                            <p style={{direction: "rtl"}} className="">
                                                {h.message}
                                            </p>
                                            <div className="divider m-0"></div>
                                            <PersianDate className="text-xs" date={h.createdAt} format="shortDateTime"/>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={i} className="flex md:contents text-sm flex-row-reverse">
                                    <div
                                        className="bg-blue-500 col-start-1 col-end-5 p-3 rounded my-4 ml-auto"
                                    >
                                        <p style={{direction: "rtl"}} className="leading-tight">
                                            {h.message}
                                        </p>
                                        <div className="divider m-0"></div>

                                        <PersianDate className="text-xs" date={h.createdAt} format="shortDateTime"/>

                                    </div>
                                    <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                                        <div className="h-full w-3 flex items-center justify-center">
                                            <div className="h-full w-0.5 bg-blue-800 pointer-events-none"></div>
                                        </div>
                                        <div
                                            className="w-3 h-3 absolute top-1/2 -mt-3 rounded-full bg-blue-500"
                                        ></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketHistoryModal;