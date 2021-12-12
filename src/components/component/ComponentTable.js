import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComponents } from "../../store/actions/componentActions";
import Table from "../common/Table";

import { deleteComponentById } from "../../store/actions/componentActions";

import { MdEdit, MdDelete } from "react-icons/md";

export default function ComponentTable({ setIsModalOpen, setComponent, isProcessing }) {
    const components = useSelector((state) => state.components);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllComponents());
    }, [dispatch])

    const columns = useMemo(() => {
        const handleEditComponent = (component) => {
            setComponent(component);
            setIsModalOpen(true);
        }

        const handleDeleteComponent = (id) => {
            dispatch(deleteComponentById(id));
        }
        return [
            {
                Header: 'Part Number',
                id: "mouserPartNumber",
                accessor: r => (
                    <div className="wrapper">
                        <div>
                            <span className="badge badge-accent badge-outline">Mouser: </span>
                            <br />
                            {r.mouserPartNumber}
                        </div>
                        <div>
                            <span className="badge badge-secondary badge-outline">Manufacturer: </span>
                            <br />
                            {r.manufacturerPartNumber}
                        </div>
                    </div>
                )
            },
            {
                Header: 'Image',
                accessor: 'imageUrl',
                Cell: ({ value }) => (
                    <div className="mask mask-squircle w-20 h-20">
                        <img
                            src={value} alt={value}
                        />
                    </div>
                )
            },
            {
                Header: 'Datasheet',
                accessor: 'dataSheetUrl',
                Cell: ({ value }) => (
                    <a className="link link-secondary"
                        href={value}
                        rel="noopener noreferrer"
                        target="_blank">Datasheet</a>
                )
            },
            {
                Header: 'Description',
                accessor: 'description'
            },
            {
                Header: 'Manufacturer',
                accessor: 'manufacturerName'
            },
            {
                Header: 'Supplier Link',
                accessor: 'supplierLink'
            },
            {
                Header: 'Quantity On Hand',
                accessor: 'quantityOnHand'
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
                                <button onClick={() => handleEditComponent(cellObj.row.original)} className="btn btn-outline btn-primary flex-1 modal-button">
                                    <MdEdit size={20} />
                                </button>
                        }
                        <button disabled={isProcessing} onClick={() => handleDeleteComponent(cellObj.row.original["id"])} className="btn btn-outline btn-primary flex-1">
                            <MdDelete size={20} />
                        </button>
                    </div>
                )
            }
        ];
    }, [setIsModalOpen, isProcessing, setComponent, dispatch]);

    return (
        <>
            <Table title="Components" columns={columns} data={components} />
        </>
    );
}