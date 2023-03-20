import React, {useContext, useRef, useState} from "react";
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
import SelectCategoryModal from "../../components/ticketing/SelectCategoryModal.jsx";
import {CurrentUser} from "../../services/AuthService.js";
import {DeleteTicket} from "../../services/TicketingApiService.js";
import {notify} from "../../utilities/index.js";
import {handleError} from "../../services/GlobalService.js";
import {confirmAlert} from "react-confirm-alert";
import {appContext} from "../../context/AppContext.js";

const Ticketing = () => {

    const columnHelper = createColumnHelper();
    const navigation = useNavigate();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [showCategoryModel, setShowCategoryModal] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(false);
    const [filters, setFilters] = useState({});
    const [titleFilter, setTitleFilter] = useState('');
    const [numberFilter, setNumberFilter] = useState('');
    const [usersFilter, setUsersFilter] = useState();

    const datatable = useRef(null);

    const assignCategory = (ticket) => {
        setCurrentTicket(ticket);
        setShowCategoryModal(true);
    }

    const deleteTicket = (ticket) => {
        const options = {
            title: 'حذف پیام',
            message: 'آیا از حذف این پیام مطمئن هستید؟',
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

                        DeleteTicket(ticket.id)
                            .then(res => {
                                datatable.current.reload();

                                toggleMainLoader(false);

                                notify('با موفقیت حذف شد.', 'success');
                            }).catch(e => {
                            toggleMainLoader(false);
                            handleError(e.response);
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
            cell: info => <span className={info.row.original.unreadCount > 0 ? 'font-bold' : ''}>{info.getValue()}</span>,
            header: () => "عنوان",
        }),
        columnHelper.accessor('number', {
            id: () => 1,
            cell: info => <span className={info.row.original.unreadCount > 0 ? 'font-bold' : ''}>{info.getValue()}</span>,
            header: () => "شماره",
        }),
        columnHelper.accessor('status', {
            id: () => 2,
            cell: info => info.getValue().name === 'new' ? <div className="text-green-600">{info.getValue().title}</div> : <div>{info.getValue().title}</div>,
            header: () => "وضعیت",
        }),
        columnHelper.accessor('creator.fullName', {
            id: () => 3,
            cell: info => info.getValue() ?? '-',
            header: () => "ایجاد کننده",
            // Header: "Total trips",
            // accessor: "trips",
        }),
        columnHelper.accessor('department', {
            id: () => 4,
            cell: info => info.getValue()?.title ?? '-',
            header: () => "دپارتمان",
            // Header: "Total trips",
            // accessor: "trips",
        }),
        columnHelper.accessor('categories', {
            id: () => 5,
            cell: info => {
                const categories = (info.getValue() ?? []).map(x => x.title).join(',');
                if (categories.length === 0) return '-';

                return <p className="inline-block truncate max-w-full">{categories}</p>;
            },
            header: () => "دسته بندی ها",
            // Header: "Total trips",
            // accessor: "trips",
        }),
        columnHelper.accessor('', {
            // Header: "Current flight",
            // accessor: "flightName",
            id: () => 6,
            cell: info => {
                return (
                    <>
                        {
                            info.row.original.creator.id === CurrentUser().user.id
                                ? <button onClick={() => deleteTicket(info.row.original)} className="rounded btn-error table-action-button btn-square btn btn-sm btn-sm-svg btn-outline">
                                    <ReactSVG src="/src/assets/svgs/trash.svg" />
                                </button>
                                : undefined
                        }

                        <button onClick={() => assignCategory(info.row.original)} className="mr-1 rounded btn-info table-action-button btn-square btn btn-sm btn-sm-svg btn-outline">
                            <ReactSVG src="/src/assets/svgs/tags.svg" />
                        </button>
                        <button onClick={() => navigation(`/admin/ticketing/${info.row.original.id}`)} className="mr-1 rounded table-action-button btn-square btn btn-sm btn-sm-svg btn-outline">
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
                    categories: info.categories ?? {},
                }
            )
        );
    }

    const onFilterSubmit = (e) => {
        e.preventDefault();

        let filters = {};

        if (titleFilter.length > 0) {
            filters['title'] = titleFilter;
        }

        if (numberFilter.length > 0) {
            filters['number'] = numberFilter;
        }

        if (usersFilter && usersFilter.length > 0) {
            filters['users'] = usersFilter.map((user) => user.value);
        }

        if (Object.keys(filters).length > 0) {
            setFilters(filters)
        }

    }

    const removeFilters = () => {
        setTitleFilter('');
        setNumberFilter('');
        setUsersFilter(null);

        let newFilters = {...filters}

        delete newFilters['title'];
        delete newFilters['users'];
        delete newFilters['number'];

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
            <Card title="تیکت ها" icon="/src/assets/svgs/inbox.svg">
                <div className="flex justify-end">
                    <Link to='/admin/ticketing/create' className="btn btn-sm rounded btn-svg">
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

                        <Input
                            label="شماره"
                            value={numberFilter}
                            onInput={(e) => setNumberFilter(e.target.value)}
                            placeholder="شماره..."
                        />

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">کاربر</span>
                            </label>
                            <ServerSideSelect
                                placeholder="انتخاب کاربر..."
                                url={ApiConstants.Users.List}
                                method={'POST'}
                                onSelect={setUsersFilter}
                                value={usersFilter}
                                multiple={true}
                                formatData={formatUserSelect}
                            />
                        </div>
                    </div>


                    <div className="mt-4">
                        <button className="rounded btn-svg btn-sm btn btn-svg btn-primary leading-none" type="submit">
                            <ReactSVG src="/src/assets/svgs/filter.svg" />
                            <span className="mr-1">فیلتر</span>
                        </button>

                        {
                            Object.keys(filters).length > 0 ? <button onClick={removeFilters} className="rounded btn-secondary btn-svg btn-sm btn btn-svg btn-primary mr-2 leading-none" type="button">
                            <ReactSVG src="/src/assets/svgs/filter-off.svg" />
                            <span className="mr-1">حذف فیلتر</span>
                            </button> : null
                        }
                    </div>
                </form>

                <div className="divider"></div>

                <ServerSideTable
                    ref={datatable}
                    url={Apis.Ticketing.List}
                    method='POST'
                    rowPerPage={15}
                    formatRowData={(data) => formatRowData(data)}
                    columns={columns}
                    filters={filters}
                />
            </Card>
            {
                showCategoryModel ? <SelectCategoryModal
                    ticket={currentTicket}
                    closeModal={(reload) => {
                        setShowCategoryModal(false);
                        if (reload) {
                            datatable.current?.reload();
                        }
                    }}
                    show={showCategoryModel}
                /> : null
            }
        </>
    );
}

export default Ticketing;