import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { useAsyncDebounce } from "react-table"

import Search from "../common/Search";

import { getBomsByTitle, deleteBomById } from "../../store/actions/bomActions";

import { MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

export default function BomList({ setIsModalOpen, setBom, itemsPerPage }) {
    const boms = useSelector((state) => state.boms);
    const dispatch = useDispatch();
    const history = useHistory();

    //search
    const [searchValue, setSearchValue] = useState('');

    //react-paginate
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        let endOffset = itemOffset + itemsPerPage;
        setCurrentItems(boms.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(boms.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, boms]);

    useEffect(() => {
        dispatch(getBomsByTitle(searchValue));
    }, [dispatch, searchValue]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % boms.length;
        setItemOffset(newOffset);
    };

    const handleSearch = useAsyncDebounce(value => {
        setSearchValue(value);
    }, 200)

    const handleShowBomDetails = (id) => {
        history.push(`/bom/${id}`);
    };

    const handleDeleteBom = (id) => {
        dispatch(deleteBomById(id));
    };

    const handleEditBom = (currentBom) => {
        setBom(currentBom);
        setIsModalOpen(true);
    };

    return (
        <>
            {
                currentItems.length > 0 ?
                    (
                        <>
                            <div
                                style={{
                                    textAlign: 'right',
                                    backgroundColor: 'transparent'
                                }}>
                                <Search value={searchValue} setValue={setSearchValue} onChange={handleSearch} />
                            </div>
                            <div className="grid grid-cols-5 gap-4 mb-5 mt-5 place-items-center">
                                {
                                    currentItems.map((bom, index) => (
                                        <div key={index} className="card text-center shadow-2xl lg:card-side bg-gray-800 text-accent-content">
                                            <div className="card-body">
                                                <h2 className="card-title">{bom.title}</h2>
                                                <p>{bom.description}</p>
                                                <div className="justify-center card-actions">
                                                    <button className="btn btn-outline" onClick={() => handleShowBomDetails(bom.id)}>
                                                        <MdOutlineRemoveRedEye size={20} />
                                                    </button>
                                                    <button onClick={() => handleEditBom(bom)} className="btn btn-outline btn-accent modal-button">
                                                        <MdEdit size={25} />
                                                    </button>
                                                    <button className="btn btn-outline btn-secondary" onClick={() => handleDeleteBom(bom.id)}>
                                                        <FaRegTrashAlt size={20} />
                                                    </button>
                                                </div>
                                                <div className="flex justify-center mt-2">
                                                    <span className="badge badge-ghost">{new Date(bom.updatedDate).toGMTString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="next"
                                previousLabel="previous"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                renderOnZeroPageCount={null}
                                pageClassName="btn"
                                previousClassName="btn"
                                nextClassName="btn"
                                breakClassName="btn"
                                containerClassName="btn-group flex justify-center"
                                activeClassName="btn-active"
                                disabledClassName="btn-disabled"
                            />
                        </>
                    )
                    :
                    (
                        <div>There is no BOM.</div>
                    )
            }

        </>
    )

}