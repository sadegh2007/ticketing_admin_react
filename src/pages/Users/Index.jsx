import Card from "../../components/global/Card.jsx";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";
import {createColumnHelper} from "@tanstack/react-table";
import {useNavigate} from "react-router-dom";
import {appContext} from "../../context/AppContext.js";
import {DeleteTicket} from "../../services/TicketingApiService.js";
import {notify} from "../../utilities/index.js";
import {handleError} from "../../services/GlobalService.js";
import {confirmAlert} from "react-confirm-alert";
import {CurrentUser, GetTenant} from "../../services/AuthService.js";
import {ReactSVG} from "react-svg";
import Input from "../../components/global/Form/Input.jsx";
import ServerSideTable from "../../components/table/ServerSideTable.jsx";
import Apis from "../../general/ApiConstants.js";
import {useContext, useRef, useState} from "react";
import UserModal from "../../modals/Users/UserModal.jsx";
import {DeleteUser} from "../../services/UserService.js";

const UsersIndex = () => {
    const columnHelper = createColumnHelper();
    const navigation = useNavigate();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [showEditModel, setShowEditModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [filters, setFilters] = useState({});
    const [fullNameFilter, setFullNameFilter] = useState('');
    const [userNameFilter, setUserNameFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [usersFilter, setUsersFilter] = useState();

    const datatable = useRef(null);

    const editUser = (ticket) => {
        setCurrentUser(ticket);
        setShowEditModal(true);
    }

    const closeEditModal = (reload) => {
        setCurrentUser(null);
        setShowEditModal(false);

        if (reload) {
            datatable.current.reload();
        }
    }

    const deleteUser = (user) => {
        const options = {
            title: 'حذف کاربر',
            message: 'آیا از حذف این کاربر مطمئن هستید؟',
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

                        DeleteUser(user.id)
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
        columnHelper.accessor('fullName', {
            id: () => 0,
            cell: info => info.getValue() ?? '-',
            header: () => "نام و نام خانوادگی",
        }),
        columnHelper.accessor('userName', {
            id: () => 1,
            cell: info => info.getValue() ?? '-',
            header: () => "نام کاربری",
        }),
        columnHelper.accessor('email', {
            id: () => 2,
            cell: info => info.getValue() ?? '-',
            header: () => "ایمیل",
        }),
        columnHelper.accessor('roles', {
            id: () => 3,
            cell: (info) => {
                const names = (info.getValue() ?? []).map(x => x.title);
                return names.length ? names.join(', ') : '-';
            },
            header: () => "نقش ها",
        }),
        columnHelper.accessor('', {
            // Header: "Current flight",
            // accessor: "flightName",
            id: () => 4,
            cell: info => {
                return (
                    <>
                        {
                            info.row.original.id !== CurrentUser().user.id
                                ? <button onClick={() => deleteUser(info.row.original)}
                                          className="ml-1 rounded btn-error table-action-button btn-square btn btn-sm btn-sm-svg btn-outline">
                                    <ReactSVG src="/src/assets/svgs/trash.svg"/>
                                </button>
                                : undefined
                        }
                        <button onClick={() => editUser(info.row.original)}
                                className="rounded table-action-button btn-square btn btn-sm btn-sm-svg btn-outline">
                            <ReactSVG src="/src/assets/svgs/pencil.svg"/>
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
                    name: info.name,
                    family: info.family,
                    fullName: info.fullName,
                    userName: info.userName,
                    email: info.email,
                }
            )
        );
    }

    const onFilterSubmit = (e) => {
        e.preventDefault();

        let filters = {};

        if (fullNameFilter.length > 0) {
            filters['fullName'] = fullNameFilter;
        }

        if (userNameFilter.length > 0) {
            filters['userName'] = userNameFilter;
        }

        if (emailFilter.length > 0) {
            filters['email'] = emailFilter;
        }

        if (Object.keys(filters).length > 0) {
            setFilters(filters)
        }

    }

    const removeFilters = () => {
        setFullNameFilter('');
        setUserNameFilter('');
        setEmailFilter('');

        let newFilters = {...filters}

        delete newFilters['fullName'];
        delete newFilters['userName'];
        delete newFilters['email'];

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
            <Breadcrumb items={[{to: `/${GetTenant()}/admin/users`, title: 'فهرست کاربران'}]}/>
            <Card title="کاربران" icon="/src/assets/svgs/users.svg">
                <div className="flex justify-end">
                    <button onClick={() => editUser(null)} className="btn btn-sm rounded btn-svg">
                        <ReactSVG src="/src/assets/svgs/plus.svg"/>
                        <span className="mr-1">ایجاد کاربر</span>
                    </button>
                </div>

                <form onSubmit={onFilterSubmit} action="#">
                    <div className="grid grid-cols-1 gap-1 md:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
                        <Input
                            label="نام و نام خانوادگی"
                            value={fullNameFilter}
                            onInput={(e) => setFullNameFilter(e.target.value)}
                            placeholder="نام و نام خانوادگی..."
                        />

                        <Input
                            label="نام کاربری"
                            value={userNameFilter}
                            onInput={(e) => setUserNameFilter(e.target.value)}
                            placeholder="نام کاربری..."
                        />

                        <Input
                            label="ایمیل"
                            value={emailFilter}
                            onInput={(e) => setEmailFilter(e.target.value)}
                            placeholder="ایمیل..."
                        />
                    </div>


                    <div className="mt-4">
                        <button className="rounded btn-svg btn-sm btn btn-svg btn-primary leading-none" type="submit">
                            <ReactSVG src="/src/assets/svgs/filter.svg"/>
                            <span className="mr-1">فیلتر</span>
                        </button>

                        {
                            Object.keys(filters).length > 0 ? <button onClick={removeFilters}
                                                                      className="rounded btn-secondary btn-svg btn-sm btn btn-svg btn-primary mr-2 leading-none"
                                                                      type="button">
                                <ReactSVG src="/src/assets/svgs/filter-off.svg"/>
                                <span className="mr-1">حذف فیلتر</span>
                            </button> : null
                        }
                    </div>
                </form>

                <div className="divider"></div>

                <ServerSideTable
                    ref={datatable}
                    url={Apis.Users.List}
                    method='POST'
                    rowPerPage={15}
                    formatRowData={(data) => formatRowData(data)}
                    columns={columns}
                    filters={filters}
                />
            </Card>

            {
                showEditModel ? <UserModal
                    closeModal={closeEditModal}
                    user={currentUser}
                    show={showEditModel}
                /> : undefined
            }
        </>
    )
}

export default UsersIndex;