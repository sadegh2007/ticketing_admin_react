import { useContext } from "react"
import { appContext } from "../../context/AppContext"
import UserDropdown from "./UserDropdown.jsx";

const MainHeader = () => {
    const { showSidebar, toggleSidebar } = useContext(appContext); // toggle sidebar

    return (
        <header id="main-header" className='bg-base-100'>

            <div className="logo-wrapper">
                <a href="/.">
                    <img src="../stylesheets/img/logo-white.png" alt="LOGO" />
                </a>
            </div>

            <div className="header-sections">

                <div className="right-header-section">
                    <div className="item button-item toggle-sidebar" onClick={(e) => { toggleSidebar(!showSidebar) }}>
                        <i className="icon bi bi-list"></i>
                    </div>
                    {/*<div className="item key-value-item d-md-flex d-none">*/}
                    {/*    <span className="key"><i className="icon bi bi-box-seam ms-1 align-middle"></i>نام بسته:</span>*/}
                    {/*    <span className="value">بسته دمو</span>*/}
                    {/*</div>*/}
                    {/*<div className="item key-value-item d-md-flex d-none">*/}
                    {/*    <span className="key"><i className="icon bi bi-calendar-x ms-1 align-middle"></i>زمان پایان بسته:</span>*/}
                    {/*    <span className="value">1400/11/01</span>*/}
                    {/*    <a className="badge rounded-pill bg-info text-white me-2" href="" target="_blank"></a>*/}
                    {/*</div>*/}
                </div>
                {/* .right-header-section */}

                <div className="center-header-section">
                    <div className="mobile-logo">
                        <a className="d-block" href="/.">
                            <img src="../stylesheets/img/logo-white.png" alt="dental clinic logo" />
                        </a>
                    </div>
                </div>

                <div className="left-header-section">

                    <UserDropdown />

                </div>
                {/* .left-header-section */}

            </div>
            {/* .header-actions */}

        </header>
    )
}

export default MainHeader