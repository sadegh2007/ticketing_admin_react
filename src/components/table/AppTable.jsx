import React, { useMemo } from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import Loader from "./Loader";
import styles from './styles.module.css'
import DebouncedInput from "./DebouncedInput.jsx";
import {ReactSVG} from "react-svg";

const AppTable = ({ columns, data, isLoading, manualPagination = false, setGlobalFilter, isCompact = true, reload }) => {
    const columnData = useMemo(() => columns, [columns]);
    const rowData = useMemo(() => data, [data]);

    const [globalFilter, _] = React.useState('')

    const table = useReactTable({
        columns: columnData,
        data: rowData,
        manualPagination,
        state: {
            globalFilter,
        },
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex">
                        <DebouncedInput
                            value={globalFilter ?? ''}
                            onChange={value => {
                                _(String(value)) // set internal global filter to keep text in the search input
                                setGlobalFilter(String(value))
                            }}
                            className="p-2 mb-2 rounded input focus:outline-none text-sm input-bordered input-sm w-full max-w-xs"
                            placeholder="جستجو ..."
                        />
                        <div className="mr-2 table-buttons">
                            <button onClick={reload} className="btn border-gray-400 focus:outline-none text-gray-600 rounded btn-outline btn-sm btn-square">
                                <ReactSVG src="/src/assets/svgs/reload.svg" />
                            </button>
                        </div>
                    </div>
                    <div style={{minHeight: '600px'}} className="overflow-x-auto border rounded">
                        <table className={`table ${isCompact ? 'table-compact': ''} table-zebra w-full`}>
                            <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr
                                    key={headerGroup.id}
                                >
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                            </thead>
                            <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr className='hover' key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                            {/*{table.getFooterGroups().length > 0 ?*/}
                            {/*    <tfoot>*/}
                            {/*    {table.getFooterGroups().map(footerGroup => (*/}
                            {/*        <tr key={footerGroup.id}>*/}
                            {/*            {footerGroup.headers.map(header => (*/}
                            {/*                <th key={header.id}>*/}
                            {/*                    {header.isPlaceholder*/}
                            {/*                        ? null*/}
                            {/*                        : flexRender(*/}
                            {/*                            header.column.columnDef.footer,*/}
                            {/*                            header.getContext()*/}
                            {/*                        )}*/}
                            {/*                </th>*/}
                            {/*            ))}*/}
                            {/*        </tr>*/}
                            {/*    ))}*/}
                            {/*    </tfoot>*/}
                            {/* : null }*/}
                        </table>
                    </div>
                </>
            )}
        </>
    );
};

export default AppTable;