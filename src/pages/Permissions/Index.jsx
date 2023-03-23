import Card from "../../components/global/Card.jsx";
import Breadcrumb from "../../components/global/Breadcrumb.jsx";
import {createColumnHelper} from "@tanstack/react-table";
import {appContext} from "../../context/AppContext.js";
import {useContext, useEffect, useState} from "react";
import AppTable from "../../components/table/AppTable.jsx";
import {PermissionsList, SyncPermissions} from "../../services/PermissionService.js";
import {ReactSVG} from "react-svg";
import {handleError} from "../../services/GlobalService.js";
import {notify} from "../../utilities/index.js";

const PermissionsIndex = () => {
    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [perms, setPerms] = useState({});

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: true,
        totals: 0,
        totalPages: 0,
    });

    const setName = (route, value) => {
        const newPerms = {...perms, [route]: {title: perms[route].title, name: value}};
        // newPerms[route]['name'] = value;
        setPerms(newPerms);
    }

    const setTitle = (route, value) => {
        const newPerms = {...perms, [route]: {name: perms[route].name, title: value}};
        // const newPerms = {...perms};
        // newPerms[route]['title'] = value;
        setPerms(newPerms);
    }

    const handleChange = (route, value) => {

    }

    const handleInputChange = (e) => setPerms(prevState => ({...prevState, [e.target.name]: e.target.value}))

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('route', {
            id: () => 0,
            cell: info => info.getValue() ?? '-',
            header: () => "روت",
        }),
        columnHelper.accessor('name', {
            id: () => 1,
            cell: (info) => {
                return (<input className="input input-sm input-bordered rounded focus:outline-none text-sm w-full placeholder-gray-600" defaultValue={info.getValue() ?? ''} type="text" name={`perms[${info.row.original.route}][name]`} id="name" />)
            },
            header: () => "نام",
        }),
        columnHelper.accessor('title', {
            id: () => 2,
            cell: (info) => {
                return (<input className="input input-sm input-bordered rounded focus:outline-none text-sm w-full placeholder-gray-600" defaultValue={info.getValue() ?? ''} type="text" name={`perms[${info.row.original.route}][title]`} id="title" />)
            },
            header: () => "عنوان",
        }),
    ];

    const getData = async () => {
        toggleMainLoader(true);

        const response = await PermissionsList();

        const newPerms = perms;
        response.forEach((item) => {
            perms[item.route] = {
                name: item.name ?? '',
                title: item.title ?? ''
            };
        });
        setPerms(newPerms);

        setPageData({
            rowData: response,
            isLoading: false,
            totalPages: 1,
            totals: response.length
        });

        toggleMainLoader(false);
    };

    const savePermissions = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        toggleMainLoader(true);

        try {
            await SyncPermissions(formData);
            await getData();

            notify('با موفقیت ثبت شد.', 'success');
        } catch (e) {
            handleError(e.response);
        }

        toggleMainLoader(false);
    }

    useEffect(() => {
        getData().then(res => {});
    }, [])

    return (
        <>
            <Breadcrumb items={[{to: '/admin/users', title: 'فهرست دسترسی ها'}]}/>
            <Card title="دسترسی ها" icon="/src/assets/svgs/license.svg">
                <form onSubmit={savePermissions} action="#">
                    <div style={{ minHeight: "360px" }}>
                        <AppTable
                            isServerSide={false}
                            columns={columns}
                            data={pageData.rowData}
                            isLoading={pageData.isLoading}
                            isCompact={true}
                        />
                    </div>
                    <div className="flex items-baseline justify-between bg-neutral-100 p-2 rounded-b border">
                        <div className="text-sm w-1/2">
                            <p>تعداد کل ایتم ها: { pageData.totals }</p>
                        </div>
                    </div>

                    <button type={"submit"} className="btn rounded btn-success text-white w-47 mt-4">
                        <span>ثبت</span>
                    </button>
                </form>
            </Card>
        </>
    )
}

export default PermissionsIndex;