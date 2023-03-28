import {useContext, useState} from "react"
import {Link, NavLink} from "react-router-dom";
import {ReactSVG} from "react-svg";
import DropDownMenu from "./menu/DropDownMenu.jsx";
import {appContext} from "../../context/AppContext.js";
import {CurrentUserPermissions, GetTenant} from "../../services/AuthService.js";

const Sidebar = () => {

    const {showSidebar, toggleSidebar} = useContext(appContext);

    const menus = [
        {
            title: 'ویدئوهای آموزشی',
            link: '#',
            icon: 'icon bi bi-film'
        },
        {
            title: 'مدیریت پرسشنامه / فرم',
            link: '#',
            icon: 'icon bi bi-ui-checks',
            children: [
                {
                    title: 'ایجاد پرسشنامه / فرم',
                    link: '#'
                },
                {
                    title: 'لیست پرسشنامه / فرم های من',
                    link: '#'
                }
            ]
        }
    ]; // menus

    const [menuItems, setMenuitems] = useState(menus); // use `useState` to toggle menu items

    const toggleMenu = (menu) => {
        // open and close sub menu
        Object.assign(menu, {isOpen: !menu.isOpen})
        setMenuitems([...menuItems])
    }

    const permissions = CurrentUserPermissions();
    const currentTenant = GetTenant();


    return (
        <div className="sidebar bg-white">
            <div className="sidebar-logo-holder justify-between">
                <div className="flex items-center text-gray-600 hover:text-gray-800">
                    <ReactSVG src="/src/assets/svgs/inbox.svg" className="logo"/>
                    <Link to={`/${currentTenant}/admin/dashboard`} className="mr-2 font-bold text-gray-600 hover:text-gray-800">پنل مدیریت</Link>
                </div>
                <button onClick={() => toggleSidebar(false)} className="show-on-phone btn btn-ghost btn-sm">x</button>
            </div>
            <ul className="menu text-sm bg-base-100 p-2 rounded-box items-center text-gray-500">
                <li className="w-60 mb-1">
                    <NavLink end className={({isActive}) => (isActive ? 'active' : undefined)} to={`/${currentTenant}/admin/dashboard`}>
                        <ReactSVG className="menu-svg" src="/src/assets/svgs/layout-dashboard.svg"/>
                        <span className="font-semibold">داشبورد</span>
                    </NavLink>
                </li>

                {/* Users */}

                <DropDownMenu title="کاربران" icon="/src/assets/svgs/users.svg">
                    {
                        permissions.includes('UsersList') ?
                            <li>
                                <NavLink end to={`/${currentTenant}/admin/users`} className={({isActive}) => (isActive ? 'active' : undefined)}>
                                    <ReactSVG className="menu-svg" src="/src/assets/svgs/users.svg"></ReactSVG>
                                    فهرست کاربران
                                </NavLink>
                            </li>
                        : undefined
                    }
                    {
                        permissions.includes('RolesList') ?
                            <li>
                                <NavLink end to={`/${currentTenant}/admin/users/roles`}
                                         className={({isActive}) => (isActive ? 'active' : undefined)}>
                                    <ReactSVG className="menu-svg" src="/src/assets/svgs/user-check.svg"></ReactSVG>
                                    فهرست نقش ها
                                </NavLink>
                            </li>
                        : undefined
                    }
                    {
                        permissions.includes('PermissionsList') ?
                            <li>
                                <NavLink end to={`/${currentTenant}/admin/users/roles/permissions`}
                                         className={({isActive}) => (isActive ? 'active' : undefined)}>
                                    <ReactSVG className="menu-svg" src="/src/assets/svgs/license.svg"></ReactSVG>
                                    فهرست دسترسی ها
                                </NavLink>
                            </li>
                        : undefined
                    }
                </DropDownMenu>

                {/* End of users */}

                {/* Ticketing */}

                <DropDownMenu title="تیکتینگ" icon="/src/assets/svgs/inbox.svg">
                    {
                        permissions.includes('CategoriesList') ?
                            <li>
                                <NavLink end to={`/${currentTenant}/admin/ticketing/categories`}
                                         className={({isActive}) => (isActive ? 'active' : undefined)}>
                                    <ReactSVG className="menu-svg" src="/src/assets/svgs/category-2.svg"></ReactSVG>
                                    فهرست دسته بندی ها
                                </NavLink>
                            </li>
                        : undefined
                    }
                    {
                        permissions.includes('DepartmentsList') ?
                            <li>
                                <NavLink end to={`/${currentTenant}/admin/ticketing/departments`}
                                         className={({isActive}) => (isActive ? 'active' : undefined)}>
                                    <ReactSVG className="menu-svg" src="/src/assets/svgs/building.svg"></ReactSVG>
                                    فهرست دپارتمان ها
                                </NavLink>
                            </li>
                            : undefined
                    }
                    {
                        permissions.includes('CreateTicket') ?
                            <li>
                                <NavLink end to={`/${currentTenant}/admin/ticketing/create`}
                                         className={({isActive}) => (isActive ? 'active' : undefined)}>
                                    <ReactSVG className="menu-svg" src="/src/assets/svgs/plus.svg"></ReactSVG>
                                    ایجاد تیکت
                                </NavLink>
                            </li>
                        : undefined
                    }
                    {
                        permissions.includes('TicketsList') ?
                            <li>
                                <NavLink end to={`/${currentTenant}/admin/ticketing`} >
                                    <ReactSVG className="menu-svg" src="/src/assets/svgs/inbox.svg"></ReactSVG>
                                    فهرست تیکت ها
                                </NavLink>
                            </li>
                        : undefined
                    }
                </DropDownMenu>

                {/* End of users */}

                {/*<li className="w-60 mb-1">*/}
                {/*    <NavLink end className={({isActive}) => (isActive ? 'active' : undefined)} to="/settings">*/}
                {/*        <ReactSVG className="menu-svg" src="/src/assets/svgs/settings.svg"/>*/}
                {/*        تنظیمات*/}
                {/*    </NavLink>*/}
                {/*</li>*/}
            </ul>
        </div>
    )
}

export default Sidebar