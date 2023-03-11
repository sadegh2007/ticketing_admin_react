import {Link} from "react-router-dom";

const Breadcrumb = (props) => {

    return(
        <div className="text-sm breadcrumbs mb-3">
            <ul>
                <li><Link to='/dashboard'>داشبورد</Link></li>
                {
                    props.items && props.items.length > 0 ? props.items.map((item, index) => <li key={index}><Link to={item.to}>{item.title}</Link></li>) : ''
                }
            </ul>
        </div>
    );
}

export default Breadcrumb;