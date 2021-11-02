import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBoms, deleteBomById } from "../../store/actions/bomActions";

import { MdUpdate } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

export default function BomList({ setBom }) {
    const boms = useSelector((state) => state.boms);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getBoms(0, 5));
    }, [dispatch])


    const handleShow = (id) => {
        history.push(`/bom/${id}`);
    };

    const handleDelete = (id) => {
        dispatch(deleteBomById(id));
    };

    const handleUpdate = (currentBom) => {
        setBom(currentBom);
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {
                    boms.map((bom, index) => (
                        <div key={index} className="card text-center shadow-2xl lg:card-side bg-gray-500 text-accent-content">
                            <div className="card-body">
                                <h2 className="card-title">{bom.title}</h2>
                                <p>{bom.description}</p>
                                <div className="justify-center card-actions">
                                    <button className="btn btn-primary" onClick={() => handleShow(bom.id)}>
                                        Show
                                    </button>
                                    <label onClick={() => handleUpdate(bom)}  htmlFor="bomSaveUpdateModal" className="btn btn-accent modal-button">
                                        <MdUpdate size={30} />
                                    </label>
                                    <input type="checkbox" id="bomSaveUpdateModal" className="modal-toggle"/>
                                    <button className="btn btn-secondary" onClick={() => handleDelete(bom.id)}>
                                        <FaRegTrashAlt size={25} />
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
        </>
    )

}