import { useContext } from "react";
import { appContext } from "../../context/AppContext";
import { Logout } from "../../services/AuthService";

const UserDropdown = () => {

    const { showUserDropDown, toggleUserDropDown } = useContext(appContext); // toggle user dropdown
    const logout = () => {
        if (window.confirm('آیا از این کار مطمئن هستید؟')) {
            Logout()
        }
    }

    return (
        <div className="dropdown">
            <div className="item ms-0 button-item d-md-none d-flex"
                 onClick={(e) => { e.stopPropagation(); toggleUserDropDown(!showUserDropDown) }}>
                <div className="icon bi bi-three-dots"></div>
            </div>
            <div className="user-dropdown" onClick={(e) => { e.stopPropagation(); toggleUserDropDown(!showUserDropDown) }}>
                <i className="icon bi bi-person ms-1"></i>
                <span className="ms-1">09134307521</span>
                <span className="ms-1 d-md-inline-block d-none">خوش آمدید</span>
                <i className={`icon arrow-icon bi ${showUserDropDown ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`}></i>
            </div>
            <ul className={`dropdown-menu ${showUserDropDown ? 'show' : ''}`}>
                {/*<li>*/}
                {/*    <div className="dropdown-header">*/}
                {/*        <i className="icon bi bi-wallet2 ms-2"></i>*/}
                {/*        <span>موجودی کیف پول:</span>*/}
                {/*        <span className="value mx-2">2,500,000</span>*/}
                {/*        <span>تومان</span>*/}
                {/*        <div className="mobile-items">*/}
                {/*            <div className="mb-2">*/}
                {/*                <span className="key">نام بسته:</span>*/}
                {/*                <span className="value">بسته دمو</span>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <span className="key">زمان پایان بسته:</span>*/}
                {/*                <span className="value">1400/11/10</span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</li>*/}
                {/*<li><a className="dropdown-item" href="#">خرید اشتراک</a></li>*/}
                {/*<li><a className="dropdown-item" href="#">شارژ کیف پول</a></li>*/}
                <li><span className="dropdown-item py-2 text-danger cursor-pointer" onClick={() => logout()}>خروج از حساب کاربری</span></li>
            </ul>
        </div>
    )
}
export default UserDropdown