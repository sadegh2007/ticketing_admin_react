import React, {useState, useEffect, useContext, useRef, useImperativeHandle} from "react";
import AppTable from "./AppTable.jsx";
import ReactPaginate from 'react-paginate';
import {appContext} from "../../context/AppContext.js";
import axios from "axios";

const ServerSideTable = React.forwardRef((
    {
        url,
        method = 'GET',
        formatRowData,
        columns,
        rowPerPage = 15,
        currentPageIndex = 1,
        isCompact = true,
        filters = {},
        showIndex = true,
        showSelection = false,
        rowSelection = {},
        setRowSelection
    }, ref) => {

    const {showMainLoader, toggleMainLoader} = useContext(appContext);
    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totals: 0,
        totalPages: 0,
    });
    const [currentPage, setCurrentPage] = useState(currentPageIndex);
    const [globalFilter, setGlobalFilter] = useState('');

    useImperativeHandle(ref, () => ({
        reload
    }));

    const getData = async (pageNo = 1) => {
        // let urlBuilder = `${url}?page=${pageNo}&size=${rowPerPage}&q=${globalFilter}`;
        //
        // Object.keys(filters).forEach((key) => {
        //     urlBuilder = urlBuilder + `&${key}=${filters[key]}`
        // });

        filters['page'] = pageNo;
        filters['count'] = rowPerPage;
        filters['q'] = globalFilter;

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
                totalPages: total_items <= 15 ? 1 : Math.ceil(total_items / 15),
            });
        });
    }

    return (
        <>
            <div style={{ minHeight: "360px" }}>
                <AppTable
                    columns={columns}
                    data={pageData.rowData}
                    isLoading={pageData.isLoading}
                    setGlobalFilter={setGlobalFilter}
                    globalFilter={globalFilter}
                    isCompact={isCompact}
                    reload={reload}
                    showIndex={showIndex}
                    showSelection={showSelection}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
            </div>
            <div className="flex items-baseline justify-between bg-neutral-100 p-2 rounded-b border">
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
                    containerClassName="btn-group leading-none"
                    className="btn-group ltr text-slate leading-none"
                    // pageClassName="btn btn-sm btn-ghost btn-outline"
                    // previousClassName="btn btn-sm btn-ghost btn-outline"
                    // nextClassName="btn btn-sm btn-ghost btn-outline"
                    // breakClassName="btn btn-sm btn-ghost btn-outline"
                    // activeClassName="btn-active"
                    breakLinkClassName="btn btn-sm rounded btn-ghost btn-outline ml-1 leading-none border-none"
                    pageLinkClassName="btn btn-sm rounded btn-ghost btn-outline ml-1 leading-none border-none"
                    activeLinkClassName="bg-neutral-200"
                    nextLinkClassName="btn btn-sm rounded btn-ghost btn-outline ml-1 leading-none border-none"
                    previousLinkClassName="btn btn-sm rounded btn-ghost btn-outline leading-none border-none"
                    disabledLinkClassName="text-gray-400 hover:text-gray-400 hover:bg-neutral-100"
                    breakLabel="..."
                    nextLabel="&#8250;"
                    onPageChange={({selected}) => setCurrentPage(selected+1)}
                    pageRangeDisplayed={5}
                    pageCount={pageData.totalPages}
                    previousLabel="&#8249;"
                    renderOnZeroPageCount={null}
                />
            </div>

        </>
    );
})

export default ServerSideTable;