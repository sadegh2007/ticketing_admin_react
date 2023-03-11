import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import React, {useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import ServerSideTable from "../../components/table/ServerSideTable.jsx";
import {ReactSVG} from "react-svg";
import Apis from "../../general/ApiConstants.js";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";
import ServerSideSelect from "../../components/SelectBox/ServerSideSelect.jsx";
import {useNavigate} from "react-router-dom";

const Ticketing = () => {
    const columnHelper = createColumnHelper();
    const navigation = useNavigate();

    const columns = [
        columnHelper.accessor('title', {
            id: () => 0,
            cell: info => info.getValue(),
            header: () => "عنوان",
        }),
        columnHelper.accessor('status', {
            id: () => 1,
            cell: info => info.getValue().name === 'new' ? <div className="text-green-600">{info.getValue().title}</div> : <div>{info.getValue().title}</div>,
            header: () => "وضعیت",
        }),
        columnHelper.accessor('creator.fullName', {
            id: info => 2,
            cell: info => info.getValue() ?? '-',
            header: () => "ایجاد کننده",
            // Header: "Total trips",
            // accessor: "trips",
        }),
        columnHelper.accessor('department.title', {
            id: () => 3,
            cell: info => info.getValue() ?? '-',
            header: () => "دپارتمان",
            // Header: "Total trips",
            // accessor: "trips",
        }),
        columnHelper.accessor('', {
            // Header: "Current flight",
            // accessor: "flightName",
            id: () => 4,
            cell: info => {
                return (
                    <>
                        <button onClick={() => navigation(`/ticketing/${info.row.original.id}`)} className="table-action-button btn-square btn btn-sm btn-outline">
                            <ReactSVG src="/src/assets/svgs/eye.svg" />
                        </button>
                    </>
                );
            },
            header: () => "عملیات",
        }),
    ];

    const formatRowData = (rawData) => {
        return rawData;

        if (!rawData) rawData = [];

        console.log(rawData);
        return rawData.map((info) => (
                {
                    title: info.title,
                    creator: info.creator ?? {},
                    status: info.status ?? {},
                    department: info.department ?? {},
                    trips: info.trips,
                    flightName: info.airline?.name ?? '-',
                }
            )
        );
    }

    const [filters, setFilters] = useState({});
    const [titleFilter, setTitleFilter] = useState('');
    const [usersFilter, setUsersFilter] = useState([]);

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

    const formatUserSelect = (data) => {
        return data.todos.map((x) => {
            return {
                label: x.todo,
                value: x.id,
            };
        });
    }


    return (
        <>
            <Breadcrumb items={[{to: '/ticketing', title: 'فهرست تیکت ها'}]}/>
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <form onSubmit={onFilterSubmit} action="#">
                        <div className="grid grid-cols-3 grid-flow-col gap-3">
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">عنوان</span>
                                </label>
                                <input style={{height: '38px'}} value={titleFilter} onInput={(e) => setTitleFilter(e.target.value)} type="text" placeholder="عنوان..." className="input input-sm input-bordered rounded-sm w-full max-w-xs"/>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">کاربر</span>
                                </label>
                                <ServerSideSelect
                                    url={'https://dummyjson.com/todos'}
                                    onSelect={setUsersFilter}
                                    formatData={formatUserSelect}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <button className="btn-filter btn btn-sm gap-2" type="submit">
                                <ReactSVG src="/src/assets/svgs/filter.svg" />
                                فیلتر
                            </button>

                            {
                                Object.keys(filters).length > 0 ? <button onClick={removeFilters} className="mr-2 btn-filter btn btn-secondary btn-sm gap-2" type="button">
                                <ReactSVG src="/src/assets/svgs/filter-off.svg" />
                                حذف فیلتر
                                </button> : null
                            }
                        </div>
                    </form>
                    
                    <div className="divider"></div>
                    
                    <ServerSideTable
                        url={Apis.Ticketing.list}
                        method='POST'
                        rowPerPage={15}
                        formatRowData={(data) => formatRowData(data)}
                        columns={columns}
                        filters={filters}
                    />
                </div>
            </div>
        </>
    );
}

export default Ticketing;