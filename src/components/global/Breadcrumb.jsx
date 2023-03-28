import {Link} from "react-router-dom";
import {ReactSVG} from "react-svg";
import {GetTenant} from "../../services/AuthService.js";

const Breadcrumb = ({items}) => (
    <div className="text-sm breadcrumbs">
        <ul>
            <li><Link to={`/${GetTenant()}/admin/dashboard`} className="flex items-center">
                <ReactSVG className="menu-svg" src="/src/assets/svgs/layout-dashboard.svg"/>
                <span className="mr-1">داشبورد</span>
            </Link></li>
            {
                items && items.length > 0 ? items.map((item, index) => <li key={index}>{item.to === '#' ? <span className="font-medium">{item.title}</span> : <Link to={item.to}>{item.title}</Link>}</li>) : ''
            }
        </ul>
    </div>
)

export default Breadcrumb;