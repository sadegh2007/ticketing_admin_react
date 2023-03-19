import ServerSideSelect from "../SelectBox/ServerSideSelect.jsx";
import React, {useContext, useState} from "react";
import Apis from "../../general/ApiConstants.js";
import {appContext} from "../../context/AppContext.js";
import {AddUserToTicket} from "../../services/TicketingApiService.js";
import {handleError} from "../../services/GlobalService.js";
import {ReactSVG} from "react-svg";

const NewUserModal = ({ticketId, show, closeModal}) => {
    const [users, setUsers] = useState(null);
    const {showMainLoader, toggleMainLoader} = useContext(appContext);

    const formatUserSelect = (data) => {
        return data.items.map((x) => {
            return {
                label: x.fullName,
                value: x.id,
            };
        });
    }

    const addUser = async () => {
        toggleMainLoader(true);

        const userIds = users.map((i) => i.value);
        AddUserToTicket(ticketId, userIds)
            .then(res => {
                setUsers([]);

                toggleMainLoader(false);

                closeModal(true);
            })
            .catch(err => {
                console.log(err)
                handleError(err.response);
                toggleMainLoader(false);
            });
    }

    return (
        <div className={`modal ${show ? 'modal-open' : ''} overflow-visible`}>
            <div className="modal-box rounded relative" style={{overflow: 'initial'}}>
                <button onClick={() => {
                    setUsers([]);
                    closeModal(false)
                }} className="btn btn-sm btn-square btn-sm-svg text-gray-600 rounded btn-outline absolute left-2 top-2">
                    <ReactSVG src="/src/assets/svgs/X.svg" />
                </button>
                <h3 className="text-lg font-bold">اضافه کردن کاربر</h3>

                <div className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">کاربر</span>
                        </label>
                        <ServerSideSelect
                            placeholder="کاربران..."
                            url={Apis.Users.List}
                            value={users}
                            method='POST'
                            onSelect={setUsers}
                            multiple={true}
                            formatData={formatUserSelect}
                        />
                    </div>
                </div>

                <div className="modal-action">
                    <button onClick={addUser} className="text-sm btn btn-sm btn-sm-svg rounded btn-success text-white">
                        <ReactSVG src="/src/assets/svgs/device-floppy.svg" />
                        <span className="mr-1">اضافه کردن</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewUserModal;