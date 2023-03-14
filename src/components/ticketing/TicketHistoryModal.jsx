import {useEffect, useState} from "react";

const TicketHistoryModal = ({show, ticketId}) => {

    const [histories, setHistories] = useState([]);

    useEffect(() => {
        // load history
    }, [])

    return (
        <div className={`modal ${show ? 'modal-open' : ''} overflow-visible`}>
            <div className="modal-box rounded relative" style={{overflow: 'initial'}}>

            </div>
        </div>
    );
}