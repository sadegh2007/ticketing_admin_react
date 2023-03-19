import {Link} from "react-router-dom";
import {ReactSVG} from "react-svg";

const Breadcrumb = (props) => {

    return(
        <div className="text-sm breadcrumbs">
            <ul>
                <li><Link to='/dashboard' className="flex items-center">
                    <ReactSVG className="menu-svg" src="/src/assets/svgs/layout-dashboard.svg"/>
                    <span className="mr-1">داشبورد</span>
                </Link></li>
                {
                    props.items && props.items.length > 0 ? props.items.map((item, index) => <li key={index}><Link to={item.to}>{item.title}</Link></li>) : ''
                }
            </ul>
        </div>
    );
}

export default Breadcrumb;