import { createRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { createComponent, updateComponent } from "../../store/actions/componentActions";

export default function ComponentCreateUpdate({htmlFor, component, setComponent, componentModel}) {

    const [actionType, setActionType] = useState('Create');
    const dispatch = useDispatch();

    const cancelButtonRef = createRef();

    useEffect(() => {
        if (component.id) {
            setActionType('Upadate');
        } else {
            setActionType('Create');
        }
    }, [component]);

    const handleCreateOrUpdate = () => {
        if (component.id) { // update
            dispatch(updateComponent(component));
        } else { // create
            dispatch(createComponent(component));
        }

        closeModal();
        resetModelState();
    }

    const handleCancel = () => {
        resetModelState();
    }

    const closeModal = () => {
        cancelButtonRef.current.click();
    }

    const resetModelState = () => {
        setComponent(componentModel);
    }

    return (
        <>
            <div className="modal">
                <div className="modal-box">
                    <div className="w-full flex justify-center">
                        <form className="w-full rounded-lg">
                            <h2 className="text-3xl text-center mb-4">{actionType} Component</h2>
                            <div className="form-control">
                                <label className="label">Part Number</label>
                                <input type="text" value={component.partNumber} onChange={(e) => setComponent({ ...component, partNumber: e.target.value })} id="partNumber" className="input input-primary input-bordered" />
                                <label className="label">Supplier Link</label>
                                <input type="text" value={component.supplierLink} onChange={(e) => setComponent({ ...component, supplierLink: e.target.value })} id="supplierLink" className="input input-primary input-bordered" />
                                <label className="label">quantityOnHand</label>
                                <input type="number" value={component.quantityOnHand} onChange={(e) => setComponent({ ...component, quantityOnHand: e.target.value })} id="quantityOnHand" className="input input-primary input-bordered" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={handleCreateOrUpdate}>{actionType}</button>
                        <label ref={cancelButtonRef} htmlFor={htmlFor} className="btn" onClick={handleCancel}>Close</label>
                    </div>
                </div>
            </div>
        </>
    );
}