import React from "react";
import loader from "../../assets/spinner.gif";

const Loader = () => {
    return (
        <div style={{minHeight: '600px'}} className="flex items-center justify-center w-full h-full">
            <img src={loader} alt="Loader" />
        </div>
    )
};
export default Loader;