import { useState } from "react";
import { useParams } from "react-router-dom";
import BomTable from "../components/bom/BomTable";

export default function BomDetailPage() {
    let { bomId } = useParams();

    const [counter, setCounter] = useState(3);

    const [data, setData] = useState(
        [
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
        ]
    );

    const [columns, setColumns] = useState([
        {
            Header: 'Column 1',
            accessor: 'col1'
        },
        {
            Header: 'Column 2',
            accessor: 'col2'
        }
    ]);

    const addCol = () => {
        let nCol = {
            Header: 'Column ' + counter,
            accessor: 'col' + counter
        }
        setCounter(counter + 1);
        setColumns([...columns, nCol]);
    }

    const reset = () => {
        setCounter(3);
        setColumns([
            {
                Header: 'Column 1',
                accessor: 'col1'
            },
            {
                Header: 'Column 2',
                accessor: 'col2'
            }
        ]);
    }

    return (
        <>
            <div>Bom List {bomId}</div>
            <button className="btn btn-primary" onClick={addCol}>Add</button>
            <button className="btn btn-primary" onClick={reset}>Reset</button>
            <BomTable data={data} columns={columns} />
        </>
    );
}