import ServerSideSelect from "../SelectBox/ServerSideSelect.jsx";
import React, {useContext, useEffect, useState} from "react";
import Apis from "../../general/ApiConstants.js";
import {appContext} from "../../context/AppContext.js";
import {MoveDepartmentOfTicket} from "../../services/TicketingApiService.js";
import {handleError} from "../../services/GlobalService.js";
import {ReactSVG} from "react-svg";

const SelectDepartmentModal = ({ticket, show, closeModal}) => {
    const [department, setDepartment] = useState(null);
    const {showMainLoader, toggleMainLoader} = useContext(appContext);

    useEffect(() => {
        if (ticket && ticket.department) {
            setDepartment({
                label: ticket.department.title,
                value: ticket.department.id,
            });
        }
    }, [ticket]);

    const formatDepartmentSelect = (data) => {
        return data.items.map((x) => {
            return {
                label: x.title,
                value: x.id,
            };
        });
    }

    const moveDepartment = async () => {
        if (!department) {
            return;
        }

        toggleMainLoader(true);

        MoveDepartmentOfTicket(ticket.id, department.value)
            .then(res => {
                setDepartment([]);

                toggleMainLoader(false);

                closeModal(true);
            })
            .catch(err => {
                handleError(err.response);
                toggleMainLoader(false);
            });
    }

    return (
        <div className={`modal ${show ? 'modal-open' : ''} overflow-visible`}>
            <div className="modal-box rounded relative" style={{overflow: 'initial'}}>
                <button onClick={() => {
                    setDepartment([]);
                    closeModal(false)
                }} className="btn btn-sm btn-square btn-svg text-gray-600 rounded btn-outline absolute left-2 top-2">
                    <ReactSVG src="/src/assets/svgs/X.svg" />
                </button>
                <h3 className="text-lg font-bold">انتخاب دپارتمان ها</h3>

                <div className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">دپارتمان ها</span>
                        </label>
                        <ServerSideSelect
                            placeholder=" دپارتمان ها..."
                            url={Apis.Departments.List}
                            value={department}
                            method='POST'
                            onSelect={setDepartment}
                            formatData={formatDepartmentSelect}
                        />
                    </div>
                </div>

                <div className="modal-action">
                    <button disabled={!department || !department?.value} onClick={moveDepartment} className="text-xs btn btn-svg btn-sm rounded btn-success text-white">
                        <ReactSVG src="/src/assets/svgs/device-floppy.svg" />
                        <span className="mr-1">ثبت</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SelectDepartmentModal;