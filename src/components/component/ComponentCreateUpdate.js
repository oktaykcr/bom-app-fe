import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import FormError from "../common/FormError";

import { createComponent, updateComponent } from "../../store/actions/componentActions";

const schema = yup.object({
    partNumber: yup.string().required(),
    supplierLink: yup.string().required(),
    quantityOnHand: yup.number().required().min(0)
}).required();

export default function ComponentCreateUpdate({ isModalOpen, setIsModalOpen, component, setComponent, componentModel, setIsProcessing }) {

    const [actionType, setActionType] = useState('Create');
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        // Fill the form inputs
        reset(component);

        if (component.id) {
            setActionType('Upadate');
        } else {
            setActionType('Create');
        }
    }, [component, reset]);

    const handleCreateOrUpdate = (data) => {
        setIsProcessing(true);
        let n = { ...component, ...data };

        if (n.id) { // update
            dispatch(updateComponent(n)).then(() => {
                setIsProcessing(false);
            });
        } else { // create
            dispatch(createComponent(n)).then(() => {
                setIsProcessing(false);
            });
        }

        resetModelState();
        closeModal();
    }

    const handleCancel = () => {
        resetModelState();
        closeModal();
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const resetModelState = () => {
        reset(componentModel);
        setComponent(componentModel);
    }

    return (
        <>
            <div className={`modal ${isModalOpen ? "modal-open" : "modal-close"}`}>
                <div className="modal-box">
                    <div className="w-full flex justify-center">
                        <form className="w-full rounded-lg">
                            <h2 className="text-3xl text-center mb-4">{actionType} Component</h2>
                            <div className="form-control">
                                <label className="label">Part Number</label>
                                <input type="text" {...register("partNumber")} id="partNumber" className="input input-primary input-bordered" disabled={component.id != null} />
                                <FormError message={errors.partNumber?.message} />
                                <label className="label">Supplier Link</label>
                                <input type="text" {...register("supplierLink")} id="supplierLink" className="input input-primary input-bordered" />
                                <FormError message={errors.supplierLink?.message} />
                                <label className="label">quantityOnHand</label>
                                <input type="number" {...register("quantityOnHand")} id="quantityOnHand" className="input input-primary input-bordered" />
                                <FormError message={errors.quantityOnHand?.message} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={handleSubmit(handleCreateOrUpdate)}>{actionType}</button>
                        <button className="btn" onClick={handleCancel}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
}