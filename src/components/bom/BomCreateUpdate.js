import { createRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBom, createBom } from "../../store/actions/bomActions";

export default function BomSaveUpdate({ bom, setBom }) {

    const [actionType, setActionType] = useState('Create');
    const dispatch = useDispatch();

    const cancelButtonRef = createRef();

    useEffect(() => {
        if (bom.id) {
            setActionType('Upadate');
        } else {
            setActionType('Create');
        }
    }, [bom]);

    const handleCreateOrUpdate = () => {
        if (bom.id) { // update
            const updateBomObj = {
                id: bom.id,
                title: bom.title,
                description: bom.description
            }
            dispatch(updateBom(updateBomObj));
        } else { // create
            const newBom = {
                title: bom.title,
                description: bom.description
            }
            dispatch(createBom(newBom));
        }

        closeModal();
        resetBomState();
    }

    const handleCancel = () => {
        resetBomState();
    }

    const closeModal = () => {
        cancelButtonRef.current.click();
    }

    const resetBomState = () => {
        setBom({ title: '', description: '' });
    }

    return (
        <>
            <div className="modal">
                <div className="modal-box">
                    <div className="w-full flex justify-center">
                        <form className="w-full rounded-lg">
                            <h2 className="text-3xl text-center mb-4">{actionType} BOM</h2>
                            <div className="form-control">
                                <label className="label">Title</label>
                                <input value={bom.title} onChange={(e) => setBom({ ...bom, title: e.target.value })} id="title" type="text" className="input input-primary input-bordered" />
                                <label className="label">Description</label>
                                <textarea value={bom.description} onChange={(e) => setBom({ ...bom, description: e.target.value })} id="description" className="textarea h-24 textarea-bordered textarea-primary"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={handleCreateOrUpdate}>{actionType}</button>
                        <label ref={cancelButtonRef} htmlFor="bomSaveUpdateModal" className="btn" onClick={handleCancel}>Close</label>
                    </div>
                </div>
            </div>
        </>
    );
}