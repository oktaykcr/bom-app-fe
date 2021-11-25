import { createRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { createComponentUsed, updateComponentUsed } from "../../store/actions/componentUsedActions";

export default function ComponentUsedCreateUpdate({ bomId, htmlFor, componentUsed, setComponentUsed, componentUsedModel, setIsProcessing }) {

    const [actionType, setActionType] = useState('Create');
    const dispatch = useDispatch();

    const cancelButtonRef = createRef();

    useEffect(() => {
        if (componentUsed.id) {
            setActionType('Upadate');
        } else {
            setActionType('Create');
        }
    }, [componentUsed]);

    const handleCreateOrUpdate = () => {
        setIsProcessing(true);

        if (componentUsed.id) { // update
            dispatch(updateComponentUsed(componentUsed)).then(() => {
                setIsProcessing(false);
            });
        } else { // create
            componentUsed.bom.id = bomId;
            dispatch(createComponentUsed(componentUsed)).then(() => {
                setIsProcessing(false);
            });
        }

        resetModelState();
        closeModal();
    }

    const handleCancel = () => {
        resetModelState();
    }

    const closeModal = () => {
        cancelButtonRef.current.click();
    }

    const resetModelState = () => {
        setComponentUsed(componentUsedModel);
    }

    return (
        <>
            <div className="modal">
                <div className="modal-box">
                    <div className="w-full flex justify-center">
                        <form className="w-full rounded-lg">
                            <h2 className="text-3xl text-center mb-4">{actionType} Component To Use</h2>
                            <div className="form-control">
                                <label className="label">Part Number</label>
                                <input type="text" value={componentUsed.component.partNumber} onChange={(e) => setComponentUsed({ ...componentUsed, component: {partNumber: e.target.value } })} id="partNumber" className="input input-primary input-bordered" />
                                <label className="label">Quantity</label>
                                <input type="number" value={componentUsed.quantity} onChange={(e) => setComponentUsed({ ...componentUsed, quantity: e.target.value })} id="quantity" className="input input-primary input-bordered" />
                                <label className="label">Cost</label>
                                <input type="number" value={componentUsed.cost} onChange={(e) => setComponentUsed({ ...componentUsed, cost: e.target.value })} id="cost" className="input input-primary input-bordered" />
                                <label className="label">Lead Time</label>
                                <input type="number" value={componentUsed.leadTime} onChange={(e) => setComponentUsed({ ...componentUsed, leadTime: e.target.value })} id="leadTime" className="input input-primary input-bordered" />
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