import ServerSideSelect from "../SelectBox/ServerSideSelect.jsx";
import React, {useContext, useEffect, useState} from "react";
import Apis from "../../general/ApiConstants.js";
import {appContext} from "../../context/AppContext.js";
import {AddCategoriesToTicket, AddUserToTicket} from "../../services/TicketingApiService.js";
import {handleError} from "../../services/GlobalService.js";
import {ReactSVG} from "react-svg";

const SelectCategoryModal = ({ticket, show = false, closeModal}) => {
    const [categories, setCategories] = useState();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);

    useEffect(() => {
        if (ticket && ticket.categories && ticket.categories.length > 0) {
            setCategories(ticket.categories.map(c => {
                return {
                    value: c.id,
                    label: c.title
                }
            }));
        }
    }, []);

    const formatUserSelect = (data) => {
        return data.items.map((x) => {
            return {
                label: x.title,
                value: x.id,
            };
        });
    }

    const addCategories = async () => {
        if (!categories || categories.length === 0) {
            return;
        }

        toggleMainLoader(true);

        const categoriesIds = categories.map((i) => i.value);
        AddCategoriesToTicket(ticket.id, categoriesIds)
            .then(res => {
                setCategories([]);

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
                    setCategories([]);
                    closeModal(false)
                }} className="btn btn-sm btn-square btn-sm-svg text-gray-600 rounded btn-outline absolute left-2 top-2">
                    <ReactSVG src="/src/assets/svgs/X.svg" />
                </button>
                <h3 className="text-lg font-bold">انتخاب دسته بندی ها</h3>

                <div className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">دسته بندی ها</span>
                        </label>
                        <ServerSideSelect
                            placeholder="دسته بندی ها ..."
                            url={Apis.Categories.List}
                            value={categories}
                            method='POST'
                            onSelect={setCategories}
                            multiple={true}
                            formatData={formatUserSelect}
                        />
                    </div>
                </div>

                <div className="modal-action">
                    <button disabled={!categories || categories.length === 0} onClick={addCategories} className="text-sm btn btn-sm-svg btn-sm rounded btn-success text-white">
                        <ReactSVG src="/src/assets/svgs/device-floppy.svg" />
                        <span className="mr-1">ثبت</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SelectCategoryModal;