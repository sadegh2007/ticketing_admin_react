const MainLoader = ({show = false}) => {
    return (
        <div className={`${show ? 'main-loader-open': ''} main-loader flex items-center fixed bg-green-400 w-46 right-1/2 text-white text-sm pl-3 rounded-b`}>
            <div className="loadingio-spinner-rolling-z2t7kzmsm08">
                <div className="ldio-zfz7t71i4qt">
                    <div></div>
                </div>
            </div>
            در حال بارگذاری...
        </div>
    );
}

export default MainLoader;