import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import FormError from "../common/FormError";

import { createComponentUsed, updateComponentUsed } from "../../store/actions/componentUsedActions";
import CustomSelect from "../common/CustomSelect";

const schema = yup.object({
    component: yup.object().shape({
        partNumber: yup.string().required()
    }),
    quantity: yup.number().required().min(1),
    cost: yup.number().required().min(0),
    leadTime: yup.number().required().min(0),
}).required();

export default function ComponentUsedCreateUpdate({ bomId, isModalOpen, setIsModalOpen, componentUsed, setComponentUsed, componentUsedModel, setIsProcessing }) {

    const [actionType, setActionType] = useState('Create');
    const dispatch = useDispatch();
    const components = useSelector((state) => state.components);

    const selectOptions = components.map((component) => {
        let obj = {};
        obj["label"] = component.description;
        obj["value"] = component.partNumber;
        return obj;
    });

    const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        // Fill the form inputs
        reset(componentUsed);

        if (componentUsed.id) {
            setActionType('Upadate');
        } else {
            setActionType('Create');
        }
    }, [reset, componentUsed]);

    const handleCreateOrUpdate = (data) => {
        setIsProcessing(true);
        let n = { ...componentUsed, ...data };

        if (n.id) { // update
            dispatch(updateComponentUsed(n)).then(() => {
                setIsProcessing(false);
            });
        } else { // create
            n.bom.id = bomId;
            dispatch(createComponentUsed(n)).then(() => {
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
        reset(componentUsedModel);
        setComponentUsed(componentUsedModel);
    }

    return (
        <>
            <div className={`modal ${isModalOpen ? "modal-open" : "modal-close"}`}>
                <div className="modal-box">
                    <div className="w-full flex justify-center">
                        <form className="w-full rounded-lg">
                            <h2 className="text-3xl text-center mb-4">{actionType} Component To Use</h2>
                            <div className="form-control">
                                <label className="label">Part Number</label>
                                <CustomSelect name="component.partNumber" options={selectOptions} control={control} isDisabled={componentUsed.id != null}/>
                                <FormError message={errors.component?.partNumber?.message} />
                                <label className="label">Quantity</label>
                                <input type="number" {...register("quantity")} id="quantity" className="input input-primary input-bordered" />
                                <FormError message={errors.quantity?.message} />
                                <label className="label">Cost</label>
                                <input type="number" {...register("cost")} id="cost" className="input input-primary input-bordered" />
                                <FormError message={errors.cost?.message} />
                                <label className="label">Lead Time</label>
                                <input type="number" {...register("leadTime")} id="leadTime" className="input input-primary input-bordered" />
                                <FormError message={errors.leadTime?.message} />
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