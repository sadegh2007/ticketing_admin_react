import React, { useMemo } from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import Loader from "./Loader";
import styles from './styles.module.css'
import DebouncedInput from "./DebouncedInput.jsx";
import {ReactSVG} from "react-svg";

const AppTable = ({ columns, data, isLoading, manualPagination = false, setGlobalFilter, isCompact = true, reload }) => {
    const columnData = useMemo(() => columns, [columns]);
    const rowData = useMemo(() => data, [data]);

    const [columnResizeMode, setColumnResizeMode] = React.useState('onChange')

    const [globalFilter, _] = React.useState('')

    const table = useReactTable({
        columns: columnData,
        data: rowData,
        manualPagination,
        state: {
            globalFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        enableColumnResizing: true,
        columnResizeMode,
        defaultColumn: {
            size: 150,
            minSize: 20,
            maxSize: Number.MAX_SAFE_INTEGER,
        }
    });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex bg-neutral-100 p-2 rounded-t border">
                        <div className="ml-2 table-buttons">
                            <button onClick={reload} className="btn border-gray-400 focus:outline-none text-gray-600 rounded btn-outline btn-sm btn-sm-svg btn-square">
                                <ReactSVG src="/src/assets/svgs/reload.svg" />
                            </button>
                        </div>
                        <DebouncedInput
                            value={globalFilter ?? ''}
                            onChange={value => {
                                _(String(value)) // set internal global filter to keep text in the search input
                                setGlobalFilter(String(value))
                            }}
                            style={{height: '28px'}}
                            className="rounded input focus:outline-none text-xs input-bordered input-xs max-w-xs"
                            placeholder="جستجو ..."
                        />
                    </div>
                    <div style={{minHeight: '600px'}} className="overflow-x-auto border-x">
                        <table
                            {...{
                                style: {
                                    width: table.getCenterTotalSize(),
                                },
                            }}
                            className={`table ${isCompact ? 'table-compact': ''} table-zebra w-full`}>
                            <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr
                                    key={headerGroup.id}
                                >
                                    {headerGroup.headers.map(header => (
                                        <th
                                            className="bg-neutral-100 border-b-2 font-semibold"
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            style={{
                                                width: header.getSize()
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            <div
                                                {...{
                                                    onMouseDown: header.getResizeHandler(),
                                                    onTouchStart: header.getResizeHandler(),
                                                    className: `resizer ${
                                                        header.column.getIsResizing() ? 'isResizing' : ''
                                                    }`,
                                                    style: {
                                                        transform:
                                                            columnResizeMode === 'onEnd' &&
                                                            header.column.getIsResizing()
                                                                ? `translateX(${
                                                                    table.getState().columnSizingInfo.deltaOffset
                                                                }px)`
                                                                : '',
                                                    },
                                                }}
                                            />
                                        </th>
                                    ))}
                                </tr>
                            ))}
                            </thead>
                            <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr className='hover' key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td {...{
                                            key: cell.id,
                                            style: {
                                                width: cell.column.getSize(),
                                            },
                                        }}>
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