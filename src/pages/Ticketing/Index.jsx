import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import React, {useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import ServerSideTable from "../../components/table/ServerSideTable.jsx";
import {ReactSVG} from "react-svg";
import Apis from "../../general/ApiConstants.js";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";
import ServerSideSelect from "../../components/SelectBox/ServerSideSelect.jsx";
import {Link, useNavigate} from "react-router-dom";
import Card from "../../components/global/Card.jsx";
import ApiConstants from "../../general/ApiConstants.js";
import Input from "../../components/global/Form/Input.jsx";

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
        columnHelper.accessor('categories', {
            id: () => 4,
            cell: info => {
                const categories = (info.getValue() ?? []);

                if (categories.length === 0) return '-';

                return categories.join(', ');
            },
            header: () => "دسته بندی ها",
            // Header: "Total trips",
            // accessor: "trips",
        }),
        columnHelper.accessor('', {
            // Header: "Current flight",
            // accessor: "flightName",
            id: () => 5,
            cell: info => {
                return (
                    <>
                        <button onClick={() => navigation(`/admin/ticketing/${info.row.original.id}`)} className="rounded table-action-button btn-square btn btn-sm btn-outline">
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
    const [usersFilter, setUsersFilter] = useState();

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
        setUsersFilter([]);

        let newFilters = {...filters}

        delete newFilters['title'];

        setFilters({...newFilters});
    }

    const formatUserSelect = (data) => {
        return data.items?.map((x) => {
            return {
                label: x.fullName,
                value: x.id,
            };
        }) ?? [];
    }


    return (
        <>
            <Breadcrumb items={[{to: '/admin/ticketing', title: 'فهرست تیکت ها'}]}/>
            <Card>
                <div className="card-body p-3">
                    <div className="flex justify-end">
                        <Link to='/admin/ticketing/create' className="rounded btn-svg btn-sm btn btn-svg text-sm btn-primary">
                            <ReactSVG src="/src/assets/svgs/plus.svg" />
                            <span className="mr-1">ایجاد تیکت</span>
                        </Link>
                    </div>
                    <form onSubmit={onFilterSubmit} action="#">
                        <div className="grid grid-cols-1 gap-1 md:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
                            <Input
                                label="عنوان"
                                value={titleFilter}
                                onInput={(e) => setTitleFilter(e.target.value)}
                                placeholder="عنوان..."
                            />

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">کاربر</span>
                                </label>
                                <ServerSideSelect
                                    url={ApiConstants.Users.List}
                                    method={'POST'}
                                    onSelect={setUsersFilter}
                                    value={usersFilter}
                                    formatData={formatUserSelect}
                                />
                            </div>
                        </div>


                        <div className="mt-4">
                            <button className="btn-filter rounded btn gap-2 btn-svg btn-sm" type="submit">
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
                        url={Apis.Ticketing.List}
                        method='POST'
                        value={usersFilter}
                        rowPerPage={15}
                        formatRowData={(data) => formatRowData(data)}
                        columns={columns}
                        filters={filters}
                    />
                </div>
            </Card>
        </>
    );
}

export default Ticketing;