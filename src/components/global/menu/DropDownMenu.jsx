import {useState} from "react";
import {ReactSVG} from "react-svg";
import {CurrentUserPermissions} from "../../../services/AuthService.js";

const DropDownMenu = ({hasPermissions = [], icon, title, children}) => {
    const [showMenu, setShowMenu] = useState(false);

    const permissions = CurrentUserPermissions();

    if (permissions.filter(x => hasPermissions.includes(x)).length === 0) {
        return undefined;
    }

    return (
        <li className={`mb-1 w-60 ${showMenu ? 'bg-gray-100 rounded-lg' : ''}`}>
            <div className="flex items-center" onClick={() => setShowMenu(!showMenu)}>
                {icon ? <ReactSVG className="menu-svg" src={icon}/> : null}
                {title}
                <svg style={{fill: 'rgba(107, 114, 128, 1)'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                     className={`mr-auto dropdown-menu ${showMenu ? 'rotate-90' : ''}`} viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
            </div>
            <ul style={{display: 'flex', position: 'relative', right: 0}}
                className={`dropdown-menu menu w-60 bg-gray-50 overflow-hidden ${showMenu ? 'h-auto': 'h-0'}`}>
                {children}
            </ul>
        </li>
    )
}

export default DropDownMenu;