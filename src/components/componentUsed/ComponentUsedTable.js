import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComponentsUsed, deleteComponentUsedById } from "../../store/actions/componentUsedActions";
import Table from "../common/Table";

import { MdEdit, MdDelete } from "react-icons/md";

export default function ComponentUsedTable({ bomId, htmlFor, setComponentUsed, isProcessing }) {
    const dispatch = useDispatch();
    const componentsUsed = useSelector((state) => state.componentsUsed);

    const columns = useMemo(() => {
        const handleEditComponentUsed = (componentUsed) => {
            setComponentUsed(componentUsed)
        }

        const handleDeleteComponentUsed = (id) => {
            dispatch(deleteComponentUsedById(id));
        }
        return [
            {
                Header: 'Part Number',
                accessor: 'component.partNumber'
            },
            {
                Header: 'Image',
                accessor: 'component.imageUrl',
                Cell: ({ value }) => (
                    <div className="mask mask-squircle w-20 h-20">
                        <img
                            src={value} alt={value}
                        />
                    </div>
                )
            },
            {
                Header: 'Description',
                accessor: 'component.description'
            },
            {
                Header: 'Manufacturer',
                accessor: 'component.manufacturerName'
            },
            {
                Header: 'Supplier Link',
                accessor: 'component.supplierLink'
            },
            {
                Header: 'Quantity',
                accessor: r => `${r.quantity} (${r.component.quantityOnHand})`,
            },
            {
                Header: 'Cost',
                accessor: 'cost'
            },
            {
                Header: 'Extended Cost',
                accessor: 'extendedCost'
            },
            {
                Header: 'Lead Time',
                accessor: 'leadTime'
            },
            {
                Header: 'Created Date',
                accessor: 'createdDate',
                Cell: ({ value }) => (
                    <div className="flex justify-center">
                        <span>{new Date(value).toGMTString()}</span>
                    </div>
                )
            },
            {
                Header: 'Updated Date',
                accessor: 'updatedDate',
                Cell: ({ value }) => <span>{new Date(value).toGMTString()}</span>
            },
            {
                Header: 'Actions',
                accessor: '[EditDeleteButtons]',
                Cell: (cellObj) => (
                    <div className="flex space-x-2">
                        {
                            isProcessing ?
                                <button className="btn btn-outline btn-primary flex-1" disabled>
                                    <MdEdit size={20} />
                                </button>
                                :
                                <label onClick={() => handleEditComponentUsed(cellObj.row.original)} htmlFor={htmlFor} className="btn btn-outline btn-primary flex-1 modal-button">
                                    <MdEdit size={20} />
                                </label>
                        }
                        <button disabled={isProcessing} onClick={() => handleDeleteComponentUsed(cellObj.row.original["id"])} className="btn btn-outline btn-primary flex-1">
                            <MdDelete size={20} />
                        </button>
                    </div>
                )
            }
        ]
    }, [htmlFor, isProcessing, setComponentUsed, dispatch]);

    useEffect(() => {
        dispatch(getComponentsUsed(bomId, 0, 5));
    }, [dispatch, bomId]);

    return (
        <>
            <Table columns={columns} data={componentsUsed} />
        </>
    );
}