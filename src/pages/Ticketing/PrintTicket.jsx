import {useEffect, useState} from "react";
import {GetTicketById} from "../../services/TicketingApiService.js";
import {handleError} from "../../services/GlobalService.js";
import {useParams} from "react-router-dom";
import PersianDate from "../../components/global/PersianDate.jsx";

const PrintTicket = () => {
    const {ticketId} = useParams();
    const [ticket, setTicket] = useState();

    useEffect(() => {

        GetTicketById(ticketId)
            .then(res => {
                setTicket(res);
            })
            .catch(err => {
                handleError(err.response);
            });

    }, [])

    if (!ticket) return 'درحال دریافت اطلاعات...';

    return (
        <div className="factor-print-page bg-white font-sm">
            <div className="border-2 border-black">
            <div className="font-bold flex justify-between items-center p-4">
                <span>تیکتینگ</span>
                <div>
                    <span>شماره تیکت: </span>
                    <span>{ ticket.number }</span>
                </div>
                <div className="">
                    <span>تاریخ: </span>
                    <PersianDate format="shortDateTime" date={ticket.createdAt}/>
                </div>
            </div>
            <table className="table border-t table-compact">
                <tbody>
                <tr>
                    <td>
                        <strong>شماره تیکت: </strong> <span>{ ticket.number }</span>
                    </td>
                    <td>
                        <strong>ایجاد کننده / تاریخ ایجاد: </strong> <span>{ ticket.creator.fullName } /  <PersianDate format="shortDateTime" date={ticket.createdAt}/></span>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <strong>عنوان تیکت: </strong><span>{ ticket.title }</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <table className="table table-bordered table-compact">
                <thead>
                    <tr>
                        <th style={{width: '40px'}}>ردیف</th>
                        <th style={{width: '150px'}}>کاربر</th>
                        <th style={{width: '150px'}}>تاریخ / زمان</th>
                        <th>پیام</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ticket.comments.map((comment, index) => {
                            return <tr>
                                <td>
                                    {index+1}
                                </td>
                                <td>
                                    {comment.creator.fullName}
                                </td>
                                <td>
                                    <PersianDate format="shortDateTime" date={comment.createdAt}/>
                                </td>
                                <td>
                                    <div dangerouslySetInnerHTML={{__html: comment.message}}></div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default PrintTicket;