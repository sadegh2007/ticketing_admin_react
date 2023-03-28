import Card from "../../components/global/Card.jsx";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";
import {createColumnHelper} from "@tanstack/react-table";
import {useNavigate} from "react-router-dom";
import {appContext} from "../../context/AppContext.js";
import {notify} from "../../utilities/index.js";
import {handleError} from "../../services/GlobalService.js";
import {confirmAlert} from "react-confirm-alert";
import {CurrentUser, GetTenant} from "../../services/AuthService.js";
import {ReactSVG} from "react-svg";
import Input from "../../components/global/Form/Input.jsx";
import ServerSideTable from "../../components/table/ServerSideTable.jsx";
import Apis from "../../general/ApiConstants.js";
import {useContext, useRef, useState} from "react";
import {DeleteUser} from "../../services/UserService.js";
import RoleModal from "../../modals/Roles/RoleModal.jsx";
import {DeleteRole} from "../../services/RoleService.js";

const RolesIndex = () => {
    const columnHelper = createColumnHelper();
    const navigation = useNavigate();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [showEditModel, setShowEditModal] = useState(false);
    const [currentRole, setCurrentRole] = useState(false);
    const [filters, setFilters] = useState({});
    const [fullNameFilter, setFullNameFilter] = useState('');
    const [userNameFilter, setUserNameFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');

    const datatable = useRef(null);

    const editUser = (ticket) => {
        setCurrentRole(ticket);
        setShowEditModal(true);
    }

    const closeEditModal = (reload) => {
        setCurrentRole(null);
        setShowEditModal(false);

        if (reload) {
            datatable.current.reload();
        }
    }

    const deleteUser = (role) => {
        const options = {
            title: 'حذف نقش',
            message: 'آیا از حذف این نقش مطمئن هستید؟',
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

                        DeleteRole(role.id)
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
        columnHelper.accessor('name', {
            id: () => 0,
            cell: info => info.getValue() ?? '-',
            header: () => "نام",
        }),
        columnHelper.accessor('title', {
            id: () => 1,
            cell: info => info.getValue() ?? '-',
            header: () => "عنوان",
        }),
        columnHelper.accessor('', {
            // Header: "Current flight",
            // accessor: "flightName",
            id: () => 2,
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
                    title: info.title,
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
            <Breadcrumb items={[{to: `/${GetTenant()}/admin/users/roles`, title: 'فهرست نقش ها'}]}/>
            <Card title="نقش ها" icon="/src/assets/svgs/user-check.svg">
                <div className="flex justify-end mb-4">
                    <button onClick={() => editUser(null)} className="btn btn-sm rounded btn-svg">
                        <ReactSVG src="/src/assets/svgs/plus.svg"/>
                        <span className="mr-1">ایجاد نقش</span>
                    </button>
                </div>
                <ServerSideTable
                    ref={datatable}
                    url={Apis.Users.Roles.List}
                    method='POST'
                    rowPerPage={15}
                    formatRowData={(data) => formatRowData(data)}
                    columns={columns}
                    filters={filters}
                />
            </Card>

            {
                showEditModel ? <RoleModal
                    closeModal={closeEditModal}
                    role={currentRole}
                    show={showEditModel}
                /> : undefined
            }
        </>
    )
}

export default RolesIndex;