import { useMemo, useState } from "react"
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from "react-table"
import { matchSorter } from 'match-sorter'

import { FaSearch } from "react-icons/fa";

function GlobalFilter({
    //preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    //const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            <div className="form-control">
                <div className="relative">
                    <input
                        name="search"
                        value={value || ""}
                        type="text"
                        placeholder="Search"
                        className="pr-16 input input-primary input-bordered"
                        onChange={e => {
                            setValue(e.target.value);
                            onChange(e.target.value);
                        }}
                        style={{
                            fontSize: '1.1rem'
                        }} />
                    <FaSearch className="absolute top-3 right-3" size={20} />
                </div>
            </div>
        </span>
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

export default function BomTable({ columns, data }) {

    const filterTypes = useMemo(
        () => ({
            fuzzyText: fuzzyTextFilterFn,
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            filterTypes,
        }, useFilters, useGlobalFilter, useSortBy, usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,

        // Pagination
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tableInstance

    return (
        <>
            <h1>Bom Table Component</h1>
            <table {...getTableProps()} className="table w-full mb-20">
                <thead>
                    <tr>
                        <th
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: 'right',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </th>
                    </tr>
                    {
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {// Render the header
                                                column.render('Header')}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                            </span>
                                        </th>
                                    ))}
                            </tr>
                        ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {

                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {// Render the cell contents
                                                        cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <th style={{
                                textAlign: 'left',
                                backgroundColor: 'transparent',
                            }}>
                            <button className="btn btn-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                {'<<'}
                            </button>{' '}
                            <button className="btn btn-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                {'<'}
                            </button>{' '}
                            <span>
                                Page{' '}
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>{' '}
                            </span>
                            <button className="btn btn-primary" onClick={() => nextPage()} disabled={!canNextPage}>
                                {'>'}
                            </button>{' '}
                            <button className="btn btn-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                {'>>'}
                            </button>
                        </th>
                        <th
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: 'right',
                                backgroundColor: 'transparent',
                            }}>
                            <div className="flex justify-end">
                                <select
                                    className="select select-bordered select-primary w-full max-w-xs"
                                    value={pageSize}
                                    onChange={e => {
                                        setPageSize(Number(e.target.value))
                                    }}
                                >
                                    {[10, 20, 30, 40, 50].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}