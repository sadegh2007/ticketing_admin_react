import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Pagination = ({ pageChangeHandler, totalRows, rowsPerPage, className }) => {
    // Calculating max number of pages
    const noOfPages = Math.ceil(totalRows / rowsPerPage);

    // Creating an array with length equal to no.of pages
    const pagesArr = [...new Array(noOfPages)];

    // State variable to hold the current page. This value is
    // passed to the callback provided by the parent
    const [currentPage, setCurrentPage] = useState(1);

    // Navigation arrows enable/disable state
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoNext, setCanGoNext] = useState(true);

    // Onclick handlers for the butons
    const onNextPage = () => setCurrentPage(currentPage + 1);
    const onPrevPage = () => setCurrentPage(currentPage - 1);
    const onPageSelect = (pageNo) => setCurrentPage(pageNo);

    // Disable previous and next buttons in the first and last page
    // respectively
    useEffect(() => {
        if (noOfPages === currentPage) {
            setCanGoNext(false);
        } else {
            setCanGoNext(true);
        }
        if (currentPage === 1) {
            setCanGoBack(false);
        } else {
            setCanGoBack(true);
        }
    }, [noOfPages, currentPage]);

    // To set the starting index of the page
    useEffect(() => {
        const skipFactor = (currentPage - 1) * rowsPerPage;
        // Some APIs require skip for paginaiton. If needed use that instead
        // pageChangeHandler(skipFactor);
        pageChangeHandler(currentPage);
    }, [currentPage]);

    return (
        <>
            {noOfPages > 1 ? (
                <div dir='ltr' className={className}>
                    <div className='btn-group'>
                        <button
                            className={`btn btn-sm btn-ghost btn-outline ${!canGoBack ? 'btn-disabled' : undefined}}`}
                            onClick={onPrevPage}
                            disabled={!canGoBack}
                        >
                            &#8249;
                        </button>
                        {pagesArr.splice(0, 10).map((num, index) => (
                            <button
                                key={index}
                                onClick={() => onPageSelect(index + 1)}
                                className={`btn btn-sm btn-ghost btn-outline  ${
                                    index + 1 === currentPage ? 'btn-active' : ""
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className={`btn btn-sm btn-ghost btn-outline ${!canGoNext ? 'btn-disabled': undefined}`}
                            onClick={onNextPage}
                            disabled={!canGoNext}
                        >
                            &#8250;
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Pagination;