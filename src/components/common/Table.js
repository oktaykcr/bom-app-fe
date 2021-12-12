import { useMemo, useState } from "react"
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from "react-table"
import { matchSorter } from 'match-sorter'

import Search from '../common/Search';
import CSVExport from "../common/CSVExport";

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
        <Search value={value} setValue={setValue} onChange={onChange} />
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

export default function Table({ title, columns, data }) {

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
            initialState: { pageIndex: 0, pageSize: 5 },
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
        <div className="flex flex-col w-full">
            <div className="mb-20 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="align-middle inline-block min-w-full">
                    <table {...getTableProps()} className="min-w-full divide-y divide-gray-400">
                        <thead>
                            <tr>
                                <th
                                    className="pb-5"
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
                                                <th className="px-6 py-3 bg-black text-left text-xs leading-4 font-medium uppercase tracking-wider" {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                        <tbody className="divide-y divide-gray-400" {...getTableBodyProps()}>
                            {
                                page.map(row => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {
                                                row.cells.map(cell => {

                                                    return (
                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium" {...cell.getCellProps()}>
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
                                <th
                                    className="pt-5"
                                    colSpan={2}
                                    style={{
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
                                <th>
                                    <CSVExport title={title} data={data} columns={columns} />
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
                                            {[5, 10, 25].map(pageSize => (
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
                </div>
            </div>
        </div>

    )
}