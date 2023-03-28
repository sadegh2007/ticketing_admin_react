import React, {useContext, useRef, useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import ServerSideTable from "../../components/table/ServerSideTable.jsx";
import {ReactSVG} from "react-svg";
import Apis from "../../general/ApiConstants.js";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";
import Card from "../../components/global/Card.jsx";
import Input from "../../components/global/Form/Input.jsx";
import PersianDate from "../../components/global/PersianDate.jsx";
import CategoryModal from "../../modals/Categories/CategoryModal.jsx";
import {DeleteCategory} from "../../services/CategoryApiService.js";
import {handleError} from "../../services/GlobalService.js";
import {appContext} from "../../context/AppContext.js";
import {confirmAlert} from "react-confirm-alert";
import DepartmentModal from "../../modals/Deparments/DepartmentModal.jsx";
import {DeleteDepartment} from "../../services/DepartmentApiService.js";
import {GetTenant} from "../../services/AuthService.js";

const DepartmentsIndex = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [filters, setFilters] = useState({});
    const [titleFilter, setTitleFilter] = useState('');
    const {showMainLoader, toggleMainLoader} = useContext(appContext);

    const columnHelper = createColumnHelper();
    const tableRef = useRef(null);

    const openEditModal = (category) => {
        setCurrentDepartment(category);
        setShowEditModal(true);
    }

    const closeEditModal = (reload = false) => {
        setCurrentDepartment(null);
        setShowEditModal(false);

        if (tableRef && reload) {
            tableRef.current.reload();
        }
    }

    const deleteDepartment = (department) => {

        const options = {
            title: 'حذف دسته بندی',
            message: 'آیا از حذف این دسته بندی مطمئن هستید؟',
            buttons: [
                {
                    label: 'خیر',
                    onClick: () => {
                    }
                },
                {
                    label: 'بله!',
                    onClick: () => {
                        toggleMainLoader(true);

                        DeleteDepartment(department.id)
                            .then(res => {
                                tableRef.current.reload();
                            })
                            .catch(err => {
                                toggleMainLoader(false);
                                handleError(err.response);
                            });
                    }
                },
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
        };

        confirmAlert(options);
    }

    const columns = [
        columnHelper.accessor('title', {
            id: () => 0,
            cell: info => info.getValue(),
            header: () => "عنوان",
        }),
        columnHelper.accessor('createdAt', {
            id: info => 1,
            cell: info => <PersianDate date={info.getValue()} />,
            header: () => "تاریخ ایجاد",
            // Header: "Total trips",
            // accessor: "trips",
        }),
        columnHelper.accessor('', {
            // Header: "Current flight",
            // accessor: "flightName",
            id: () => 2,
            cell: info => {
                return (
                    <div>
                        <button onClick={() => openEditModal(info.row.original)} className="rounded btn-success table-action-button btn-square btn btn-sm btn-sm-svg btn-outline">
                            <ReactSVG src="/src/assets/svgs/pencil.svg" />
                        </button>

                        <button onClick={() => deleteDepartment(info.row.original)} className="mr-1 rounded btn-error  table-action-button btn-square btn btn-sm btn-sm-svg btn-outline">
                            <ReactSVG src="/src/assets/svgs/trash.svg" />
                        </button>
                    </div>
                );
            },
            header: () => "عملیات",
        }),
    ];

    const formatRowData = (rawData) => {
        return rawData;

        if (!rawData) rawData = [];

        return rawData.map((info) => (
                {
                    title: info.title,
                    creator: info.creator ?? {},
                    createdAt: info.createdAt,
                }
            )
        );
    }

    const closeModal = (reload) => {
        setShowCreateModal(false);
        if (reload) {
            tableRef.current.reload();
        }
    }

    const onFilterSubmit = (e) => {
        e.preventDefault();

        let filters = {};

        filters['title'] = titleFilter;

        if (Object.keys(filters).length > 0) {
            setFilters(filters)
        }
    }

    const removeFilters = () => {
        setTitleFilter('');

        let newFilters = {...filters}

        delete newFilters['title'];

        setFilters({...newFilters});
    }

    return (
        <>
            <Breadcrumb items={[{to: `/${GetTenant()}/admin/ticketing/categories`, title: 'فهرست دپارتمان ها'}]}/>
            <Card title="دپارتمان ها" icon="/src/assets/svgs/building.svg">
                <div className="flex justify-end">
                    <button onClick={() => setShowCreateModal(true)} className="btn btn-sm rounded btn-svg">
                        <ReactSVG src="/src/assets/svgs/plus.svg" />
                        <span className="mr-1">ایجاد دپارتمان</span>
                    </button>
                </div>
                <form onSubmit={onFilterSubmit} action="#">
                    <div className="grid grid-cols-1 gap-1 md:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
                        <Input
                            label="عنوان"
                            value={titleFilter}
                            onInput={(e) => setTitleFilter(e.target.value)}
                            placeholder="عنوان..."
                        />
                    </div>


                    <div className="mt-4">
                        <button className="btn-filter rounded btn gap-2 btn-sm-svg btn-sm" type="submit">
                            <ReactSVG src="/src/assets/svgs/filter.svg" />
                            فیلتر
                        </button>

                        {
                            Object.keys(filters).length > 0 ? <button onClick={removeFilters} className="btn-svg rounded btn-sm mr-2 btn-filter btn btn-secondary gap-2" type="button">
                                <ReactSVG src="/src/assets/svgs/filter-off.svg" />
                                حذف فیلتر
                            </button> : null
                        }
                    </div>
                </form>

                <div className="divider"></div>

                <ServerSideTable
                    ref={tableRef}
                    url={Apis.Departments.List}
                    method='POST'
                    rowPerPage={15}
                    formatRowData={(data) => formatRowData(data)}
                    columns={columns}
                    filters={filters}
                />
            </Card>
            {
                showCreateModal ? <DepartmentModal
                    show={showCreateModal}
                    closeModal={closeModal}
                    department={null}
                />: undefined
            }
            {
                showEditModal ?  <DepartmentModal
                    show={showEditModal}
                    closeModal={closeEditModal}
                    department={currentDepartment}
                /> : undefined
            }
        </>
    );
}

export default DepartmentsIndex;