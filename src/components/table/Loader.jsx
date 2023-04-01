import React from "react";

const Loader = () => {
    return (
        <div className="absolute flex items-center justify-center w-full h-full bg-black/[0.06] z-40 rounded">
            <div className="flex items-center bg-neutral-100 px-1 px-2 rounded text-sm">
                <div className="loadingio-spinner-rolling-z2t7kzmsm08">
                    <div className="ldio-zfz7t71i4qt">
                        <div style={{
                            borderColor: "rgb(75 85 99 / var(--tw-border-opacity))",
                            borderTopColor: "transparent"
                        }}></div>
                    </div>
                </div>
                در حال دریافت اطلاعات...
            </div>

        </div>
    )
};
export default Loader;