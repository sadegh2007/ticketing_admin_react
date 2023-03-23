import {useContext, useState} from "react"
import {Link, NavLink} from "react-router-dom";
import {ReactSVG} from "react-svg";
import DropDownMenu from "./menu/DropDownMenu.jsx";
import {appContext} from "../../context/AppContext.js";

const Sidebar = () => {

    const {toggleSidebar} = useContext(appContext);

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


    return (
        <div className="sidebar bg-white">
            <div className="sidebar-logo-holder justify-between">
                <div className="flex items-center">
                    <img src="/src/assets/react.svg" className="logo"/>
                    <Link to="/admin/dashboard" className="mr-2 font-bold">پنل مدیریت</Link>
                </div>
                <button onClick={() => toggleSidebar(false)} className="show-on-phone btn btn-ghost btn-sm">x</button>
            </div>
            <ul className="menu text-sm bg-base-100 p-2 rounded-box items-center text-gray-500">
                <li className="w-60 mb-1">
                    <NavLink end className={({isActive}) => (isActive ? 'active' : undefined)} to="/admin/dashboard">
                        <ReactSVG className="menu-svg" src="/src/assets/svgs/layout-dashboard.svg"/>
                        داشبورد
                    </NavLink>
                </li>

                {/* Users */}

                <DropDownMenu title="کاربران" icon="/src/assets/svgs/users.svg">
                    <li>
                        <NavLink end to="/admin/users" className={({isActive}) => (isActive ? 'active' : undefined)}>
                            <ReactSVG className="menu-svg" src="/src/assets/svgs/users.svg"></ReactSVG>
                            فهرست کاربران
                        </NavLink>
                    </li>
                    <li>
                        <NavLink end to="/admin/users/roles"
                                     className={({isActive}) => (isActive ? 'active' : undefined)}>
                            <ReactSVG className="menu-svg" src="/src/assets/svgs/user-check.svg"></ReactSVG>
                            فهرست نقش ها
                        </NavLink>
                    </li>
                    <li>
                        <NavLink end to="users/roles/permissions"
                                     className={({isActive}) => (isActive ? 'active' : undefined)}>
                            <ReactSVG className="menu-svg" src="/src/assets/svgs/license.svg"></ReactSVG>
                            فهرست دسترسی ها
                        </NavLink>
                    </li>
                </DropDownMenu>

                {/* End of users */}

                {/* Ticketing */}

                <DropDownMenu title="تیکتینگ" icon="/src/assets/svgs/inbox.svg">
                    <li>
                        <NavLink end to="/admin/ticketing/categories"
                                 className={({isActive}) => (isActive ? 'active' : undefined)}>
                            <ReactSVG className="menu-svg" src="/src/assets/svgs/category-2.svg"></ReactSVG>
                            فهرست دسته بندی ها
                        </NavLink>
                    </li>
                    <li>
                        <NavLink end to="/admin/ticketing/create"
                                 className={({isActive}) => (isActive ? 'active' : undefined)}>
                            <ReactSVG className="menu-svg" src="/src/assets/svgs/plus.svg"></ReactSVG>
                            ایجاد تیکت
                        </NavLink>
                    </li>
                    <li>
                        <NavLink end to="/admin/ticketing" >
                            <ReactSVG className="menu-svg" src="/src/assets/svgs/inbox.svg"></ReactSVG>
                            فهرست تیکت ها
                        </NavLink>
                    </li>
                </DropDownMenu>

                {/* End of users */}

                <li className="w-60 mb-1">
                    <NavLink end className={({isActive}) => (isActive ? 'active' : undefined)} to="/settings">
                        <ReactSVG className="menu-svg" src="/src/assets/svgs/settings.svg"/>
                        تنظیمات
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar