import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import FormError from "../common/FormError";

import { updateBom, createBom } from "../../store/actions/bomActions";

const schema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
}).required();

export default function BomCreateUpdate({ isModalOpen, setIsModalOpen, bom, setBom, bomModel }) {

    const [actionType, setActionType] = useState('Create');

    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        // Fill the form inputs
        reset(bom);

        if (bom.id) {
            setActionType('Upadate');
        } else {
            setActionType('Create');
        }
    }, [bom, reset]);

    const handleCreateOrUpdate = (data) => {
        let n = { ...bom, ...data };

        if (n.id) { // update
            dispatch(updateBom(n));
        } else { // create
            dispatch(createBom(n));
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
        reset(bomModel);
        setBom(bomModel);
    }

    return (
        <>
            <div className={`modal ${isModalOpen ? "modal-open" : "modal-close"}`}>
                <div className="modal-box">
                    <div className="w-full flex justify-center">
                        <form className="w-full rounded-lg">
                            <h2 className="text-3xl text-center mb-4">{actionType} BOM</h2>
                            <div className="form-control">
                                <label className="label">Title</label>
                                <input {...register("title")} id="title" type="text" className="input input-primary input-bordered" />
                                <FormError message={errors.title?.message} />
                                <label className="label">Description</label>
                                <textarea {...register("description")} id="description" className="textarea h-24 textarea-bordered textarea-primary"></textarea>
                                <FormError message={errors.description?.message} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={handleSubmit(handleCreateOrUpdate)}>{actionType}</button>
                        <label className="btn" onClick={handleCancel}>Close</label>
                    </div>
                </div>
            </div>
        </>
    );
}