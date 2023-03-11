import ServerSideSelect from "../SelectBox/ServerSideSelect.jsx";
import React, {useState} from "react";

const NewUserModal = ({ticketId, show, closeModal}) => {
    const [users, setUsers] = useState([]);

    const formatUserSelect = (data) => {
        return data.todos.map((x) => {
            return {
                label: x.todo,
                value: x.id,
            };
        });
    }

    return (
        <div className={`modal ${show ? 'modal-open' : ''} overflow-visible`}>
            <div className="modal-box relative" style={{overflow: 'initial'}}>
                <button onClick={closeModal} className="btn btn-sm btn-circle absolute left-2 top-2">✕</button>
                <h3 className="text-lg font-bold">اضافه کردن کاربر</h3>

                <div className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">کاربر</span>
                        </label>
                        <ServerSideSelect
                            url={'https://dummyjson.com/todos'}
                            onSelect={setUsers}
                            multiple={true}
                            formatData={formatUserSelect}
                        />
                    </div>
                </div>

                <div className="modal-action">
                    <label htmlFor="my-modal" className="btn">اضافه کردن</label>
                </div>
            </div>
        </div>
    );
}

export default NewUserModal;