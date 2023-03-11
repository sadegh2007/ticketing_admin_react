import {useState, useEffect, useContext} from "react";
import AppTable from "./AppTable.jsx";
import ReactPaginate from 'react-paginate';
import {appContext} from "../../context/AppContext.js";
import axios from "axios";

const ServerSideTable = (
    {
        url,
        method = 'GET',
        formatRowData,
        columns,
        rowPerPage = 15,
        currentPageIndex = 1,
        isCompact = true,
        filters = {}
    }) => {

    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totals: 0,
        totalPages: 0,
    });
    const [currentPage, setCurrentPage] = useState(currentPageIndex);
    const [globalFilter, setGlobalFilter] = useState('');

    const getData = async (pageNo = 1) => {
        // let urlBuilder = `${url}?page=${pageNo}&size=${rowPerPage}&q=${globalFilter}`;
        //
        // Object.keys(filters).forEach((key) => {
        //     urlBuilder = urlBuilder + `&${key}=${filters[key]}`
        // });

        filters['page'] = pageNo;
        filters['size'] = rowPerPage;

        toggleMainLoader(true);

        let requestConfig = {
            baseURL: url,
            method: method,
        };

        if (requestConfig.method === 'GET') {
            requestConfig['params'] = filters;
        } else {
            requestConfig['data'] = filters;
        }

        const response = await axios.request(requestConfig);

        toggleMainLoader(false);

        return await response.data;
    };

    useEffect(() => {
        reload();
    }, [currentPage, globalFilter, filters]);

    const reload = () => {
        setPageData((prevState) => ({
            ...prevState,
            items: [],
            isLoading: true,
        }));
        getData(currentPage).then((info) => {
            const { totalPages, total_items, items } = info;
            setPageData({
                isLoading: false,
                rowData: formatRowData(items),
                totals: total_items,
                totalPages,
            });
        });
    }

    return (
        <>
            <div style={{ minHeight: "600px" }}>
                <AppTable
                    columns={columns}
                    data={pageData.rowData}
                    isLoading={pageData.isLoading}
                    setGlobalFilter={setGlobalFilter}
                    isCompact={isCompact}
                    reload={reload}
                />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
                <div className="text-sm w-1/2">
                    <p>تعداد کل ایتم ها: { pageData.totals }</p>
                </div>
                {/*<Pagination*/}
                {/*    className='w-1/2'*/}
                {/*    totalRows={pageData.totals ?? 0}*/}
                {/*    pageChangeHandler={setCurrentPage}*/}
                {/*    rowsPerPage={rowPerPage}*/}
                {/*/>*/}
                <ReactPaginate
                    // disabledClassName="btn-disabled"
                    containerClassName="btn-group"
                    className="btn-group ltr text-slate"
                    // pageClassName="btn btn-sm btn-ghost btn-outline"
                    // previousClassName="btn btn-sm btn-ghost btn-outline"
                    // nextClassName="btn btn-sm btn-ghost btn-outline"
                    // breakClassName="btn btn-sm btn-ghost btn-outline"
                    // activeClassName="btn-active"
                    breakLinkClassName="btn btn-sm btn-ghost btn-outline ml-1"
                    pageLinkClassName="btn btn-sm btn-ghost btn-outline ml-1"
                    activeLinkClassName="btn-active"
                    nextLinkClassName="btn btn-sm btn-ghost btn-outline ml-1"
                    previousLinkClassName="btn btn-sm btn-ghost btn-outline"
                    disabledLinkClassName="btn-disabled"
                    breakLabel="..."
                    nextLabel="&#8250;"
                    onPageChange={({selected}) => setCurrentPage(selected)}
                    pageRangeDisplayed={5}
                    pageCount={pageData.totals}
                    initialPage={currentPage}
                    previousLabel="&#8249;"
                    renderOnZeroPageCount={null}
                />
            </div>

        </>
    );
}

export default ServerSideTable;